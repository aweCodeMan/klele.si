import {AuthorInterface} from "./author.interface";
import {ScoreInterface} from "./score.interface";
import {GroupInterface} from "./group.interface";
import {PostViewInterface} from "./post-view.interface";
import {PostExcerptInterface} from "./post-excerpt.interface";
import {CommentInterface} from "./comment.interface";

export interface PostInterface extends PostExcerptInterface {
    content: { link?: string, domain?: string, data?: LinkDataInterface, html?: string };
    comments: CommentInterface[];
}

export interface LinkDataInterface {
    title: string;
    meta: any;
    openGraph: any;
}
