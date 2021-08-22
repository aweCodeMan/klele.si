import {ApiClient} from "./api-client";
import {PaginatedResponseInterface} from "../domain/paginated-response.interface";
import {PostInterface} from "../domain/post.interface";
import {SingleResponseInterface} from "../domain/single-response.interface";
import {PostExcerptInterface} from "../domain/post-excerpt.interface";
import {AxiosResponse} from "axios";


export namespace PostService {
    export function getCombinedFeed(query: { groupUuid?: string, page?: string }): Promise<AxiosResponse<PaginatedResponseInterface<PostExcerptInterface>>> {
        const groupUuid = query.groupUuid;
        const page = query.page ?? "1";

        if (page && page != '1') {
            return PostService.getFeed({groupUuid, page}).then((response) => response.data).then();
        }

        return Promise.all([
            PostService.getPinnedPosts({groupUuid}),
            PostService.getFeed({groupUuid, page})
        ]).then((responses) => {
            const result = {...responses[1].data};
            result.data = [...responses[0].data.data, ...result.data];
            return result
        }).then();
    }

    export function getFeed(query?: { groupUuid?: string, page?: string }): Promise<AxiosResponse<PaginatedResponseInterface<PostExcerptInterface>>> {
        return ApiClient.get('/api/feed', {params: query});
    }

    export function getPinnedPosts(query: { groupUuid?: string }): Promise<AxiosResponse<PaginatedResponseInterface<PostExcerptInterface>>> {
        return ApiClient.get('/api/pinned-posts', {params: query});
    }

    export function getPost(slug: string): Promise<AxiosResponse<SingleResponseInterface<PostInterface>>> {
        return ApiClient.get('/api/posts/' + slug);
    }

    export function deleteComment(commentUuid: string) {
        return ApiClient.delete(`/api/comments/${commentUuid}`);
    }

    export function updateComment(commentUuid: string, data: { markdown: string }) {
        return ApiClient.put(`/api/comments/${commentUuid}`, data);
    }

    export function vote(data: { type: string; uuid: string; vote: number }) {
        return ApiClient.post('/api/votes', data);
    }

    export function getEdit(uuid: string) {
        return ApiClient.get(`/api/posts/${uuid}/form`);
    }

    export function update(uuid: string, form: any) {
        return ApiClient.put(`/api/posts/${uuid}`, form);
    }

    export function deletePost(uuid: string) {
        return ApiClient.delete('/api/posts/' + uuid);
    }

    export function transformMarkdown(markdown: string) {
        return ApiClient.post('/api/markdown', {markdown});
    }

    export function publish(form: any) {
        return ApiClient.post('/api/posts', form);
    }

    export function sendView(postUuid: string) {
        return ApiClient.post('/api/views', {postUuid});
    }

    export function storeComment(postUuid: any, data: { parentUuid?: string, markdown: string }) {
        return ApiClient.post(`/api/posts/${postUuid}/comments`, data);
    }
}
