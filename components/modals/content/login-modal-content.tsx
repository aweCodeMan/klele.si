import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithubSquare} from '@fortawesome/free-brands-svg-icons'
import FormInput from "../../partials/form-input";
import Joi from 'joi'
import {useState} from "react";
import {AuthModalType, useAuth} from "../../../contexts/auth";
import {FormHelper} from "../../../helpers/form";

export default function LoginModalContent(props: { close: Function }) {
    const auth = useAuth();

    const schema = Joi.object(
        {
            email: Joi.string().email({tlds: {allow: false}}).trim().required(),
            password: Joi.string().trim().min(8).required(),
        }
    ).messages({
        'string.empty': 'Polje je obvezno.',
        'string.email': 'Mora biti veljaven email.',
        'string.min': `Geslo mora imeti vsaj {#limit} znakov.`
    });

    const [form, setForm] = useState({email: '', password: ''});
    const [errors, setErrors] = useState({email: null, password: null});
    const [isLoading, setIsLoading] = useState(false);

    const onFormChange = (name: string, value: any) => {
        const updatedForm = {...form, [name]: value};

        setErrors(FormHelper.getJoiErrors(schema, updatedForm));
        setForm(updatedForm);
    }

    const submit = (event: any) => {
        event.preventDefault();

        setIsLoading(true);

        auth.login(form).then(() => {
            props.close();
        }).catch((error: any) => {
            setIsLoading(false);
            setErrors(FormHelper.getServerErrors(errors, error.response.data.errors));
        })
    }

    const isFormValid = () => {
        return schema.validate(form).error === undefined;
    }

    return (
        <div className="flex flex-col text-center">
            <h2 className="font-bold text-2xl mb-8">Prijava</h2>

            <form className={'text-left'} onSubmit={submit} action={undefined}>
                <div className="mb-3">
                    <FormInput type={'email'} label={'Email:'}
                               name="email"
                               onChange={onFormChange}
                               error={errors.email}
                               autocomplete="username"
                               disabled={isLoading}
                               value={form.email}/>

                </div>

                <div className="mb-3">
                    <FormInput type={'password'} label={'Geslo:'}
                               name="password"
                               autocomplete="current-password"
                               onChange={onFormChange}
                               disabled={isLoading}
                               error={errors.password}
                               value={form.password}/>
                </div>



                <div className="my-6 text-center">
                    <button className="btn btn-primary" disabled={!isFormValid() || isLoading} type={'submit'}>Prijavi
                        se
                    </button>
                </div>
            </form>

            <div className="text-center">
                <button className="btn btn-sm btn-link"
                        onClick={() => auth.openAuthModal(AuthModalType.FORGOT_PASSWORD)}
                        disabled={isLoading}>Pozabljeno
                    geslo?
                </button>
            </div>

            <hr className="my-6 hidden"/>

            <div className="hidden">
                <h2 className="font-bold text-lg mb-2">Kaj pa mogoče tole?</h2>

                <button className="w-full btn btn-outline flex justify-center items-center">
                    <span className="text-xl pr-2">
                        <FontAwesomeIcon icon={faGithubSquare}/>
                    </span>
                    Prijava z GitHub
                </button>
            </div>

            <div className={'text-center'}>
                <hr className={'my-6'}/>

                <p className="text-lg font-bold">Še nimaš računa?</p>

                <button className="btn btn-link btn-sm text-red"
                        onClick={() => auth.openAuthModal(AuthModalType.REGISTER)}>Registriraj se!
                </button>
            </div>

        </div>
    )
}
