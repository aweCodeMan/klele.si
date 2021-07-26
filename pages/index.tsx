import Head from 'next/head'
import Logo from "../components/logo";
import Link from 'next/link';
import PostCard from "../components/cards/post-card";
import PostSkeletonCard from "../components/cards/post-skeleton-card";
import {useEffect, useState} from "react";

export default function Home() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, [])

    const posts = [
        {
            title: 'Kakšna vprašanja lahko senior dev pričakuje na razgovoru za službo, če sta njegova sogovornika na drugi strani Product Lead in Senior Product Manager?',
            author: {
                name: 'Jožef Zajšek'
            },
            group: {
                name: 'programiranje',
                color: '#63c7ff'
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
            group: {
                name: 'oblikovanje',
                color: '#FF9314'
            },
            numberOfComments: 6,
            numberOfLikes: 7,
            createdAt: new Date(),
        },
    ];

    const groups = posts.map((post) => post.group)

    const showPosts = () => posts.map((post, index) => {
        return (
            <div key={index} className={posts.length - 1 !== index ? 'mb-3' : ''}>
                <PostCard postExcerpt={post}/>
            </div>
        )
    });

    const showSkeleton = () => {
        const skeletons = Array.from(new Array(6));
        return skeletons.map((_, index) => {
            return (
                <div key={index} className={skeletons.length - 1 !== index ? 'mb-3' : ''}>
                    <PostSkeletonCard/>
                </div>
            )
        })
    };

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

                <div className="container py-6 flex flex-row flex-wrap">

                    <div className={'w-full md:w-2/3 mb-3 md:pr-2'}>
                        {
                            isLoading ? showSkeleton() : showPosts()
                        }
                    </div>

                    <div className="w-full md:w-1/3 mb-3 md:pl-2">
                        <div className="card">
                            <span className="text-black font-bold text-xl"># Top skupine</span>

                            <div className="mt-2 flex flex-row flex-wrap">
                                {
                                    groups.map((group, index) => {
                                        return (
                                            <Link key={index} href="#">
                                                <a className={'mb-3 mr-2'}
                                                   style={{color: group.color}}>#{group.name}</a>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
