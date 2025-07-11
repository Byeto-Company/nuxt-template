import axiosOriginal from "axios";
import { API_ENDPOINTS } from "~/constants/api-endpoints";
import useAppServices from "../../stores/services/useAppServices";

const useCustomAxios = () => {
    const config = useRuntimeConfig();
    const { store } = useAppServices();

    const axios = axiosOriginal.create({
        baseURL: config.public.API_BASE_URL,
    });

    axios.interceptors.request.use((config) => {
        // const { currentLanguage } = useArticleBuilderStore();

        if (!config.url?.includes(API_ENDPOINTS.article.signin)) {
            config.headers.Authorization = store.token ? `Bearer ${store.token}` : undefined;
        }

        // @ts-ignore
        if (import.meta.client) {
            config.headers["Accept-Language"] = "fa";
        }

        return config;
    });

    return axios;
};

export default useCustomAxios;
