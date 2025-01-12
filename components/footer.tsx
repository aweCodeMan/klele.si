import Link from 'next/link'

export default function Footer() {
    return (
        <div className={'bg-white w-full border-t border-black px-3 text-center'}>
            <div className={'py-2'}>
                <p className={'text-sm'}>Klele.si | <Link href={"/pravila"}>Pravila</Link> | {(new Date()).getFullYear()}</p>
            </div>
        </div>
    )
}
