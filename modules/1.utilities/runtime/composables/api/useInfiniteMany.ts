// imports

import { useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiInfiniteManyResourceOptions = {
    resource: ApiResources
    urlSearchParams?: ComputedRef<Record<any, any>>,
    options?: {
        pagination?: {
            limit?: number,
        }
    },
    axiosOptions?: Omit<AxiosRequestConfig, "params">
    queryOptions?: any
}

const useInfiniteMany = <TResponse>({
    resource,
    urlSearchParams,
    options,
    queryOptions,
    axiosOptions
}: ApiInfiniteManyResourceOptions) => {

    // state

    const { $axios: axios } = useNuxtApp();

    const limit = options?.pagination?.limit ?? 10;

    // methods

    const handleInfiniteMany = async ({ limit, offset }: any) => {
        const { data } = await axios.get<ApiPaginated<TResponse>>(`${resource}/`, {
            params: {
                ...urlSearchParams?.value,
                limit: limit,
                offset: offset
            },
            ...axiosOptions
        });

        return data;
    };

    return useInfiniteQuery({
        queryKey: [resource, urlSearchParams ?? {}],
        queryFn: ({ pageParam }) => handleInfiniteMany(pageParam),
        initialPageParam: {
            limit,
            offset: 0
        },
        getNextPageParam: (lastPage, pages) => {
            const page = pages.length + 1;

            const nextPageParams = {
                offset: page * limit - limit,
                limit
            };

            return lastPage?.next ? nextPageParams : undefined;
        }
    });
};

export default useInfiniteMany;
