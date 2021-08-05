import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import Author from "./author";
import {useState} from "react";
import SubmitComment from "../partials/submit-comment";

export default function Comment(props: { comment: any }) {

    const [isReplying, setIsReplying] = useState(false);

    const reply = () => {
        setIsReplying(true);
        console.log('reply');
    }

    const onReplySubmitted = () => {
        setIsReplying(false);
        console.log('comment submitted');
    }

    const onCancelReply = () => {
        setIsReplying(false);
    };

    return (
        <div className={'relative'}>
            <div className={'flex flex-col mb-6'}>
                <div className="flex flex-row items-center">
                    <Author author={props.comment.author} avatar={true}/>
                    &#8212; Danes ob 18:47
                </div>

                <div className="prose my-2 pl-9" dangerouslySetInnerHTML={{__html: props.comment.html}}/>
                <div className="flex flex-row pl-9">
                    <button className="hover:text-red flex flex-row justify-center items-center mr-2">
                        <div className="text-lg mr-2">
                            <FontAwesomeIcon icon={faHeart}/>
                        </div>
                        <span className="text-sm font-bold">{props.comment.numberOfLikes}</span>
                    </button>
                    <button className="btn btn-sm btn-outline mr-2" onClick={reply} disabled={isReplying}>
                          <span className="pr-2">
                                    <FontAwesomeIcon icon={faComments}/>
                                </span>
                        Odgovori
                    </button>
                    <button className="btn btn-sm btn-link">Prijavi</button>
                </div>
            </div>
            {
                isReplying ? <div className="ml-8 mb-8">
                    <SubmitComment onSubmit={onReplySubmitted} onCancel={onCancelReply}/>
                </div> : undefined
            }

            {
                <div className={'ml-8 relative'}>
                    {
                        props.comment.replies.map((comment: any, index: any) => {
                            return <Comment comment={comment} key={index}/>
                        })
                    }
                </div>
            }
        </div>
    )
}
