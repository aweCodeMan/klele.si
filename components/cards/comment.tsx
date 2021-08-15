import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import Author from "./author";
import {useState} from "react";
import SubmitComment from "../partials/submit-comment";
import {TimeUtil} from "../../helpers/time-util";
import {CommentInterface} from "../../domain/comment.interface";

export default function Comment(props: { comment: CommentInterface, replyAdded: Function }) {

    const [comment, setComment] = useState({...props.comment});
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

    return (
        <div>
            <div className={'flex flex-col mb-6'}>
                <div className="flex flex-row items-center">
                    <Author author={comment.author}/> <span
                    className="mx-2">&#8212;</span> {TimeUtil.toHumanTime(comment.createdAt)}
                </div>

                <div className="prose my-2 pl-9" dangerouslySetInnerHTML={{__html: comment.html}}/>
                <div className="flex flex-row pl-9">
                    <button className="hover:text-red flex flex-row justify-center items-center mr-2">
                        <div className="text-lg mr-2">
                            <FontAwesomeIcon icon={faHeart}/>
                        </div>
                        <span className="text-sm font-bold">{comment.score.votes}</span>
                    </button>
                    <button className="btn btn-sm btn-outline mr-2" onClick={openReply} disabled={isReplying}>
                          <span className="pr-2">
                                    <FontAwesomeIcon icon={faComments}/>
                                </span>
                        Odgovori
                    </button>
                    <button className="btn btn-sm btn-link hidden">Prijavi</button>
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
                        comment.comments.map((comment: any, index: any) => {
                            return <Comment comment={comment} key={index} replyAdded={props.replyAdded}/>
                        })
                    }
                </div>
            }
        </div>
    )
}
