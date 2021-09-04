import {ApiClient} from "./api-client";

export namespace UserService {
    export function getProfile() {
        return ApiClient.get('/api/users/show');
    }

    export function getStats() {
        return ApiClient.get('/api/users/stats');
    }

    export function getNotifications(page: number) {
        return ApiClient.get('/api/notifications', {params: {page}});
    }

    export function readNotification(uuid: string) {
        return ApiClient.put(`/api/notifications/${uuid}`);
    }

    export function markAllNotificationsAsRead() {
        return ApiClient.post(`/api/notifications/all-read`);
    }
}
