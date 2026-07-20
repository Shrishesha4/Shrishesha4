import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const api = axios.create({
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    // Add loading state
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Handle global error cases
    return Promise.reject(error);
});

export const apiService = {
    async request<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            const response = await api(config);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};