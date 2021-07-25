import Head from 'next/head'
import Logo from "../components/logo";
import PostCard from "../components/cards/post-card";

export default function Home() {

    const posts = [
        {
            title: 'Kakšna vprašanja lahko senior dev pričakuje na razgovoru za službo, če sta njegova sogovornika na drugi strani Product Lead in Senior Product Manager?',
            author: {
                name: 'Jožef Zajšek'
            },
            numberOfComments: 35,
            numberOfLikes: 122,
            createdAt: new Date(),
        },
        {
            title: 'Kako spraviti zvok iz ene tablice do treh parov slušalk?',
            author: {
                name: 'Marijan Dolovski'
            },
            numberOfComments: 6,
            numberOfLikes: 7,
            createdAt: new Date(),
        },
    ]

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

                <div className="container py-6">

                    <div className={'w-full md:w-2/3'}>
                        {
                            posts.map((post, index) => {
                                return (
                                    <div key={index} className={posts.length - 1 !== index ? 'mb-3' : ''}>
                                        <PostCard postExcerpt={post}/>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </main>
        </div>
    )
}
