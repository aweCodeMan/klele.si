import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import SubmitComment from "../partials/submit-comment";
import {CommentInterface} from "../../domain/comment.interface";
import AuthorMeta from "../partials/author-meta";
import Score from "../partials/score";
import {useAuth} from "../../contexts/auth";
import {PostService} from "../../helpers/post-service";
import {PostInterface} from "../../domain/post.interface";

export default function Comment(props: { comment: CommentInterface, replyAdded: Function, post: PostInterface, container?: any }) {
    const auth = useAuth();
    const [comment, setComment] = useState({...props.comment});
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const container = useRef(null);
    const start: any = useRef(null);
    const [lineSize, setLineSize] = useState(0);

    useEffect(() => {
        calculateLineSize();
    }, [])

    const calculateLineSize = () => {
        if (props.container && start) {
            const difference = start.current?.getBoundingClientRect().top - props.container.current.getBoundingClientRect().top;
            setLineSize(Math.round(difference));
        }
    }

    const openReply = () => {
        setIsReplying(true);
    }

    const closeReply = () => {
        setIsReplying(false);
    };

    const onReplyAdded = (reply: CommentInterface) => {
        setIsReplying(false);

        const updatedComment = {...comment};
        updatedComment.comments = updatedComment.hasOwnProperty('comments') ? [reply, ...updatedComment.comments] : [];

        setComment(updatedComment);
        props.replyAdded(updatedComment);
    }

    const deleteComment = () => {
        PostService.deleteComment(comment.uuid)
            .then((response) => {
                const deleted = {...response.data.data};
                deleted.comments = [...comment.comments];

                setComment(deleted);
            });
    }

    const restoreComment = () => {
        PostService.restoreComment(comment.uuid)
            .then((response) => {
                const restored = {...response.data.data};
                restored.comments = [...comment.comments];

                setComment(restored);
            });
    }

    const lockComment = () => {
        PostService.lockComment(comment.uuid)
            .then((response) => {
                const locked = {...response.data.data};
                locked.comments = [...comment.comments];

                setComment(locked);
            });
    }

    const unlockComment = () => {
        PostService.unlockComment(comment.uuid)
            .then((response) => {
                const unlocked = {...response.data.data};
                unlocked.comments = [...comment.comments];

                setComment(unlocked);
            });
    }

    const editComment = () => {
        setIsEditingComment(true);
    }

    const updateComment = (comment: CommentInterface) => {
        setComment({...comment});
        setIsEditingComment(false);
    }

    if (comment.deletedAt && comment.comments.length === 0) {
        return null;
    }

    const showContent = () => {
        if (comment.deletedAt) {
            return <div className={'text-gray flex flex-row items-center'}>
                <FontAwesomeIcon icon={faTrashAlt} className={'mr-2 text-sm'}/>
                <div className="mt-2 mb-2" dangerouslySetInnerHTML={{__html: comment.html}}/>
            </div>
        }

        return <div className="prose mt-3 mb-4" dangerouslySetInnerHTML={{__html: comment.html}}/>
    }

    const showAdminButtons = () => {
        const buttons = [];

        if (!comment.deletedAt && auth.hasPermission('delete comments')) {
            buttons.push(<button onClick={() => deleteComment()} className={'btn btn-sm btn-outline mr-2'}
                                 key={1}>Izbriši</button>)
        }

        if (comment.deletedAt && auth.hasPermission('restore comments')) {
            buttons.push(<button onClick={() => restoreComment()} className={'btn btn-sm btn-outline mr-2'}
                                 key={2}>Obnovi</button>)
        }

        if (!isEditingComment && auth.hasPermission('update comments')) {
            buttons.push(<button onClick={() => editComment()} className={'btn btn-sm btn-outline mr-2'} key={3}>Uredi</button>)
        }

        if (!comment.lockedAt && auth.hasPermission('lock comments')) {
            buttons.push(<button onClick={() => lockComment()} className={'btn btn-sm btn-outline mr-2'} key={4}>Zakleni</button>)
        }

        if (comment.lockedAt && auth.hasPermission('unlock comments')) {
            buttons.push(<button onClick={() => unlockComment()} className={'btn btn-sm btn-outline mr-2'} key={5}>Odkleni</button>)
        }

        if (buttons.length === 0) {
            return null;
        }


        return <div className={'card'}>{buttons}</div>;
    }

    return (
        <div ref={start} id={props.comment.uuid}>
            {
                props.container ? (lineSize == 0 ? <><Bend/>
                    <div className={'absolute bg-gray w-1 -mt-6'} style={{height: '18px', marginLeft: '-25px'}}/>
                </> : <><Bend/>
                    <div className={'absolute bg-gray w-1 -mt-6'}
                         style={{height: lineSize + 'px', marginTop: -1 * (lineSize + 8) + 'px', marginLeft: '-25px'}}/>
                </>) : null
            }

            <div className={'flex flex-col mb-6'}>
                {!comment.deletedAt ?
                    <div className="flex flex-row items-center">
                        <AuthorMeta author={comment.author} updatedAt={comment.updatedAt} createdAt={comment.createdAt}
                                    tag={props.post.author.uuid === comment.author.uuid ? <AuthorTag/> : null}
                                    emphasizeAuthor={true}
                                    timeSuffix={(comment.createdAt != comment.updatedAt) ? '(posodobljeno)' : ''}
                        />
                    </div> : null}

                {!isEditingComment ?
                    showContent() :
                    <div className="mt-2 mb-4"><SubmitComment onSubmit={(comment: any) => updateComment(comment)}
                                                              editComment={comment}
                                                              onCancel={() => setIsEditingComment(false)}/></div>
                }

                <div className="flex flex-col">

                    <div className="flex flex-row items-center">
                        <div className="mr-2">
                            <Score score={comment.score} type={'comment'} uuid={comment.uuid} voted={comment.voted}
                                   horizontal={true}/>
                        </div>

                        {!comment.lockedAt ? <button className="btn btn-sm btn-outline mr-2" onClick={openReply} disabled={isReplying}>
                    <span className="pr-2">
                    <FontAwesomeIcon icon={faComments}/>
                    </span>
                            Komentiraj
                        </button> : <button className="btn btn-sm btn-outline mr-2" disabled={true}>
                    <span className="pr-2">
                    <FontAwesomeIcon icon={faComments}/>
                    </span>
                            Zaklenjeno komentiranje
                        </button>}

                        {auth.user && auth.user.uuid === comment.author.uuid && !comment.deletedAt ?
                            <button className="btn btn-link btn-sm mr-2" type="button"
                                    onClick={() => editComment()}>Uredi</button> : null}

                        {auth.user && auth.user.uuid === comment.author.uuid && !comment.deletedAt ?
                            <button className="btn btn-link btn-sm mr-2" type="button"
                                    onClick={() => deleteComment()}>Izbriši</button> : null}

                    </div>

                    <div className="flex flex-row ml-5 mt-2">
                        {showAdminButtons()}
                    </div>
                </div>
            </div>
            {
                isReplying ? <div className="ml-8 mb-8">
                    <SubmitComment onSubmit={onReplyAdded} onCancel={closeReply} parentUuid={comment.uuid}
                                   rootUuid={comment.rootUuid}/>
                </div> : undefined
            }

            {
                <div className={'ml-8 relative'} ref={container}>
                    {
                        comment.comments.map((comment: any) => {
                            return <Comment comment={comment} key={comment.uuid} replyAdded={props.replyAdded}
                                            container={container}
                                            post={props.post}/>
                        })
                    }
                </div>
            }
        </div>
    )
}

function AuthorTag()
{
    return <span className="font-bold text-blue font-sm  leading-normal">[Avtor]</span>
}

function Bend()
{
    return <div className="w-10 h-10 border-4 border-gray absolute rounded-full -mt-7"
                style={{marginLeft: '-25px', clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0% 100%)'}}/>
}
