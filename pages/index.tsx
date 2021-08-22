import Head from 'next/head'
import Logo from "../components/logo";
import Link from 'next/link';
import PostCard from "../components/cards/post-card";
import PostSkeletonCard from "../components/cards/post-skeleton-card";
import {useEffect, useState} from "react";
import Pagination from "../components/partials/pagination";
import Navbar from "../components/navbar";
import {GroupService} from "../helpers/group-service";
import Shimmer from "../components/partials/shimmer";
import {useRouter} from "next/router";
import {PostService} from "../helpers/post-service";
import {Cookies} from "react-cookie";
import {PaginatedResponseInterface} from "../domain/paginated-response.interface";
import {PostExcerptInterface} from "../domain/post-excerpt.interface";

export default function FrontPage(props: { paginatedResponse: PaginatedResponseInterface<PostExcerptInterface>, groupUuid?: string, page?: string }) {
    const [selectedGroupUuid, setSelectedGroupUuid] = useState(props.groupUuid);
    const [isLoading, setIsLoading] = useState(!props.paginatedResponse);
    const [paginatedResponse, setPaginatedResponse]: [PaginatedResponseInterface<PostExcerptInterface> | null, any] = useState(props.paginatedResponse);

    useEffect(() => {
        if (!props.paginatedResponse) {
            refresh({groupUuid: props.groupUuid, page: props.page});
        }
    }, []);

    const refresh = (query: { groupUuid?: string, page?: string }) => {
        setIsLoading(true);

        PostService.getCombinedFeed({groupUuid: query.groupUuid, page: query.page})
            .then((response) => {
                setPaginatedResponse(response);
                setIsLoading(false);
            });
    }

    const onGroupChange = (groupUuid: string) => {
        setSelectedGroupUuid(groupUuid);
        refresh({groupUuid, page: "1"});
    }

    const onPageChange = (page: string) => {
        refresh({groupUuid: paginatedResponse?.meta?.query?.groupUuid ?? null, page});
    }

    const showPosts = () => {
        return (
            <div>
                {paginatedResponse.data.map((post: any, index: number) => {
                    return (
                        <div key={index} className={paginatedResponse.data.length - 1 !== index ? 'mb-3' : ''}>
                            <PostCard postExcerpt={post}/>
                        </div>
                    )
                })}

                {
                    paginatedResponse.data.length === 0 ? <ShowEmptyState/> : null
                }

                <div className="mt-6">
                    <Pagination onPageChange={onPageChange} response={paginatedResponse}/>
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
        result = await PostService.getCombinedFeed({groupUuid, page});
    }

    return {
        props: {
            paginatedResponse: result,
            page: page ?? "1",
            groupUuid: groupUuid ?? null,
        },
    }
}
