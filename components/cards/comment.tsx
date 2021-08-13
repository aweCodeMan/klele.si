import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import Author from "./author";
import {useState} from "react";
import SubmitComment from "../partials/submit-comment";
import {TimeUtil} from "../../helpers/time-util";

export default function Comment(props: { comment: any}) {

    const [isReplying, setIsReplying] = useState(false);
    const [comment, setComment] = useState(props.comment);

    const reply = () => {
        setIsReplying(true);
    }

    const onReplySubmitted = (reply: any) => {
        setIsReplying(false);

        const copy = {...comment};

        if (copy.hasOwnProperty('comments')) {
            copy.comments = [reply, ...copy.comments];
        } else {
            copy.comments = [];
        }

        setComment(copy);
    }

    const onCancelReply = () => {
        setIsReplying(false);
    };

    return (
        <div className={'relative'}>
            <div className={'flex flex-col mb-6'}>
                <div className="flex flex-row items-center">
                    <Author author={comment.author}
                            avatar={false}/> <span
                    className="mx-2">&#8212;</span> {TimeUtil.toHumanTime(comment.createdAt)}
                </div>

                <div className="prose my-2 pl-9" dangerouslySetInnerHTML={{__html: comment.html}}/>
                <div className="flex flex-row pl-9">
                    <button className="hover:text-red flex flex-row justify-center items-center mr-2">
                        <div className="text-lg mr-2">
                            <FontAwesomeIcon icon={faHeart}/>
                        </div>
                        <span className="text-sm font-bold">{comment.numberOfLikes}</span>
                    </button>
                    <button className="btn btn-sm btn-outline mr-2" onClick={reply} disabled={isReplying}>
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
                    <SubmitComment onSubmit={onReplySubmitted} onCancel={onCancelReply} parentUuid={comment.uuid}
                                   rootUuid={comment.rootUuid}/>
                </div> : undefined
            }

            {
                <div className={'ml-8 relative'}>
                    {
                        comment.comments.map((comment: any, index: any) => {
                            return <Comment comment={comment} key={index}/>
                        })
                    }
                </div>
            }
        </div>
    )
}
