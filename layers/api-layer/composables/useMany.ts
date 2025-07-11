// imports

import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

// types

export type ApiManyResourceOptions<TResponse> = {
    resource?: ApiResources;
    customResource?: {
        name: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosInstance?: AxiosInstance;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">>;
    showError?: boolean;
};

const useMany = <TResponse>({
    resource,
    customResource,
    urlSearchParams,
    queryOptions,
    axiosOptions,
    axiosInstance,
    showError,
}: ApiManyResourceOptions<TResponse>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();

    const axios = axiosInstance ?? globalAxiosInstance;

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

    return useQuery<TResponse[], ApiError>({
        queryKey: [customResource ? customResource.name : resource, urlSearchParams ?? {}],
        queryFn: () => handleMany(),
        meta: { showError: showError },
        ...queryOptions,
    });
};

export default useMany;
