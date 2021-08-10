import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithubSquare} from '@fortawesome/free-brands-svg-icons'
import FormInput from "../../partials/form-input";
import Joi from 'joi'
import {useState} from "react";
import {AuthModalType, useAuth} from "../../../contexts/auth";
import {FormHelper} from "../../../helpers/form";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

export default function RegisterModalContent(props: { close: Function }) {
    const auth = useAuth();

    const schema = Joi.object(
        {
            name: Joi.string().trim().required(),
            surname: Joi.string().trim().required(),
            email: Joi.string().email({tlds: {allow: false}}).trim().required(),
            password: Joi.string().min(8).trim().required(),
            repeatPassword: Joi.ref('password'),
        }
    ).messages({
        'string.empty': 'Polje je obvezno.',
        'string.email': 'Mora biti veljaven email.',
        'string.min': `Geslo mora imeti vsaj {#limit} znakov.`,
        'any.only': `Gesli se morata ujemati.`
    });

    const [form, setForm] = useState({name: '', surname: '', email: '', password: '', repeatPassword: ''});
    const [errors, setErrors] = useState({
        email: null,
        password: null,
        repeatPassword: null,
        name: null,
        surname: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const onFormChange = (name: string, value: any) => {
        const updatedForm = {...form, [name]: value};

        setErrors(FormHelper.getJoiErrors(schema, updatedForm));
        setForm(updatedForm);
    }

    const submit = (event: any) => {
        event.preventDefault();

        setIsLoading(true);

        auth.register(form).then(() => {
            setIsSuccessful(true);
        }).catch((error: any) => {
            setIsLoading(false);
            setErrors(FormHelper.getServerErrors(errors, error.response.data.errors));
        })
    }

    const isFormValid = () => {
        return schema.validate(form).error === undefined;
    }

    const showSuccess = () => {
        return (<>
                <div className="mb-3" style={{fontSize: '5rem'}}><FontAwesomeIcon icon={faCheck}/></div>
                <h2 className="font-bold text-2xl mb-8">Registracija je bila uspešna!</h2>

                <p>Na <b>{form.email}</b> smo ti poslali potrditveno sporočilo, ki ga prosim takoj sedaj čimprej
                    poklikaj.</p>

                <p className="mt-4">Hvala ti in se beremo!</p>

                <div className="text-center mt-6">
                    <button className="btn btn-primary" onClick={() => props.close()}>Zapri</button>
                </div>
            </>
        );
    }

    const showForm = () => {
        return (<>
            <h2 className="font-bold text-2xl mb-8">Registracija</h2>

            <form className={'text-left'} onSubmit={submit} action={undefined}>

                <div className="mb-3">
                    <FormInput type={'text'} label={'Ime:'}
                               name="name"
                               onChange={onFormChange}
                               error={errors.name}
                               autocomplete="given-name"
                               disabled={isLoading}
                               value={form.name}/>

                </div>

                <div className="mb-3">
                    <FormInput type={'text'} label={'Priimek:'}
                               name="surname"
                               onChange={onFormChange}
                               error={errors.surname}
                               autocomplete="family-name"
                               disabled={isLoading}
                               value={form.surname}/>

                </div>

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
                               autocomplete="new-password"
                               onChange={onFormChange}
                               disabled={isLoading}
                               error={errors.password}
                               value={form.password}/>
                </div>

                <div className="mb-3">
                    <FormInput type={'password'} label={'Ponovi geslo:'}
                               name="repeatPassword"
                               autocomplete="new-password"
                               onChange={onFormChange}
                               disabled={isLoading}
                               error={errors.repeatPassword}
                               value={form.repeatPassword}/>
                </div>

                <div className="mt-6 text-center">
                    <button className="btn btn-primary" disabled={!isFormValid() || isLoading}
                            type={'submit'}>Registriraj
                        se
                    </button>
                </div>

            </form>

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

                <p className="text-lg font-bold">Že imaš račun?</p>

                <button className="btn btn-link btn-sm text-red"
                        onClick={() => auth.openAuthModal(AuthModalType.LOGIN)}>Prijavi se!
                </button>
            </div>
        </>)
    }

    return (
        <div className="flex flex-col text-center">

            {isSuccessful ? showSuccess() : showForm()}


        </div>
    )
}
