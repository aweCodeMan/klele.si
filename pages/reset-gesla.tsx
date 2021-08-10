import Head from "next/head";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faFile} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import FormSelect from "../components/partials/form-select";
import FormInput from "../components/partials/form-input";
import FormMarkdown from "../components/partials/form-markdown";
import {useAuth} from "../contexts/auth";
import Joi from "joi";
import {UserService} from "../helpers/user-service";
import {FormHelper} from "../helpers/form";
import Shimmer from "../components/partials/shimmer";
import LoginNotice from "../components/partials/login-notice";
import VerifyNotice from "../components/partials/verify-notice";
import Navbar from "../components/navbar";
import AuthModal from "../components/modals/auth-modal";
import {useRouter} from "next/router";

export default function ResetPassword() {
    const auth = useAuth();
    const router = useRouter()

    const schema = Joi.object(
        {
            email: Joi.string().email({tlds: {allow: false}}).trim().required(),
            password: Joi.string().min(8).trim().required(),
            repeatPassword: Joi.ref('password'),
            token: Joi.any(),
        }
    ).messages({
        'string.empty': 'Polje je obvezno.',
        'string.email': 'Mora biti veljaven email.',
        'string.min': `Geslo mora imeti vsaj {#limit} znakov.`,
        'any.only': `Gesli se morata ujemati.`
    });

    const [form, setForm] = useState({email: '', password: '', repeatPassword: '', token: ''});
    const [errors, setErrors] = useState({
        email: null,
        password: null,
        repeatPassword: null,
        token: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const token = params.get('token') + "";
        const email = params.get('email') + "";

        setForm({...form, email: email, token: token});
    }, [])

    const onFormChange = (name: string, value: any) => {
        const updatedForm = {...form, [name]: value};

        setErrors(FormHelper.getJoiErrors(schema, updatedForm));
        setForm(updatedForm);

        console.log(FormHelper.getJoiErrors(schema, updatedForm));
    }

    const submit = (event: any) => {
        event.preventDefault();

        setIsLoading(true);

        auth.resetPassword(form).then(() => {
            auth.login({email: form.email, password: form.password}).then(() => {
                router.push('/profil');
            })
        }).catch((error: any) => {
            setIsLoading(false);
            setErrors(FormHelper.getServerErrors(errors, error.response.data.errors));
        })
    }

    const isFormValid = () => {
        return schema.validate(form).error === undefined;
    }

    const showForm = () => {
        return (
            <>
                <div className="card mx-auto w-full" style={{maxWidth: '800px'}}>
                    <h1 className="font-bold leading-normal tracking-wide text-3xl mb-6">Resetiranje gesla</h1>

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
                                       onChange={onFormChange}
                                       error={errors.password}
                                       autocomplete="new-password"
                                       disabled={isLoading}
                                       value={form.password}/>

                        </div>

                        <div className="mb-3">
                            <FormInput type={'password'} label={'Ponovi geslo:'}
                                       name="repeatPassword"
                                       onChange={onFormChange}
                                       error={errors.repeatPassword}
                                       autocomplete="new-password"
                                       disabled={isLoading}
                                       value={form.repeatPassword}/>

                        </div>

                        <div className="my-6 text-center">
                            <button className="btn btn-primary" disabled={!isFormValid() || isLoading}
                                    type={'submit'}>Restiraj geslo
                            </button>
                        </div>

                    </form>
                </div>
            </>
        )
    }

    return <div>
        <Head>
            <title>Resetiraj geslo | Klele.si</title>
            <meta name="description" content=""/>
        </Head>

        <Navbar/>
        <AuthModal/>

        <main className={'my-16 flex flex-col justify-center px-2 md:px-6'}>
            {showForm()}
        </main>
    </div>
}
