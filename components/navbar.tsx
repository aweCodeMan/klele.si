import Link from 'next/link'
import Logo from "./logo";

export default function Navbar() {

    return (
        <>
            <nav className={'bg-white w-full border-b border-black px-3 flex flex-row justify-between items-center'}
                 role="navigation">
                <div className={'py-5'}>
                    <Link href="/"  className={'btn-logo'}>
                        <Logo/>
                    </Link>
                </div>
            </nav>
        </>
    )
}