import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import {faComments} from "@fortawesome/free-solid-svg-icons/faComments";

export default function PostCard(props: { postExcerpt: any }) {
    return (
        <div className={'border border-black bg-white p-3 shadow'}>
            <div className="flex flex-row">
                <div className={'flex flex-col mr-2 items-center'}>
                    <div className="text-lg">
                        <FontAwesomeIcon icon={faHeart}/>
                    </div>
                    <span className="text-sm font-bold text-black opacity-50">{props.postExcerpt.numberOfLikes}</span>
                </div>
                <div className={'flex-1 flex flex-col'}>
                    <h2 className={'text-lg text-black font-bold leading-normal'}>{props.postExcerpt.title}</h2>

                    <div className={'text-sm text-black opacity-80 mt-2'}>
                        {props.postExcerpt.author.name} &#8212; Danes ob 18:47
                    </div>

                    <div className={'mt-4'}>
                        <Link href="#comments">
                            <a className={'bg-white border border-black px-3 py-1 shadow text-sm font-bold'}>
                                <span className="pr-2">
                                    <FontAwesomeIcon icon={faComments}/>
                                </span>

                                {props.postExcerpt.numberOfComments} komentarjev
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
