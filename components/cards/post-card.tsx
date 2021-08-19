import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComments, faLink, faPencilAlt, faThumbtack} from '@fortawesome/free-solid-svg-icons'
import {PostExcerptInterface} from "../../domain/post-excerpt.interface";
import {useAuth} from "../../contexts/auth";
import Score from "../partials/score";
import Group from "../partials/group";
import AuthorMeta from "../partials/author-meta";
import {PostUtil} from "../../helpers/post-util";

export default function PostCard(props: { postExcerpt: PostExcerptInterface }) {
    const auth = useAuth();

    const hasBeenVisited = () => {
        return props.postExcerpt.postView;
    }

    const isAuthor = () => {
        return auth.user && auth.user.uuid === props.postExcerpt.author.uuid;
    }

    return (
        <div className={'card flex flex-row'} style={{backgroundColor: hasBeenVisited() ? 'transparent' : ''}}>
            <div className={'flex flex-col mr-3 items-center'}>
                <Score score={props.postExcerpt.score} type={'post'} uuid={props.postExcerpt.uuid}
                       horizontal={false}
                       voted={props.postExcerpt.voted}/>
            </div>
            <div className={'flex-1 flex flex-col'}>
                <div className="flex flex-row">

                    <h2 className={'flex-1 text-xl text-black font-bold leading-snug break-word -mt-1'}>
                        <Link href={`/guna/${props.postExcerpt.slug}`}>
                            <a title={props.postExcerpt.title} className={''}>
                                {props.postExcerpt.postType === 1 ?
                                    <span className={'mr-2 text-sm mt-1'}>
                                        <FontAwesomeIcon icon={faLink}/>
                                    </span> : null}

                                <span className=" mr-2">
                                    {props.postExcerpt.title}
                                </span>
                            </a>
                        </Link>

                        {
                            props.postExcerpt.postType === 1 ?
                                <a href={props.postExcerpt.content.link} title={props.postExcerpt.content.domain}
                                   className={'text-sm opacity-70 text-red break-normal'}
                                   rel={"nofollow noopener noreferrer"}>
                                    ({props.postExcerpt.content.domain})
                                </a> : null
                        }
                    </h2>

                    {props.postExcerpt.pinnedAt ? <div className="mr-1"><Pin post={props.postExcerpt}/></div> : null}

                </div>

                <div className="flex flex-row flex-wrap">
                    <div className="mr-2">
                        <Group group={props.postExcerpt.group}/>
                    </div>
                    <AuthorMeta author={props.postExcerpt.author} updatedAt={props.postExcerpt.updatedAt}
                                createdAt={props.postExcerpt.createdAt}/>
                </div>
                <div className="flex flex-row flex-wrap items-center mt-2">
                    <Link href={`/guna/${props.postExcerpt.slug}`}>
                        <a className={'btn btn-outline btn-sm mr-2'} title={props.postExcerpt.title}>
                                <span
                                    className={'pr-2 ' + (PostUtil.getCommentDifference(props.postExcerpt) > 0 ? 'text-red ' : '')}>
                                    <FontAwesomeIcon icon={faComments}/>
                                </span>

                            {PostUtil.getCommentsText(props.postExcerpt.numberOfComments)} {PostUtil.getCommentDifferenceText(props.postExcerpt)}
                        </a>
                    </Link>

                    {isAuthor() ? <Link href={`/objavi?postUuid=${props.postExcerpt.uuid}`}>
                        <a className={'btn btn-link btn-sm mr-2'} title="Uredi prispevek">
                                <span className={'pr-2'}>
                                    <FontAwesomeIcon icon={faPencilAlt}/>
                                </span>
                            Uredi
                        </a>
                    </Link> : null}
                </div>
            </div>
        </div>
    )
}

function Pin(props: { post: PostExcerptInterface }) {
    return <div className={"relative " + (props.post.pinnedUntil ? 'text-green' : 'text-orange')}
                title={props.post.pinnedUntil ? PostUtil.getPinnedTime(props.post.pinnedDaysToGo) : 'Pripeto za vse večne čase'}>
        <FontAwesomeIcon icon={faThumbtack}/>

        <div className="absolute" style={{bottom: '-7px', right: '-14px', transform: 'rotate(-90deg)'}}>
            <ProgressRing radius={20} stroke={3} progress={props.post.pinnedProgress}/>
        </div>
    </div>
}

function ProgressRing(props: { radius: number, stroke: number, progress: number }) {
    const normalizedRadius = props.radius - props.stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - props.progress / 100 * circumference;

    return (
        <svg
            height={props.radius * 2}
            width={props.radius * 2}
        >
            <circle
                stroke="currentColor"
                fill="transparent"
                strokeWidth={props.stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{strokeDashoffset}}
                r={normalizedRadius}
                cx={props.radius}
                cy={props.radius}
            />
        </svg>
    );
}
