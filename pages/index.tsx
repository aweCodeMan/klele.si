import Head from 'next/head'
import Logo from "../components/logo";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Klele.si | Kjer se dobre debate doma</title>
                <meta name="description" content=""/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={'overflow-x-hidden'}>
                <div style={{height: '200px'}} className={'relative flex justify-center items-center'}>
                    <div style={{background: 'url(/images/header_frontpage.png)', backgroundPosition: 'center'}}
                         className={'h-full absolute w-full z-0'}/>

                    <div className={'text-center z-10 flex flex-col justify-center items-center'}>
                        <Logo/>
                        <p className="text-black text-lg mt-2 tracking-tight">Kjer se dobre debate doma</p>
                    </div>
                </div>
            </main>
        </div>
    )
}
