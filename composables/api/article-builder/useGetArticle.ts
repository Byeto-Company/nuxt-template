import { useAppParams } from "~/composables/global/useAppParams";
import { API_ENDPOINTS } from "~/constants/api-endpoints";
import { QUERY_KEYS } from "~/constants/query-keys";

export type GetArticleResponse = Article;

const useGetArticle = () => {
    // state

    const { slug } = useAppParams();

    // computed

    const slugIdProp = computed(() => (unref(slug) ? `${unref(slug)}/` : ""));

    // query

    return useOne<GetArticleResponse>({
        id: slugIdProp,
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
