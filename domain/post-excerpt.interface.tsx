import {AuthorInterface} from "./author.interface";
import {ScoreInterface} from "./score.interface";
import {GroupInterface} from "./group.interface";
import {PostViewInterface} from "./post-view.interface";

export interface PostExcerptInterface {
    uuid: string;
    title: string;
    slug: string;
    content: any;
    postType: number;
    groupUuid: string;
    group: GroupInterface;
    author: AuthorInterface;
    html: string;
    score: ScoreInterface;
    numberOfComments: number;
    voted?: number | null;
    postView?: PostViewInterface;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
