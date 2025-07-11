// imports

import { useMutation, type UseMutationOptions } from "@tanstack/vue-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

// types

export type ApiDeleteResourceOptions<TResponse> = {
    resource?: ApiResources;
    customResource?: {
        name?: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosInstance?: AxiosInstance;
    axiosOptions?: AxiosRequestConfig;
    mutationOptions?: Partial<Omit<UseMutationOptions<TResponse>, "queryKey" | "queryFn">>;
    showError?: boolean;
};

const useDelete = <TResponse, TRequest>({
    resource,
    urlSearchParams,
    axiosOptions,
    axiosInstance,
    mutationOptions,
    customResource,
    showError,
}: ApiDeleteResourceOptions<TResponse>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();

    const axios = axiosInstance ?? globalAxiosInstance;

    // methods

    const handleDelete = async (variables: TRequest & { id: number | string }) => {
        const { data } = await axios.delete<TResponse>(
            `${customResource ? customResource.path : resource}/${variables.id}`,
            {
                params: { ...urlSearchParams?.value },
                data: { ...variables, id: undefined },
                ...axiosOptions,
            }
        );

        return data;
    };

    return useMutation<TResponse, ApiError, TRequest & { id: number | string }>({
        mutationKey: customResource?.name ? [customResource.name] : undefined,
        mutationFn: (variables) => handleDelete(variables),
        meta: { showError: showError },
        ...mutationOptions,
    });
};

export default useDelete;
