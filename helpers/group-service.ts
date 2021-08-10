import {ApiClient} from "./api-client";

export namespace GroupService {
    export function getGroups() {
        return ApiClient.get('/api/groups');
    }
}
