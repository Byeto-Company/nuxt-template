// imports

import { useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiInfiniteManyResourceOptions<TResponse> = {
    urlSearchParams?: ComputedRef<Record<any, any>>;
    customResource?: {
        name: string;
        path: string;
    };
    options?: MaybeRefOrGetter<{
        pagination?: {
            limit?: number;
        };
<<<<<<< HEAD:layers/api-layer/composables/useInfiniteMany.ts
    }>;
    axiosInstance?: AxiosInstance;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseInfiniteQueryOptions<TResponse>, "queryKey" | "queryFn">>;
    handleError?: boolean;
    authorization?: boolean;
=======
    };
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseInfiniteQueryOptions<TResponse>, "queryKey" | "queryFn">>;
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useInfiniteMany.ts
};

const useInfiniteMany = <TResponse>({
    urlSearchParams,
    options,
    queryOptions,
    axiosOptions,
<<<<<<< HEAD:layers/api-layer/composables/useInfiniteMany.ts
    axiosInstance,
    handleError,
    authorization,
    customResource,
=======
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useInfiniteMany.ts
}: ApiInfiniteManyResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();

    const limitParam = useRouteQuery("limit", "10", { transform: Number });

    const optionsObject = computed(() => toValue(options));

    const limit = computed(() => optionsObject.value?.pagination?.limit ?? limitParam.value);

    // methods

    const handleInfiniteMany = async ({ limit, offset }: any) => {
        const { data } = await axios.get<ApiPaginated<TResponse>>(`${customResource?.path}/`, {
            params: {
                ...urlSearchParams?.value,
                limit: limit,
                offset: offset,
            },
            ...axiosOptions,
            authorization,
        });

        return data;
    };

<<<<<<< HEAD:layers/api-layer/composables/useInfiniteMany.ts
    return useInfiniteQuery<ApiPaginated<TResponse>, ApiError>({
        queryKey: [customResource?.name, urlSearchParams],
=======
    return useInfiniteQuery({
        queryKey: [resource, urlSearchParams ?? {}],
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useInfiniteMany.ts
        queryFn: ({ pageParam }) => handleInfiniteMany(pageParam),
        initialPageParam: {
            limit: limit.value,
            offset: 0,
        },
        getNextPageParam: (lastPage, pages) => {
            const page = pages.length + 1;

            const nextPageParams = {
                offset: page * limit.value - limit.value,
                limit: limit.value,
            };

            return lastPage?.next ? nextPageParams : undefined;
        },
<<<<<<< HEAD:layers/api-layer/composables/useInfiniteMany.ts
        meta: { handleError: handleError },

=======
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useInfiniteMany.ts
        ...queryOptions,
    });
};

export default useInfiniteMany;
