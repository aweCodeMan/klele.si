import Head from 'next/head'
import Link from 'next/link';
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun, faBurn, faSignal} from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "../../components/partials/breadcrumbs";
import Comment from "../../components/cards/comment";
import CommentSkeletonCard from "../../components/cards/comment-skeleton-card";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import Author from "../../components/cards/author";
import SubmitComment from "../../components/partials/submit-comment";
import Navbar from "../../components/navbar";
import AuthModal from "../../components/modals/auth-modal";
import {PostService} from "../../helpers/post-service";
import {TimeUtil} from "../../helpers/time-util";

export default function Guna(props: { response: any }) {

    const [type, setType] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(props.response);

    function onTypeChange(event: React.MouseEvent<HTMLButtonElement>, number: number) {
        setType(number);
    }

    const commentAdded = (comment: any) => {
        const update = {...response};
        update.data.numberOfComments++;
        update.data.comments = [comment, ...response.data.comments];

        setResponse(update);
    }

    const replyAdded = (comment: any) => {
        const update = {...response};
        update.data.numberOfComments++;

        setResponse(update);
    }

    return (
        <div>
            <Head>
                <title>To je guna objava! | Klele.si</title>
                <meta name="description" content="To je guna objava!"/>
            </Head>

            <Navbar/>

            <main className={'my-6 flex flex-col'}>
                <div className="container mx-auto" style={{maxWidth: '780px'}}>
                    <div className="mb-6">
                        <Breadcrumbs/>
                    </div>

                    <div className="card mb-4">
                        <h1 className="text-lg sm:text-2xl md:text-4xl font-bold leading-snug tracking-wide text-black mb-2">{response.data.title}</h1>

                        <div className={'text-sm font-bold leading-normal tracking-tight mb-4'}>
                            <Link href="#group">
                                <a style={{color: response.data.group.color}}>
                                    #{response.data.group.name}
                                </a>
                            </Link>
                        </div>

                        <div className="flex flex-row items-center  mt-2">
                            <div className={'flex flex-col mr-3 items-center'}>
                                <button className="hover:text-red flex flex-row items-center">
                                    <div className="text-lg mr-2">
                                        <FontAwesomeIcon icon={faHeart}/>
                                    </div>
                                    <span
                                        className="text-sm font-bold opacity-50">{response.data.numberOfLikes}</span>
                                </button>
                            </div>
                            <div className={'text-sm text-black opacity-80 flex flex-row justify-center items-center'}>
                                <Author author={response.data.author}
                                        avatar={false}/> &#8212; {TimeUtil.toHumanTime(response.data.createdAt)}
                            </div>
                        </div>

                        <hr className={'my-4'}/>

                        {
                            response.data.postType === 0 ? <div className="prose"
                                                                dangerouslySetInnerHTML={{__html: response.data.content.html}}/> :
                                <a href={response.data.content.link} rel={"nofollow noopener noreferrer"}
                                   target={'_blank'}>{response.data.content.link}</a>
                        }

                    </div>

                    <SubmitComment onSubmit={(comment: any) => commentAdded(comment)} rootUuid={response.data.uuid}/>

                    <div className="card" style={{borderTop: '0'}}>
                        <div>
                            <div className="flex flex-row justify-center items-center my-3">
                                <h2 className={'flex-1 font-bold tracking-wide text-xl leading-normal'}>Komentarji
                                    ({response.data.numberOfComments})</h2>

                                <div className="flex flex-row hidden">
                                    <button
                                        className={type === 0 ? 'btn btn-primary btn-sm selected mb-3 sm:mb-0 mr-3' : 'btn btn-outline btn-sm mb-3 sm:mb-0 mr-3'}
                                        onClick={(event) => onTypeChange(event, 0)}>
                                        <FontAwesomeIcon icon={faSun} className={'mr-2'}/>
                                        Po vrsti
                                    </button>
                                    <button
                                        className={type === 1 ? 'btn btn-primary btn-sm selected mb-3 sm:mb-0' : 'btn btn-outline btn-sm mb-3 sm:mb-0'}
                                        onClick={(event) => onTypeChange(event, 1)}>
                                        <FontAwesomeIcon icon={faSignal} className={'mr-2'}/>
                                        Po priljubljenosti
                                    </button>
                                </div>
                            </div>

                            {
                                isLoading ? <CommentSkeletonCard/> : <div className="flex flex-col">
                                    {
                                        response.data.comments.map((comment: any, index: number) => {
                                            return <Comment comment={comment} key={index} replyAdded={replyAdded}/>
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

export async function getServerSideProps(context: any) {
    const {slug} = context.params;
    const response = await PostService.getPost(slug);

    return {
        props: {
            response: response.data,
        },
    }
}
