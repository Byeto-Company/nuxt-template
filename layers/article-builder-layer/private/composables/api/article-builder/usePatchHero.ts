// imports

import { useMutation } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";
import type { Article } from "../../../../stores/articleBuilder";
import useCustomAxios from "../../useCustomAxios";

// types

export type PatchHeroRequest = Partial<Omit<Article, "contents" | "parent">>;

export type PatchHeroResponse = Omit<Article, "contents">;

// composable

const usePatchHero = () => {
    const axios = useCustomAxios();

    const handlePatchHero = async (params: PatchHeroRequest) => {
        const { slug, ...rest } = params;

        const formData = new FormData();
        for (const key in rest) {
            if (Object.prototype.hasOwnProperty.call(rest, key)) {
                const value = (rest as any)[key];
                if (key === "thumbnail" && !value) {
                    const emptyFile = new File([], "", { type: "application/octet-stream" });
                    formData.append(key, emptyFile);
                } else if (value != null && value !== "") {
                    formData.append(key, value);
                }
            }
        }

        const { data } = await axios.patch<PatchHeroResponse>(`${API_ENDPOINTS.article.patch_hero}/${slug}/`, formData);

        return data;
    };

    return useMutation({
        mutationFn: (data: PatchHeroRequest) => handlePatchHero(data),
        retry: 0,
    });
};
export default usePatchHero;
