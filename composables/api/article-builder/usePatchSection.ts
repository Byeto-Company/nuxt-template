// imports

import { API_ENDPOINTS } from "~/constants/api-endpoints";

// types

export type PatchSectionRequest = Partial<Pick<ArticleSection, "content_value" | "options">>;

// composable

const usePatchSection = () => {
    return useUpdate<any, PatchSectionRequest>({
        customResource: {
            path: API_ENDPOINTS.article.patch_section,
        },
        options: {
            contentType: "form",
        },
    });
};

export default usePatchSection;
