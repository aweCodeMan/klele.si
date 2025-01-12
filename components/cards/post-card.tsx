import Link from 'next/link'
import {PostExcerptInterface} from "../../domain/post-excerpt.interface";
import AuthorMeta from "../partials/author-meta";

export default function PostCard(props: { postExcerpt: PostExcerptInterface }) {

    return (
        <div className={'card flex flex-row'}>
            <div className={'flex-1 flex flex-col'}>
                <div className="flex flex-row">

                    <h2 className={'flex-1 text-xl text-black font-bold leading-snug break-word -mt-1'}>
                        <Link href={`${props.postExcerpt.slug}`} title={props.postExcerpt.title} className={''}>
                                <span className=" mr-2">
                                    {props.postExcerpt.title}
                                </span>
                        </Link>

                    </h2>
                </div>

                <AuthorMeta author={props.postExcerpt.author} updatedAt={props.postExcerpt.updatedAt}
                            createdAt={props.postExcerpt.createdAt}/>
            </div>
        </div>
    )
}
