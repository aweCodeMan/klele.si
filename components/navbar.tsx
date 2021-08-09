import Link from 'next/link'
import Logo from "./logo";
import {useEffect, useState} from "react";
import {ModalState, useAuth} from "../contexts/auth";

export default function Navbar() {
    const [hasMounted, setHasMounted] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        setHasMounted(true);
    }, [])

    const showAuthButtons = () => {
        return (
            <div>
                <button className="btn btn-outline mr-2" onClick={() => {auth.setModalType(ModalState.LOGIN); auth.openAuthModal()}}>
                    Prijava
                </button>

                <button className="btn btn-primary" onClick={() => {auth.setModalType(ModalState.REGISTER); auth.openAuthModal()}}>
                    Registracija
                </button>
            </div>
        );
    }

    const showAuth = () => {
        return <div>
            <Link href="/profil">
                <a className="btn btn-outline hidden  mr-2">
                    {auth.user?.fullName}
                </a>
            </Link>

            <button className="btn btn-link " onClick={() => auth.logout()}>
                Odjava
            </button>
        </div>;
    }

    return (
        <>
            <nav className={'bg-white w-full border-b border-black px-3 flex flex-row justify-between items-center'}
                 role="navigation">
                <div className={'py-5'}>
                    <Link href="/">
                        <a className={'btn-logo'}>
                            <Logo/>
                        </a>
                    </Link>
                </div>

                {
                    !hasMounted ? null : (auth.user ? showAuth() : showAuthButtons())
                }
            </nav>
        </>
    )
}
