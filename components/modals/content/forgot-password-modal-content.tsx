import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithubSquare} from '@fortawesome/free-brands-svg-icons'
import FormInput from "../../partials/form-input";
import Joi from 'joi'
import {useState} from "react";
import {ModalState, useAuth} from "../../../contexts/auth";
import {FormHelper} from "../../../helpers/form";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

export default function ForgotPasswordModalContent(props: { close: Function }) {
    const auth = useAuth();

    const schema = Joi.object(
        {
            email: Joi.string().email({tlds: {allow: false}}).trim().required(),
        }
    ).messages({
        'string.empty': 'Polje je obvezno.',
        'string.email': 'Mora biti veljaven email.',
    });

    const [form, setForm] = useState({email: ''});
    const [errors, setErrors] = useState({email: null});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const onFormChange = (name: string, value: any) => {
        const updatedForm = {...form, [name]: value};

        setErrors(FormHelper.getJoiErrors(schema, updatedForm));
        setForm(updatedForm);
    }

    const submit = (event: any) => {
        event.preventDefault();

        setIsLoading(true);

        auth.forgotPassword(form).then(() => {
            setIsSuccess(true);
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
                <h2 className="font-bold text-2xl mb-8">Super! To je uspelo.</h2>

                <p>Na <b>{form.email}</b> smo ti poslali navodila kako resetirati svoje geslo.</p>

                <div className="text-center mt-6">
                    <button className="btn btn-primary" onClick={() => props.close()}>Zapri</button>
                </div>
            </>
        );
    }

    const showForm = () => {
        return <>
            <h2 className="font-bold text-2xl mb-8">Pozabljeno geslo?</h2>

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

                <div className="mt-6 text-center">
                    <button className="btn btn-primary" disabled={!isFormValid() || isLoading} type={'submit'}>Pošlji navodila za resetiranje gesla
                    </button>
                </div>
            </form>

            <div className={'text-center'}>
                <hr className={'my-6'}/>

                <p className="text-lg font-bold">Poznaš svoje geslo?</p>

                <button className="btn btn-link btn-sm text-red"
                        onClick={() => auth.setModalType(ModalState.LOGIN)}>Prijavi se!
                </button>
            </div>
        </>
    }

    return (
        <div className="flex flex-col text-center">
            {isSuccess ? showSuccess() : showForm()}
        </div>
    )
}
