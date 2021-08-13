import axios, {AxiosResponse} from 'axios';

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

client.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error => {
    if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = window.location.href;
        return false;
    }

    return Promise.reject(error);
}))

export const ApiClient = client;
