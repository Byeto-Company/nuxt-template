// imports

import { API_ENDPOINTS } from "~/constants/api-endpoints";
import { useAppParams } from "../../useAppParams";
import useCustomAxios from "../../useCustomAxios";

// types

export type ReorderSectionRequest = {
    content_id: number;
    new_order: number | undefined;
};

// composable

const useReorderSection = () => {
    // state

    const axios = useCustomAxios();
    const { slug } = useAppParams();

    return useCreate<any, ReorderSectionRequest>({
        axiosInstance: axios,
        customResource: {
            path: `${API_ENDPOINTS.article.reorder_section}/${slug.value}/`,
        },
    });
};

export default useReorderSection;
