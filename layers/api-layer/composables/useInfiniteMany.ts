// imports

import { useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/vue-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

// types

export type ApiInfiniteManyResourceOptions<TResponse> = {
    resource: ApiResources;
    urlSearchParams?: ComputedRef<Record<any, any>>;
    options?: {
        pagination?: {
            limit?: number;
        };
    };
    axiosInstance?: AxiosInstance;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseInfiniteQueryOptions<TResponse>, "queryKey" | "queryFn">>;
    handleError?: boolean;
    authorization?: boolean;
};

const useInfiniteMany = <TResponse>({
    resource,
    urlSearchParams,
    options,
    queryOptions,
    axiosOptions,
    axiosInstance,
    handleError,
    authorization,
}: ApiInfiniteManyResourceOptions<TResponse>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();

    const axios = axiosInstance ?? globalAxiosInstance;

    const limit = options?.pagination?.limit ?? 10;

    // methods

    const handleInfiniteMany = async ({ limit, offset }: any) => {
        const { data } = await axios.get<ApiPaginated<TResponse>>(`${resource}/`, {
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

    return useInfiniteQuery<ApiPaginated<TResponse>, ApiError>({
        queryKey: [resource, urlSearchParams ?? {}],
        queryFn: ({ pageParam }) => handleInfiniteMany(pageParam),
        initialPageParam: {
            limit,
            offset: 0,
        },
        getNextPageParam: (lastPage, pages) => {
            const page = pages.length + 1;

            const nextPageParams = {
                offset: page * limit - limit,
                limit,
            };

            return lastPage?.next ? nextPageParams : undefined;
        },
        meta: { handleError: handleError },

        ...queryOptions,
    });
};

export default useInfiniteMany;
