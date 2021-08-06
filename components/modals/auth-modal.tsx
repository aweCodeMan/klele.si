import LoginModalContent from "./content/login-modal-content";
import RegisterModalContent from "./content/register-modal-content";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export default function AuthModal() {
    const [showing, setShowing] = useState(false);
    const [isShowingLogin, setShowLogin] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowing(true);
        }, 500);
    }, [])

    const onLoggedIn = () => {
        setShowing(false);
    }

    const showLogin = (value: boolean) => {
        setShowLogin(value);
    }

    return (
        showing ? <div className="fixed z-10 inset-0 overflow-y-auto" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
                <div className="fixed inset-0 bg-gray opacity-80 transition-opacity" aria-hidden={true}/>

                <div className="card bg-white p-10 z-20 w-full" style={{maxWidth: '470px'}}>

                    <div className={'text-right'}>
                        <button className="btn btn-link text-xl" onClick={onLoggedIn}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                    </div>

                    <div className="p-0 md:p-6">{
                        isShowingLogin ?
                            <LoginModalContent onLoggedIn={onLoggedIn} onRegisterClicked={() => showLogin(false)}/> :
                            <RegisterModalContent onLoggedIn={onLoggedIn} onLoginClicked={() => showLogin(true)}/>
                    }

                    </div>
                </div>
            </div>
        </div> : null
    )
}
