import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import {faComments, faShareAlt} from "@fortawesome/free-solid-svg-icons";

export default function PostCard(props: { postExcerpt: any }) {
    return (
        <div className={'card'}>
            <div className="flex flex-row">
                <div className={'flex flex-col mr-3 items-center'}>
                    <button className="hover:text-red">
                        <div className="text-lg">
                            <FontAwesomeIcon icon={faHeart}/>
                        </div>
                        <span className="text-sm font-bold opacity-50">{props.postExcerpt.numberOfLikes}</span>
                    </button>
                </div>
                <div className={'flex-1 flex flex-col'}>
                    <Link href="#">
                        <a>
                            <h2 className={'text-lg text-black font-bold leading-normal'}>{props.postExcerpt.title}</h2>
                        </a>
                    </Link>

                    <div className={'text-sm font-bold leading-normal tracking-tight'}>
                        <Link href="#group">
                            <a style={{color: props.postExcerpt.group.color}}>
                                #{props.postExcerpt.group.name}
                            </a>
                        </Link>
                    </div>

                    <div className={'text-sm text-black opacity-80 mt-2'}>
                        {props.postExcerpt.author.name} &#8212; Danes ob 18:47
                    </div>

                    <div className={'mt-4 flex flex-row'}>
                        <Link href="#comments">
                            <a className={'btn btn-outline btn-sm mr-2'}>
                                <span className="pr-2">
                                    <FontAwesomeIcon icon={faComments}/>
                                </span>

                                {props.postExcerpt.numberOfComments} komentarjev
                            </a>
                        </Link>

                        <Link href="#share">
                            <a className={'btn btn-link btn-sm'}>
                                <span className="pr-2">
                                    <FontAwesomeIcon icon={faShareAlt}/>
                                </span>

                                Deli objavo
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
