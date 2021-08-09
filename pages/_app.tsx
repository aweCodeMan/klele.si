import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {ProvideAuth} from "../contexts/auth";

function MyApp({Component, pageProps}: AppProps) {
    return <ProvideAuth>
        <Component {...pageProps} />
    </ProvideAuth>
}

export default MyApp
