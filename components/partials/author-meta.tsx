import {AuthorInterface} from "../../domain/author.interface";
import Author from "../cards/author";
import {TimeUtil} from "../../helpers/time-util";

export default function AuthorMeta(props: { author: AuthorInterface, updatedAt: string, createdAt: string, emphasizeAuthor?: boolean, tag?: any, timeSuffix?: any }) {
    return <div
        className={"flex flex-row flex-wrap items-center text-sm leading-snug tracking-wide"}
        style={{color: '#7D7D7D'}}><Author emphasizeAuthor={props.emphasizeAuthor}
                                           author={props.author}/> <span
        className={props.tag ? 'ml-1' : ''}>{props.tag}</span> <span
        className="mx-1">&#8212;</span> {TimeUtil.toHumanTime(props.createdAt)} {props.timeSuffix}</div>
}
