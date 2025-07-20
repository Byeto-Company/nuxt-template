// imports

import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiManyResourceOptions<TResponse> = {
    resource?: ApiResources;
    customResource?: {
        name: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">>;
};

const useMany = <TResponse>({
    resource,
    customResource,
    urlSearchParams,
    queryOptions,
    axiosOptions,
}: ApiManyResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleMany = async () => {
        const { data } = await axios.get<TResponse[]>(`${customResource ? customResource.path : resource}`, {
            params: {
                ...urlSearchParams?.value,
            },
            ...axiosOptions,
        });

        return data;
    };

    return useQuery({
        queryKey: [customResource ? customResource.name : resource, urlSearchParams ?? {}],
        queryFn: () => handleMany(),
        ...queryOptions,
    });
};

export default useMany;
