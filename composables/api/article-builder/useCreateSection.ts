// imports

import { useMutation } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";

// types

export type CreateSectionRequest = {
    slug: string;
    order: number;
    options: Pick<ArticleSection, "options">;
    content_type: Pick<ArticleSection, "content_type">;
    content_value: Pick<ArticleSection, "content_value">;
};

export type CreateSectionResponse = any;

// composable

const useCreateSection = () => {
    const { $axios: axios } = useNuxtApp();

    const handleCreateSection = async (params: CreateSectionRequest) => {
        const { slug, ...rest } = params;
        const { data } = await axios.post<CreateSectionResponse>(`${API_ENDPOINTS.article.create_section}/${slug}/`, {
            ...rest,
        });

        return data;
    };

    return useMutation({
        mutationFn: (data: CreateSectionRequest) => handleCreateSection(data),
    });
};

export default useCreateSection;
