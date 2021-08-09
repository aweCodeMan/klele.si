import axios from 'axios';

export default function ApiClient() {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
    });
}
