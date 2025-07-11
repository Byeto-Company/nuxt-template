// imports

import { API_ENDPOINTS } from "~/constants/api-endpoints";
import type { ArticleSection } from "../../../../stores/articleBuilder";
import useCustomAxios from "../../useCustomAxios";

// types

export type PatchSectionRequest = Partial<Pick<ArticleSection, "content_value" | "options">>;

// composable

const usePatchSection = () => {
    // states

    const axios = useCustomAxios();

    return useUpdate<any, PatchSectionRequest>({
        axiosInstance: axios,
        customResource: {
            path: API_ENDPOINTS.article.patch_section,
        },
    });
};

export default usePatchSection;
