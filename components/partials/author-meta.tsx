import {AuthorInterface} from "../../domain/author.interface";
import Author from "../cards/author";
import {TimeUtil} from "../../helpers/time-util";

export default function AuthorMeta(props: { author: AuthorInterface, updatedAt: string, createdAt: string }) {
    return <div className="flex flex-row flex-wrap items-center text-sm leading-snug tracking-wide"
                style={{color: '#7D7D7D'}}><Author
        author={props.author}/> <span className="mx-1">&#8212;</span> {TimeUtil.toHumanTime(props.createdAt)}</div>
}
