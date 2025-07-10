// imports

import { API_ENDPOINTS } from "~/constants/api-endpoints";
import { useAppParams } from "~/composables/global/useAppParams";

// types

export type ReorderSectionRequest = {
    content_id: number;
    new_order: number | undefined;
};

// composable

const useReorderSection = () => {
    // state

    const { slug } = useAppParams();

    return useCreate<any, ReorderSectionRequest>({
        customResource: {
            path: `${API_ENDPOINTS.article.reorder_section}/${slug.value}/`,
        },
    });
};

export default useReorderSection;
