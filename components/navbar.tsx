import Link from 'next/link'
import Logo from "./logo";

export default function Navbar() {
    return (
        <div className={'bg-white w-full border-b border-black px-3 flex flex-row justify-between items-center'}>
            <div className={'py-5'}>
                <Link href="/">
                    <a title="Domov">
                        <Logo/>
                    </a>
                </Link>
            </div>

            <div>
                <Link href="#objavi">
                    <a className={'btn btn-primary'}>Objavi</a>
                </Link>
            </div>
        </div>
    )
}
