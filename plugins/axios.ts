import axiosOriginal from "axios";
import { useAuth } from "~/composables/api/auth/useAuth";
import { API_ENDPOINTS } from "~/constants/api-endpoints";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const { token, logout } = useAuth();

    const axios = axiosOriginal.create({
        baseURL: config.public.API_BASE_URL
    });

    axios.interceptors.request.use((config) => {
        if (!config.url?.includes(API_ENDPOINTS.auth.signin)) {
            config.headers.Authorization = `Bearer ${token.value}`;
        }

        return config;
    });

    axios.interceptors.response.use((response) => {
        return response;
    }, function(error) {

        // if (error.status === 401) {
        //     logout();
        // }

        return Promise.reject(error);
    });

    return {
        provide: {
            axios
        }
    };

});