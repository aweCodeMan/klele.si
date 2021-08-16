import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComments, faLink, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
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
                <Link href={`/guna/${props.postExcerpt.slug}`}>
                    <a title={props.postExcerpt.title} className={'flex flex-row items-center block'}>
                        {props.postExcerpt.postType === 1 ?
                            <div className={'mr-2 text-sm'}>
                                <FontAwesomeIcon icon={faLink}/>
                            </div> : null}

                        <h2 className={'text-xl text-black font-bold leading-snug -mt-1'}>{props.postExcerpt.title}</h2>
                    </a>
                </Link>
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
