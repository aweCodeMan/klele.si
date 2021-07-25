import Head from 'next/head'
import Navbar from "../components/navbar";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Klele.si | Kjer se še s prijatelji skregaš</title>
                <meta name="description" content=""/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={'text-center py-4 uppercase'}>
                <h1 className={'uppercase'}>
                    Hello, world!
                </h1>
            </main>
        </div>
    )
}
