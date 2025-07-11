// imports

import { useMutation } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";
import type { ArticleSection } from "../../../../stores/articleBuilder";
import useCustomAxios from "../../useCustomAxios";

// types

export type CreateSectionRequest = {
    slug: string;
    order: number;
    options: Pick<ArticleSection, "options">;
    content_type: Pick<ArticleSection, "content_type">;
    content_value: Pick<ArticleSection, "content_value">;
};

export type CreateSectionResponse = ArticleSection;

// composable

const useCreateSection = () => {
    const axios = useCustomAxios();

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
