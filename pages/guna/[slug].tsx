import Head from 'next/head'
import Link from 'next/link';
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faLink, faPencilAlt, faSignal} from '@fortawesome/free-solid-svg-icons'
import Breadcrumbs from "../../components/partials/breadcrumbs";
import Comment from "../../components/cards/comment";
import CommentSkeletonCard from "../../components/cards/comment-skeleton-card";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import Author from "../../components/cards/author";
import SubmitComment from "../../components/partials/submit-comment";
import Navbar from "../../components/navbar";
import {PostService} from "../../helpers/post-service";
import {TimeUtil} from "../../helpers/time-util";
import {useAuth} from "../../contexts/auth";
import {CommentInterface} from "../../domain/comment.interface";
import Group from "../../components/partials/group";
import AuthorMeta from "../../components/partials/author-meta";
import Score from "../../components/partials/score";
import {Cookies} from "react-cookie";
import {PostInterface} from "../../domain/post.interface";
import Shimmer from "../../components/partials/shimmer";
import MarkdownInstructions from "../../components/partials/markdown-instructions";

export default function Guna(props: { post: PostInterface, slug: string }) {
    const auth = useAuth();

    const [isLoading, setIsLoading] = useState(!props.post);
    const [post, setPost] = useState(props.post);

    const [isShowingSubmitComment, setIsShowingSubmitComment] = useState(false);

    useEffect(() => {
        if (!props.post) {
            setIsLoading(true);

            PostService.getPost(props.slug).then((response: any) => {
                setPost(response.data.data);
                setIsLoading(false);
                sendView(response.data.data);
            });
        } else {
            sendView(props.post);
        }

    }, [])

    const toggleSubmitComment = () => {
        setIsShowingSubmitComment(!isShowingSubmitComment);
    }

    const sendView = (post: PostInterface) => {
        if (auth.user && post) {
            setTimeout(() => {
                PostService.sendView(post.uuid).then(() => {
                });
            }, 500);
        }
    }

    const commentAdded = (comment: any) => {
        const update = {...post};
        update.numberOfComments++;
        update.comments = [{...comment}, ...post.comments];

        setPost(update);
        sendView(update);
        setIsShowingSubmitComment(false);
    }

    const incrementComments = () => {
        const update = {...post};
        update.numberOfComments++;

        setPost(update);
        sendView(update);
    }

    if (!post) {
        return <><PostSkeleton/></>;
    }

    return (
        <div>
            <Head>
                <title>{post.title} | Klele.si</title>
                <meta name="description" content=""/>
            </Head>

            <Navbar/>

            <main className={'my-6 flex flex-col'}>
                <div className="container mx-auto" style={{maxWidth: '780px'}}>
                    <div className="mb-6 flex flex-row justify-between items-center">
                        <Breadcrumbs/>

                        {auth.user && auth.user.uuid === post.author.uuid && !post.deletedAt ?
                            <AuthorButtons post={post}/> : null}
                    </div>

                    <div className="card mb-4">
                        <div className="flex flex-row">
                            <div className="mr-2">
                                <Score horizontal={false} score={post.score} type={'post'}
                                       voted={post.voted}
                                       uuid={post.uuid}/>
                            </div>
                            <div className="flex flex-col">
                                <Group group={post.group}/>
                                <div className="mt-1">
                                    <AuthorMeta author={post.author}
                                                emphasizeAuthor={true}
                                                createdAt={post.createdAt}
                                                updatedAt={post.updatedAt}/>
                                </div>
                            </div>
                        </div>

                        <hr className={'my-3'}/>

                        {post.createdAt !== post.updatedAt ? <UpdatedTag/> : ''}

                        <div className=" mt-6">
                            <h1 className="text-lg sm:text-2xl md:text-4xl font-bold leading-snug tracking-wide text-black mb-2">{post.title}</h1>
                        </div>

                        <div className="mt-4">
                            {
                                post.postType === 0 ? <div className="prose pb-5"
                                                           dangerouslySetInnerHTML={{__html: post.content.html!!}}/> :
                                    <div className={'mt-8 mb-6'}>

                                        <LinkCard post={post}/>

                                    </div>

                            }
                        </div>

                        <div className="flex flex-row">
                            {!isShowingSubmitComment ?
                                <button className="btn btn-outline btn-sm" type={'button'}
                                        onClick={() => toggleSubmitComment()}><FontAwesomeIcon className={'mr-2'}

                                                                                               icon={faComments}/>Komentiraj
                                </button> : null}
                        </div>
                    </div>

                    {
                        isShowingSubmitComment ? <div className="card">
                            <SubmitComment onSubmit={(comment: any) => commentAdded(comment)}
                                           rootUuid={post.uuid}/>

                            <div className="mt-4 card">
                                <MarkdownInstructions/>
                            </div>

                        </div> : null
                    }

                    <div className="card" style={{borderTop: isShowingSubmitComment ? '0' : ''}}>
                        <div>
                            {post.numberOfComments > 0 ?
                                <div className="flex flex-row justify-center items-center mb-6">
                                    <h2 className={'flex-1 font-bold tracking-wide text-xl leading-normal'}>Komentarji
                                        ({post.numberOfComments})</h2>

                                </div> : <EmptyStateComments/>}

                            {
                                isLoading ? <CommentSkeletonCard/> : <div className="flex flex-col">
                                    {
                                        post.comments.map((comment: any) => {
                                            return <Comment comment={comment} key={comment.uuid}
                                                            post={post}
                                                            replyAdded={incrementComments}/>
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

function AuthorButtons(props: { post: any }) {
    const deletePost = () => {
        PostService.deletePost(props.post.uuid)
            .then(() => {
                window.location.href = window.location.href;
            })
    }

    return <>
        <div>
            <Link href={'/objavi?postUuid=' + props.post.uuid}>
                <a>
                    <button className="btn btn-outline mr-2 btn-sm" type="button">Uredi</button>
                </a>
            </Link>

            <button className="btn btn-link btn-sm" type="button" onClick={() => deletePost()}>Izbriši</button>
        </div>
    </>
}

function UpdatedTag() {
    return <span
        className="px-1 py-1 border-orange text-orange border text-sm tracking-wide leading-snug">Posodobljeno</span>
}

function EmptyStateComments() {
    return <div className="my-12 text-center">
        <h3 className="text-lg font-bold">Napiši prvi komentar in spremeni svet.</h3>

        <p className="text-sm">Čisto resno. Začni debato.</p>
    </div>
}

function LinkCard(props: { post: PostInterface }) {

    return <>
        <div className="flex flex-row">
            <div>
                <a href={props.post.content.link} title={props.post.content.data?.title}
                   rel={"nofollow noopener noreferrer"}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={'border border-black shadow'} height={100} width={100}
                         src={props.post.content.data?.openGraph['og:image']}
                         alt={props.post.content.data?.openGraph['og:image:alt']}/>
                </a>
            </div>
            <div className="flex-1 flex flex-col pl-4">
                <a href={props.post.content.link} title={props.post.content.data?.title}
                   rel={"nofollow noopener noreferrer"}>
                    <h3 className={'font-bold text-lg leading-normal tracking-wide text-black'}>{props.post.content.data?.title}</h3>
                </a>

                <p className="mb-0 text-basel leading-loose text-black">{props.post.content.data?.meta?.description}</p>

                <a href={props.post.content.link} title={props.post.content.data?.title}
                   rel={"nofollow noopener noreferrer"}>
                    <div className="flex flex-row text-sm mt-2 text-red">
                        <div className={'mr-2 text-sm'}>
                            <FontAwesomeIcon icon={faLink}/>
                        </div>
                        <span className="lowercase">{props.post.content.domain}</span>
                    </div>
                </a>
            </div>
        </div>
    </>
}

function PostSkeleton() {
    return <>
        <Navbar/>
        <main className={'my-6 flex flex-col'}>
            <div className="container mx-auto" style={{maxWidth: '780px'}}>
                <div className="mb-6 flex flex-row justify-between items-center">
                    <Breadcrumbs/>
                </div>

                <div className="card mb-4">
                    <div className="mb-3">
                        <Shimmer height={'2rem'}/>
                    </div>
                    <div className="">
                        <Shimmer height={'2rem'}/>
                    </div>

                    <hr className="my-4"/>

                    <div className="mb-3">
                        <Shimmer height={'2rem'}/>
                    </div>
                    <div className="mb-3">
                        <Shimmer height={'2rem'}/>
                    </div>
                    <div className="mb-3">
                        <Shimmer height={'2rem'}/>
                    </div>
                    <div className="mb-3">
                        <Shimmer height={'2rem'}/>
                    </div>
                    <div className="mb-3">
                        <Shimmer height={'2rem'}/>
                    </div>
                    <div className="mb-3">
                        <Shimmer height={'2rem'}/>
                    </div>
                    <div className="mb-3">
                        <Shimmer height={'2rem'}/>
                    </div>
                    <div className="">
                        <Shimmer height={'2rem'}/>
                    </div>

                </div>

                <div className="card">
                    <div>
                        <div className="flex flex-col">
                            <div className="mb-3">
                                <CommentSkeletonCard/>
                            </div>
                            <div className="mb-3">
                                <CommentSkeletonCard/>
                            </div>
                            <div className="mb-3">
                                <CommentSkeletonCard/>
                            </div>
                            <div className="mb-3">
                                <CommentSkeletonCard/>
                            </div>
                            <CommentSkeletonCard/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
}

export async function getServerSideProps(context: any) {
    const cookies = new Cookies(context.req, context.res)
    const isAuth = cookies.getAll().cookies.auth;
    const {slug} = context.params;

    let post = null;

    if (!isAuth) {
        post = (await PostService.getPost(slug)).data.data;
    }

    return {
        props: {
            post,
            slug,
        },
    }
}
