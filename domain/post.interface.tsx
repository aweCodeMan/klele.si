import {AuthorInterface} from "./author.interface";
import {ScoreInterface} from "./score.interface";
import {GroupInterface} from "./group.interface";
import {PostViewInterface} from "./post-view.interface";
import {PostExcerptInterface} from "./post-excerpt.interface";
import {CommentInterface} from "./comment.interface";

export interface PostInterface extends PostExcerptInterface {
    content: { link?: string, html?: string };
    comments: CommentInterface[];
}
