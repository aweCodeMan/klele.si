import Link from 'next/link'
import Logo from "./logo";

export default function Navbar() {
    return (
        <div className={'bg-white w-full border-b border-black px-3 flex flex-row justify-between items-center'}>
            <div className={'py-5'}>
                <Link href="/">
                    <a className={'btn-logo'}>
                        <Logo/>
                    </a>
                </Link>
            </div>

            <div>
                <Link href="#prijava">
                    <a className="btn btn-outline mr-2">
                        Prijava
                    </a>
                </Link>

                <Link href="#registracija">
                    <a className="btn btn-primary">
                        Registracija
                    </a>
                </Link>
            </div>
        </div>
    )
}
