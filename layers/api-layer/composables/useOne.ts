// imports

import { type UseQueryOptions, useQuery } from "@tanstack/vue-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

// types

export type ApiOneResourceOptions<TResponse> = {
    id?: Ref<string | number> | ComputedRef<string | number>;
    resource?: ApiResources;
    customResource?: {
        name: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosInstance?: AxiosInstance;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">>;
    handleError?: boolean;
    authorization?: boolean;
};

const useOne = <TResponse>({
    resource,
    customResource,
    urlSearchParams,
    id,
    queryOptions,
    axiosOptions,
    axiosInstance,
    handleError,
    authorization,
}: ApiOneResourceOptions<TResponse>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();

    const axios = axiosInstance ?? globalAxiosInstance;

    // methods

    const handleOne = async () => {
        const { data } = await axios.get<TResponse>(
            `${customResource ? customResource.path : resource}${id ? "/" + id.value : ""}`,
            {
                params: { ...urlSearchParams?.value },
                ...axiosOptions,
                authorization,
            }
        );

        return data;
    };

    return useQuery<TResponse, ApiError>({
        queryKey: [customResource ? customResource.name : resource, id, urlSearchParams ?? {}],
        queryFn: () => handleOne(),
        meta: { handleError: handleError },
        ...queryOptions,
    });
};

export default useOne;
