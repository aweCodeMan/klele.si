import ApiClient from "./api-client";

export namespace UserService {
    export function getProfile() {
        return ApiClient().get('/api/users/show');
    }
}
