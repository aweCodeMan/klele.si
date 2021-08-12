import {ApiClient} from "./api-client";

export namespace PostService {
    export function getFeed() {
        return ApiClient.get('/api/feed');
    }
}
