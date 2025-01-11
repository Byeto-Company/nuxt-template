import axiosOriginal from "axios";

export default defineNuxtPlugin(() => {

    const config = useRuntimeConfig();

    const baseURL = config.public.API_BASE_URL as string | undefined;

    const axios = axiosOriginal.create({ baseURL });

    axios.interceptors.request.use((config) => {
        // if (
        //     !config.url?.includes(API_ENDPOINTS.auth.login) &&
        //     !config.url?.includes(API_ENDPOINTS.user.sendOtp)
        // ) {
        //     const { token } = useServices();
        //     config.headers.Authorization = `Bearer ${token.value}`;
        // }

        return config;
    });

    return {
        provide: { axios }
    };
});