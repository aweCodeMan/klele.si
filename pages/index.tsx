import Head from 'next/head'
import Logo from "../components/logo";
import Link from 'next/link';
import PostCard from "../components/cards/post-card";
import PostSkeletonCard from "../components/cards/post-skeleton-card";
import {useEffect, useState} from "react";
import Pagination from "../components/partials/pagination";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun, faBurn, faSignal} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/navbar";
import AuthModal from "../components/modals/auth-modal";
import {GroupService} from "../helpers/group-service";
import Shimmer from "../components/partials/shimmer";
import {useRouter} from "next/router";

export default function Home() {

    const [type, setType] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse]: [any, any] = useState(null);

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

    useEffect(() => {
        setTimeout(() => {
            setResponse({
                data: posts,
                meta: {
                    currentPage: 1,
                    nextPageUrl: '/',
                    total: 40,
                    perPage: 20,
                }
            });
            setIsLoading(false);
        }, 1500);
    }, []);

    const onTypeChange = (event: any, type: number) => {
        event.preventDefault();

        setType(type);
        setIsLoading(true)
        setTimeout(() => {
            setResponse({
                data: posts,
                meta: {
                    currentPage: 1,
                    nextPageUrl: '/',
                    total: 40,
                    perPage: 20,
                }
            });
            setIsLoading(false);
        }, 1500);
    }

    const showPosts = () => {
        return (
            <div>
                {posts.map((post, index) => {
                    return (
                        <div key={index} className={posts.length - 1 !== index ? 'mb-3' : ''}>
                            <PostCard postExcerpt={post}/>
                        </div>
                    )
                })}

                <div className="mt-6">
                    <Pagination onPageChange={onPageChange} response={response}/>
                </div>
            </div>
        );
    };

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

    const onPageChange = (page: number) => {
        setIsLoading(true);

        setTimeout(() => {
            const copy = {...response};
            copy.meta.currentPage = page;
            setResponse(copy);
            setIsLoading(false);
        }, 1000);
    }

    return (
        <div>
            <Head>
                <title>Klele.si | Kjer so dobre debate doma</title>
                <meta name="description" content="Klele so dobre debate doma."/>
            </Head>

            <Navbar/>

            <main className={'overflow-x-hidden'}>
                <div style={{
                    height: '200px',
                    backgroundColor: '#e0d3c6',
                    background: 'url(/images/header_frontpage.png)',
                    backgroundPosition: 'center'
                }}
                     className={'relative flex justify-center items-center'}>

                    <div className={'text-center flex flex-col justify-center items-center'}>
                        <Logo/>
                        <p className="text-black text-lg mt-2 tracking-tight">Kjer so dobre debate doma</p>
                    </div>
                </div>

                <div className="container grid py-6">

                    <div className="area-top">
                        <div className="flex flex-row justify-between">
                            <div>
                                <button
                                    className={type === 0 ? 'btn btn-primary btn-sm selected mb-3 sm:mb-0' : 'btn btn-outline btn-sm mb-3 sm:mb-0'}
                                    onClick={(event) => onTypeChange(event, 0)}>
                                    <FontAwesomeIcon icon={faSun} className={'mr-2'}/>
                                    Po vrsti
                                </button>
                                <button
                                    className={'mx-2 ' + (type === 1 ? 'btn btn-primary btn-sm selected mb-3 sm:mb-0' : 'btn btn-outline btn-sm mb-3 sm:mb-0')}
                                    onClick={(event) => onTypeChange(event, 1)}>
                                    <FontAwesomeIcon icon={faBurn} className={'mr-2'}/>
                                    Po vročici
                                </button>
                                <button
                                    className={type === 2 ? 'btn btn-primary btn-sm selected mb-3 sm:mb-0' : 'btn btn-outline btn-sm mb-3 sm:mb-0'}
                                    onClick={(event) => onTypeChange(event, 2)}>
                                    <FontAwesomeIcon icon={faSignal} className={'mr-2'}/>
                                    Po priljubljenosti
                                </button>
                            </div>

                            <Link href="/objavi">
                                <a>
                                    <button className="btn btn-primary btn-sm">Objavi</button>
                                </a>
                            </Link>
                        </div>

                    </div>

                    <div className={'area-main'}>
                        {
                            isLoading ? showSkeleton() : showPosts()
                        }
                    </div>

                    <div className="area-sidebar">
                        <GroupsCard/>
                    </div>
                </div>
            </main>
        </div>
    )
}

function GroupsCard() {
    const router = useRouter();
    const [groups, setGroups]: any = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        GroupService.getGroups().then((response) => {
            setGroups(response.data.data);
            setIsLoading(false);
        })
    }, []);

    const navigate = (event: any, group: any) => {
        event.preventDefault();

        router.query.group = group.slug;
        router.push({pathname: router.pathname, query: router.query}, undefined, {
            shallow: true,
            scroll: true,
        })
    }

    return <div className="card">
        <span className="text-black font-bold text-xl"># Skupine</span>

        {isLoading ? <>
            <div className="my-3">
                <Shimmer height={'2rem'}/>
            </div>
            <div className="mb-3">
                <Shimmer height={'2rem'}/>
            </div>
        </> : <div className="mt-2 flex flex-row flex-wrap -mb-3">
            {
                groups.map((group: any, index: number) => {
                    return (
                        <a key={index} onClick={(event) => navigate(event, group)} className={'mb-3 mr-2'}
                           href={"#" + group.slug}
                           style={{color: group.color}}>#{group.name}
                        </a>
                    )
                })
            }
        </div>}
    </div>;
}
