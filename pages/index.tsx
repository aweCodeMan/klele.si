import Head from 'next/head'
import Logo from "../components/logo";
import Link from 'next/link';
import PostCard from "../components/cards/post-card";
import PostSkeletonCard from "../components/cards/post-skeleton-card";
import Navbar from "../components/navbar";
import {PaginatedResponseInterface} from "../domain/paginated-response.interface";
import {PostExcerptInterface} from "../domain/post-excerpt.interface";

const posts: PostExcerptInterface[] = [
    {
        uuid: 'place/2024',
        title: "Plače slovenskih razvijalcev 2024",
        slug: '/place/2024',
        content: "",
        postType: 0,
        author: {
            uuid: '9448be89-2434-45cc-90de-76cad3c161c3',
            nickname: "aweCodeMan",
            fullName: 'Miha Medven',
        },
        createdAt: '2024-10-21 08:00',
        updatedAt: '2024-10-21 08:00',
    },
    {
        uuid: 'place/2023',
        title: "Plače slovenskih razvijalcev 2023",
        slug: '/place/2023',
        content: "",
        postType: 0,
        author: {
            uuid: '9448be89-2434-45cc-90de-76cad3c161c3',
            nickname: "aweCodeMan",
            fullName: 'Miha Medven',
        },
        createdAt: '2023-11-13 11:00',
        updatedAt: '2023-11-13 11:00',
    },
    {
        uuid: 'place/2022',
        title: "Plače slovenskih razvijalcev 2022",
        slug: '/place/2022',
        content: "",
        postType: 0,
        author: {
            uuid: '9448be89-2434-45cc-90de-76cad3c161c3',
            nickname: "aweCodeMan",
            fullName: 'Miha Medven',
        },
        createdAt: '2022-11-12 10:00',
        updatedAt: '2022-11-12 10:00',
    },
    {
        uuid: 'place/2021',
        title: "Plače slovenskih razvijalcev 2021",
        slug: '/place/2021',
        content: "",
        postType: 0,
        author: {
            uuid: '9448be89-2434-45cc-90de-76cad3c161c3',
            nickname: "aweCodeMan",
            fullName: 'Miha Medven',
        },
        createdAt: '2021-10-18 10:00',
        updatedAt: '2021-10-18 10:00',
    }
] as PostExcerptInterface[];

export default function FrontPage(props: {
    paginatedResponse: PaginatedResponseInterface<PostExcerptInterface>,
    groupUuid?: string,
    page?: string
}) {

    const showPosts = () => {
        return (
            <div>
                {posts.map((post: PostExcerptInterface) => {
                    return <div key={post.uuid} className={'mb-3'}><PostCard  postExcerpt={post}></PostCard></div>
                })}
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

                    <div className={'area-main'}>
                        {
                            showPosts()
                        }
                    </div>

                </div>
            </main>
        </div>
    )
}

