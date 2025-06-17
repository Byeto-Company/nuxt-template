// imports

import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

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
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">>;
};

const usePaginatedMany = <TResponse>({
    resource,
    customResource,
    urlSearchParams,
    page,
    options,
    queryOptions,
    axiosOptions,
}: ApiPaginatedManyResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();

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
                    offset: page.value * limit - limit,
                },
                ...axiosOptions,
            }
        );

        return data;
    };

    return useQuery({
        queryKey: [customResource ? customResource.name : resource, urlSearchParams ?? {}, page],
        queryFn: () => handleMany(),
        ...queryOptions,
    });
};

export default usePaginatedMany;
