import axiosOriginal from "axios";
import { API_ENDPOINTS } from "~/constants/api-endpoints";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const { token } = useAuth();

    const axios = axiosOriginal.create({
        baseURL: config.public.API_BASE_URL,
    });

    axios.interceptors.request.use((config) => {
        if (config.authorization) {
            config.headers.Authorization = token.value ? `Bearer ${token.value}` : undefined;
        }

        return config;
    });

    // axios.interceptors.response.use(
    //     (response) => {
    //         return response;
    //     },
    //     async function (error) {
    //         return Promise.reject(error);
    //     }
    // );

    return {
        provide: {
            axios,
        },
    };
});
