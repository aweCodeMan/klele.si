import Link from 'next/link'
import Logo from "./logo";
import {useEffect, useState} from "react";
import {AuthModalType, useAuth} from "../contexts/auth";
import AuthModal from "./modals/auth-modal";

export default function Navbar() {
    const [hasMounted, setHasMounted] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        setHasMounted(true);
    }, [])

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

                <Buttons auth={auth} hasMounted={hasMounted}/>
            </nav>

            <AuthModal/>
        </>
    )
}

function Buttons(props: { auth: any, hasMounted: boolean }) {
    if (!props.hasMounted) {
        return null;
    }

    return props.auth.user ? <AuthButtons auth={props.auth}/> : <GuestButtons auth={props.auth}/>;
}

function AuthButtons(props: { auth: any }) {
    return <div>
        <Link href="/profil">
            <a className="btn btn-outline mr-2">
                {props.auth.user?.fullName}
            </a>
        </Link>

        <button className="btn btn-link"
                onClick={() => props.auth.logout()}>
            Odjava
        </button>
    </div>;
}

function GuestButtons(props: { auth: any }) {
    return (
        <div>
            <button className="btn btn-outline mr-2"
                    onClick={() => props.auth.openAuthModal(AuthModalType.LOGIN)}>
                Prijava
            </button>

            <button className="btn btn-primary"
                    onClick={() => props.auth.openAuthModal(AuthModalType.REGISTER)}>
                Registracija
            </button>
        </div>
    );
}
