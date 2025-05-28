// imports

import { type UseQueryOptions, useQuery } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiOneResourceOptions<TResponse> = {
    id: string | number;
    resource?: ApiResources;
    customResource?: {
        name: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">>;
};

const useOne = <TResponse>({
    resource,
    customResource,
    urlSearchParams,
    id,
    queryOptions,
    axiosOptions,
}: ApiOneResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleOne = async () => {
        const { data } = await axios.get<TResponse>(`${customResource ? customResource.path : resource}/${id}`, {
            params: { ...urlSearchParams?.value },
            ...axiosOptions,
        });

        return data;
    };

    return useQuery({
        queryKey: [customResource ? customResource.name : resource, id, urlSearchParams ?? {}],
        queryFn: () => handleOne(),
        ...queryOptions,
    });
};

export default useOne;
