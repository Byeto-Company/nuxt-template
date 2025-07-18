// imports

import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

// types

export type ApiPaginatedManyResourceOptions<TResponse> = {
    resource?: ApiResources;
    customResource?: {
        name: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    page: ComputedRef<number> | Ref<number>;
    options?: {
        pagination?: {
            limit?: number;
            initialOffset?: number;
        };
    };
    axiosInstance?: AxiosInstance;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">>;
    handleError?: boolean;
    authorization?: boolean;
};

const usePaginatedMany = <TResponse>({
    resource,
    customResource,
    urlSearchParams,
    page,
    options,
    queryOptions,
    axiosOptions,
    axiosInstance,
    handleError,
    authorization,
}: ApiPaginatedManyResourceOptions<TResponse>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();

    const axios = axiosInstance ?? globalAxiosInstance;

    const limit = options?.pagination?.limit ?? 10;
    const initialOffset = options?.pagination?.initialOffset ?? 0;

    // methods

    const handleMany = async () => {
        const { data } = await axios.get<ApiPaginated<TResponse>>(
            `${customResource ? customResource.path : resource}`,
            {
                params: {
                    ...urlSearchParams?.value,
                    limit: limit,
                    offset: initialOffset ?? page.value * limit - limit,
                },
                ...axiosOptions,
                authorization,
            }
        );

        return data;
    };

    return useQuery<ApiPaginated<TResponse>, ApiError>({
        queryKey: [customResource ? customResource.name : resource, urlSearchParams ?? {}, page],
        queryFn: () => handleMany(),
        meta: { handleError: handleError },
        ...queryOptions,
    });
};

export default usePaginatedMany;
