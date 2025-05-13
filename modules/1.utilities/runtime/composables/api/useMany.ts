// imports

import { type QueryOptions, useQuery } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiManyResourceOptions = {
    resource?: ApiResources;
    customResource?: {
        name: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    page?: ComputedRef<number> | Ref<number>;
    options?: {
        pagination?: {
            limit?: number;
            initialOffset?: number;
        };
    };
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: any;
};

const useMany = <TResponse>({
    resource,
    customResource,
    urlSearchParams,
    page,
    options,
    queryOptions,
    axiosOptions,
}: ApiManyResourceOptions) => {
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
                    offset: page?.value ? page.value * limit - limit : initialOffset,
                },
                ...axiosOptions,
            }
        );

        return data;
    };

    return useQuery({
        queryKey: [customResource ? customResource.name : resource, urlSearchParams ?? {}, page ?? 1],
        queryFn: () => handleMany(),
    });
};

export default useMany;
