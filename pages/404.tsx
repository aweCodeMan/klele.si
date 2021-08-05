import Head from "next/head";
import Image from 'next/image'


export default function Custom404() {
    return <div>
        <Head>
            <title>404 | Klele.si</title>
            <meta name="description" content="Ne vem kako naj ti drugače povem... Stran ne obstaja.!"/>
        </Head>

        <main className={'my-16 flex flex-col justify-center text-center'}>
            <div className="text-center">
                <div className="px-6">
                    <Image src="/images/worker.png" alt="Pixel grafika vzdrževalca" height={180} width={278}/>
                </div>

                <div className="mt-12">
                    <p className="font-bold text-2xl">404 | Stran ne obstaja!</p>

                    <p className="mt-6">Jeba.</p>
                </div>
            </div>
        </main>
    </div>
}
