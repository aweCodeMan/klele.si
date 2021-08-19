import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import Author from "./author";
import {useState} from "react";
import SubmitComment from "../partials/submit-comment";
import {TimeUtil} from "../../helpers/time-util";
import {CommentInterface} from "../../domain/comment.interface";
import AuthorMeta from "../partials/author-meta";
import Score from "../partials/score";
import {useAuth} from "../../contexts/auth";
import {PostService} from "../../helpers/post-service";
import {PostInterface} from "../../domain/post.interface";

export default function Comment(props: { comment: CommentInterface, replyAdded: Function, post: PostInterface }) {
    const auth = useAuth();
    const [comment, setComment] = useState({...props.comment});
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [isReplying, setIsReplying] = useState(false);

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

    return (
        <div>
            <div className={'flex flex-col mb-6'}>
                {!comment.deletedAt ?
                    <div className="flex flex-row items-center">
                        <AuthorMeta author={comment.author} updatedAt={comment.updatedAt} createdAt={comment.createdAt}
                                    tag={props.post.author.uuid === comment.author.uuid ? <AuthorTag/> : null}
                                    emphasizeAuthor={true}/>
                    </div> : null}

                {!isEditingComment ?
                    <div className="prose mt-3 mb-4" dangerouslySetInnerHTML={{__html: comment.html}}/> :
                    <div className="mt-2 mb-4"><SubmitComment onSubmit={(comment: any) => updateComment(comment)}
                                                              editComment={comment}
                                                              onCancel={() => setIsEditingComment(false)}/></div>
                }

                <div className="flex flex-row items-center">
                    <div className="mr-2">
                        <Score score={comment.score} type={'comment'} uuid={comment.uuid} voted={comment.voted}
                               horizontal={true}/>
                    </div>
                    <button className="btn btn-sm btn-outline mr-2" onClick={openReply} disabled={isReplying}>
                    <span className="pr-2">
                    <FontAwesomeIcon icon={faComments}/>
                    </span>
                        Komentiraj
                    </button>

                    {auth.user && auth.user.uuid === comment.author.uuid && !comment.deletedAt ?
                        <button className="btn btn-link btn-sm mr-2" type="button"
                                onClick={() => editComment()}>Uredi</button> : null}

                    {auth.user && auth.user.uuid === comment.author.uuid && !comment.deletedAt ?
                        <button className="btn btn-link btn-sm mr-2" type="button"
                                onClick={() => deleteComment()}>Izbriši</button> : null}
                </div>
            </div>
            {
                isReplying ? <div className="ml-8 mb-8">
                    <SubmitComment onSubmit={onReplyAdded} onCancel={closeReply} parentUuid={comment.uuid}
                                   rootUuid={comment.rootUuid}/>
                </div> : undefined
            }

            {
                <div className={'ml-8 relative'}>
                    {
                        comment.comments.map((comment: any) => {
                            return <Comment comment={comment} key={comment.uuid} replyAdded={props.replyAdded}
                                            post={props.post}/>
                        })
                    }
                </div>
            }
        </div>
    )
}

function AuthorTag() {
    return <span className="font-bold text-blue font-sm  leading-normal">[Avtor]</span>
}
