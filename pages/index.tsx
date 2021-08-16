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
import {GroupService} from "../helpers/group-service";
import Shimmer from "../components/partials/shimmer";
import {useRouter} from "next/router";
import {PostService} from "../helpers/post-service";
import {Cookies} from "react-cookie";

export default function Home(props: { response: any, groupUuid: any, page: any }) {

    const [type, setType] = useState(0);
    const [selectedGroupUuid, setSelectedGroupUuid] = useState(props.groupUuid);
    const [isLoading, setIsLoading] = useState(!props.response);
    const [response, setResponse]: [any, any] = useState(!!props.response ? props.response : {
        data: [],
        meta: {total: 0}
    });


    useEffect(() => {
        if (!props.response) {
            setIsLoading(true);

            PostService.getFeed().then((response: any) => {
                setResponse(response.data);
                setIsLoading(false);
            });
        }

    }, []);

    const onGroupChange = (groupUuid: any) => {
        setIsLoading(true);
        setSelectedGroupUuid(groupUuid);

        PostService.getFeed({groupUuid, page: 1}).then((response) => {
            setResponse(response.data);
            setIsLoading(false);
        });
    }

    const showPosts = () => {
        return (
            <div>
                {response.data.map((post: any, index: number) => {
                    return (
                        <div key={index} className={response.data.length - 1 !== index ? 'mb-3' : ''}>
                            <PostCard postExcerpt={post}/>
                        </div>
                    )
                })}

                {
                    response.data.length === 0 ? <ShowEmptyState/> : null
                }

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

        PostService.getFeed({page: page}).then((response) => {
            setResponse(response.data);
            setIsLoading(false);
        })
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


                            <Link href="/objavi">
                                <a>
                                    <button className="btn btn-primary">Objavi</button>
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
                        <GroupsCard selectedGroupUuid={selectedGroupUuid}
                                    onGroupChange={(groupUuid: any) => onGroupChange(groupUuid)}/>
                    </div>
                </div>
            </main>
        </div>
    )
}

function GroupsCard(props: { selectedGroupUuid?: any, onGroupChange: Function }) {
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

        const groupUuid = props.selectedGroupUuid === group.uuid ? null : group.uuid;

        if (groupUuid) {
            router.query.groupUuid = groupUuid;
        } else {
            delete router.query.groupUuid;
        }
        router.query.page = "1";
        router.push({pathname: router.pathname, query: router.query}, undefined, {
            shallow: true,
            scroll: true,
        })

        props.onGroupChange(groupUuid);
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
                        <a key={index} onClick={(event) => navigate(event, group)}
                           className={'mb-3 mr-1 px-2 ' + (props.selectedGroupUuid === group.uuid ? 'selected ' : null)}
                           href={`/?groupUuid=${group.uuid}`}
                           style={{color: group.color}}>#{group.name}
                        </a>
                    )
                })
            }
        </div>}
    </div>;
}

function ShowEmptyState() {
    return <>
        <div className="card">
            <div className="text-center py-6">
                <p className="text-lg font-bold mb-4">
                    Ha. Trenutno ni nobenega prispevka.
                </p>

                <p className={'text-sm'}>Daj nam pomagi, pa <Link href={'/objavi'}>
                    <a>
                        <button type={'button'} className={'btn btn-primary btn-sm'}>spiši enega</button>
                    </a>
                </Link>
                </p>
            </div>
        </div>
    </>
}

export async function getServerSideProps(context: any) {
    const cookies = new Cookies(context.req, context.res)
    const isAuth = cookies.getAll().cookies.auth;
    const {groupUuid, page} = context.query;
    let result = null;

    if (!isAuth) {
        result = (await PostService.getFeed({groupUuid: groupUuid ?? null, page: page ?? null})).data;
    }

    return {
        props: {
            response: result,
            page: page ?? null,
            groupUuid: groupUuid ?? null,
        },
    }
}

/*
<div className={"hidden"}>
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
 */
