import {ApiClient} from "./api-client";

export namespace PostService {
    export function getFeed(query?: { groupUuid?: any, page?: any }) {
        return ApiClient.get('/api/feed', {params: query});
    }

    export function getPost(slug: string) {
        return ApiClient.get('/api/posts/' + slug);
    }

    export function transformMarkdown(markdown: string) {
        return ApiClient.post('/api/markdown', {markdown});
    }

    export function publish(form: any) {
        return ApiClient.post('/api/posts', form);
    }

    export function storeComment(postUuid: any, data: { parentUuid?: string, markdown: string }) {
        return ApiClient.post(`/api/posts/${postUuid}/comments`, data);
    }
}
