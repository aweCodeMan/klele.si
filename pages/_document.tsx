import Document, {Html, Head, Main, NextScript} from 'next/document'
import Footer from "../components/footer";

class MyDocument extends Document {

    render() {
        return (
            <Html className={'sans'}>
                <Head>
                    <link rel="shortcut icon" type="image/jpg" href="/images/favicon.png"/>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Kulim+Park:wght@400;600;700&display=swap"
                        rel="stylesheet"/>
                </Head>
                <body className={'min-h-screen flex flex-col bg-beige overflow-y-scroll'}
                      style={{backgroundImage: 'url(/images/bg.png)', backgroundRepeat: 'repeat'}}>
                <div className={'flex-1'}>
                    <Main/>
                    <NextScript/>
                </div>
                <Footer/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
