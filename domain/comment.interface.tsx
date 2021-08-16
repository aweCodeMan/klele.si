import {AuthorInterface} from "./author.interface";
import {ScoreInterface} from "./score.interface";

export interface CommentInterface {
    uuid: string;
    rootUuid: string;
    parentUuid: string;
    author: AuthorInterface;
    html: string;
    markdown: string;
    comments: CommentInterface[];
    score: ScoreInterface;
    voted?: number | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}
