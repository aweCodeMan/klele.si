import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import Author from "./author";
import {comment} from "postcss";


export default function Comment(props: { comment: any }) {
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
                    <button className="btn btn-sm btn-outline mr-2">
                          <span className="pr-2">
                                    <FontAwesomeIcon icon={faComments}/>
                                </span>
                        Komentiraj
                    </button>
                    <button className="btn btn-sm btn-link">Prijavi</button>
                </div>
            </div>
            {
                <div className={'ml-8 relative'}>
                    {
                        props.comment.replies.map((comment: any, index: any) => {
                            return <><Comment comment={comment} key={index}/></>
                        })
                    }
                </div>
            }
        </div>
    )
}
