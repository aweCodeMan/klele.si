import Head from "next/head";
import {useEffect, useState} from "react";
import FormInput from "../components/partials/form-input";
import Shimmer from "../components/partials/shimmer";
import Navbar from "../components/navbar";
import {UserService} from "../helpers/user-service";
import {useAuth} from "../contexts/auth";
import AuthModal from "../components/modals/auth-modal";
import LoginNotice from "../components/partials/login-notice";
import Joi from "joi";
import {FormHelper} from "../helpers/form";
import VerifyNotice from "../components/partials/verify-notice";

export default function Profile() {
    const auth = useAuth();
    const [hasMounted, setHasMounted] = useState(false);
    const [user, setUser]: any = useState(null);
    const [showLoginNotice, setShowLoginNotice] = useState(false);

    const schema = Joi.object(
        {
            name: Joi.any(),
            surname: Joi.any(),
            nickname: Joi.string().trim().required(),
        }
    ).messages({
        'string.empty': 'Polje je obvezno.',
    });

    const [form, setForm] = useState({name: '', surname: '', nickname: ''});
    const [errors, setErrors] = useState({
        name: null,
        surname: null,
        nickname: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    useEffect(() => {
        if (auth.user) {
            refreshProfile();
        } else {
            setShowLoginNotice(true);
            setHasMounted(true);
        }
    }, [auth])

    const refreshProfile = () => {
        setShowLoginNotice(false);

        UserService.getProfile().then((response) => {
            setUser(response.data.data);
            setHasMounted(true);
            setForm({name: response.data.data.name, surname: response.data.data.surname, nickname: response.data.data.nickname})

        }).catch((error) => {
            console.error(error);
        });
    }

    const onFormChange = (name: string, value: any) => {
        const updatedForm = {...form, [name]: value};

        setErrors(FormHelper.getJoiErrors(schema, updatedForm));
        setForm(updatedForm);
    }

    const submit = (event: any) => {
        event.preventDefault();

        setIsLoading(true);

        auth.update(form).then(() => {
            setIsSuccessful(true);
            setIsLoading(false);
        }).catch((error: any) => {
            setIsLoading(false);
            setErrors(FormHelper.getServerErrors(errors, error.response.data.errors));
        })
    }

    const isFormValid = () => {
        return schema.validate(form).error === undefined;
    }

    const showLoading = () => {
        return (
            <>
                <div className="card mx-auto w-full" style={{maxWidth: '800px'}}>
                    <div className="mb-3">
                        <Shimmer height={'3rem'} width={'100%'}/>
                    </div>
                    <div className="mb-3">
                        <Shimmer height={'3rem'} width={'100%'}/>
                    </div>
                    <div className="mb-3">
                        <Shimmer height={'3rem'} width={'100%'}/>
                    </div>
                    <div className="mb-3">
                        <Shimmer height={'3rem'} width={'100%'}/>
                    </div>
                    <Shimmer height={'3rem'} width={'100%'}/>
                </div>
            </>
        )
    }

    const showProfile = () => {
        return (
            <>
                {
                    showLoginNotice ? <div className="mx-auto w-full" style={{maxWidth: '800px'}}><LoginNotice/></div> :

                        <>
                                <div className="mb-6 mx-auto w-full" style={{maxWidth: '800px'}}>
                                    <VerifyNotice user={user}/>
                                </div>

                            <div className="card mx-auto w-full" style={{maxWidth: '800px'}}>
                                <h1 className="font-bold leading-normal tracking-wide text-3xl mb-6">Tvoj profil</h1>


                                <form className={'text-left'} onSubmit={submit} action={undefined}>

                                    <div className="mb-3">
                                        <FormInput type={'text'} label={'Vzdevek:'}
                                                   name="nickname"
                                                   onChange={onFormChange}
                                                   error={errors.nickname}
                                                   autocomplete="off"
                                                   disabled={isLoading}
                                                   value={form.nickname}/>

                                    </div>

                                    <div className="mb-3">
                                        <FormInput type={'text'} label={'Ime:'}
                                                   name="name"
                                                   onChange={onFormChange}
                                                   error={errors.name}
                                                   autocomplete="off"
                                                   disabled={isLoading}
                                                   value={form.name}/>

                                    </div>

                                    <div className="mb-3">
                                        <FormInput type={'text'} label={'Priimek:'}
                                                   name="surname"
                                                   onChange={onFormChange}
                                                   error={errors.surname}
                                                   autocomplete="off"
                                                   disabled={isLoading}
                                                   value={form.surname}/>

                                    </div>

                                    <div className="mb-3">
                                        <FormInput type={'text'} label={'Email:'}
                                                   name="email"
                                                   onChange={() => {
                                                   }}
                                                   error={null}
                                                   autocomplete="off"
                                                   disabled={true}
                                                   value={auth.user?.email ?? ''}/>

                                    </div>

                                    <div className="my-6 text-center">
                                        <button className="btn btn-primary" disabled={!isFormValid() || isLoading}
                                                type={'submit'}>Posodobi
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </>
                }
            </>
        )
    }

    return <div>
        <Head>
            <title>Tvoj profil | Klele.si</title>
            <meta name="description" content=""/>
        </Head>

        <Navbar/>

        <main className={'my-16 flex flex-col justify-center px-2 md:px-6'}>
            {!hasMounted ? showLoading() : showProfile()}
        </main>
    </div>
}
