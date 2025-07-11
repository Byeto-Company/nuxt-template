import { API_ENDPOINTS } from "~/constants/api-endpoints";
import { QUERY_KEYS } from "~/constants/query-keys";
import { useAppParams } from "../../useAppParams";
import type { Article } from "../../../../stores/articleBuilder";
import useCustomAxios from "../../useCustomAxios";

export type GetArticleResponse = Article;

const useGetArticle = () => {
    // state

    const axios = useCustomAxios();

    const { slug } = useAppParams();

    // computed

    const slugIdProp = computed(() => (unref(slug) ? `${unref(slug)}/` : ""));

    // query

    return useOne<GetArticleResponse>({
        id: slugIdProp,
        axiosInstance: axios,
        customResource: {
            name: QUERY_KEYS.article,
            path: API_ENDPOINTS.article.get,
        },
        queryOptions: {
            enabled: !!slug.value,
        },
    });
};

export default useGetArticle;
