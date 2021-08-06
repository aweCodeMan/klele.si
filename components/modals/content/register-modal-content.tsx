import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithubSquare} from '@fortawesome/free-brands-svg-icons'
import FormInput from "../../partials/form-input";
import Joi from 'joi'
import {useState} from "react";

export default function RegisterModalContent(props: { onLoginClicked: Function, onLoggedIn: Function }) {
    const schema = Joi.object(
        {
            email: Joi.string().email({tlds: {allow: false}}).trim().required(),
            password: Joi.string().trim().required(),
            repeatPassword: Joi.ref('password'),
        }
    );

    const [registerForm, setRegisterForm] = useState({email: '', password: '', repeatPassword: ''});
    const [errors, setErrors] = useState(schema.validate(registerForm, {abortEarly: false}).error);
    const [isLoading, setIsLoading] = useState(false);

    const onFormChange = (name: string, value: any) => {
        const copy = {...registerForm};
        // @ts-ignore
        copy[name] = value;
        setRegisterForm(copy);

        setErrors(schema.validate(copy, {abortEarly: false,}).error);
    }

    const submit = (event: any) => {
        event.preventDefault();

        if (isFormValid()) {
            setIsLoading(true);

            setTimeout(() => {
                setIsLoading(false);
                props.onLoggedIn();
            }, 1000);
        }
    }

    const isFormValid = () => {
        return errors === undefined;
    }

    const getError = (name: string) => {
        return errors?.details.find((item) => item.path[0] === name)
    }

    const onLoginClicked = () => {
        props.onLoginClicked();
    }

    return (
        <div className="flex flex-col text-center">
            <h2 className="font-bold text-2xl mb-8">Registracija</h2>

            <form className={'text-left'} onSubmit={submit} action={undefined}>


                <div className="mb-3">
                    <FormInput type={'email'} label={'Email:'}
                               name="email"
                               onChange={onFormChange}
                               error={getError('email')}
                               autocomplete="username"
                               disabled={isLoading}
                               value={registerForm.email}/>

                </div>

                <div className="mb-3">
                    <FormInput type={'password'} label={'Geslo:'}
                               name="password"
                               autocomplete="new-password"
                               onChange={onFormChange}
                               disabled={isLoading}
                               error={getError('password')}
                               value={registerForm.password}/>
                </div>

                <div className="mb-3">
                    <FormInput type={'password'} label={'Ponovi geslo:'}
                               name="repeatPassword"
                               autocomplete="new-password"
                               onChange={onFormChange}
                               disabled={isLoading}
                               error={getError('repeatPassword')}
                               value={registerForm.repeatPassword}/>
                </div>

                <div className="mt-6 text-center">
                    <button className="btn btn-primary" disabled={!isFormValid() || isLoading} type={'submit'}>Registriraj
                        se
                    </button>
                </div>

            </form>

            <hr className="my-6"/>

            <div>
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

                <button className="btn btn-link btn-sm text-red" onClick={onLoginClicked}>Prijavi se!</button>
            </div>
        </div>
    )
}
