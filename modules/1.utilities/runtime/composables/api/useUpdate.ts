// imports

import { type MutateOptions, useMutation, type UseMutationOptions } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiUpdateResourceOptions<TResponse> = {
    id: string | number;
    resource?: ApiResources;
    customResource?: {
        name?: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    mutationOptions?: Partial<Omit<UseMutationOptions<TResponse>, "queryKey" | "queryFn">>;
    contentType?: "form" | "json";
};

const useUpdate = <TResponse, TRequest>({
    id,
    resource,
    urlSearchParams,
    axiosOptions,
    mutationOptions,
    customResource,
    contentType = "json",
}: ApiUpdateResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleUpdate = async (variables: TRequest) => {
        const { data } = await axios.patch<TResponse>(
            `${customResource ? customResource.path : resource}/${id}`,
            variables,
            {
                params: { ...urlSearchParams?.value },
                ...axiosOptions,
                headers: {
                    "Content-Type": contentType === "form" ? "multipart/form-data" : "application/json",
                    ...axiosOptions?.headers,
                },
            }
        );

        return data;
    };

    return useMutation({
        mutationKey: customResource?.name ? [customResource.name] : undefined,
        mutationFn: (variables: TRequest) => handleUpdate(variables),
        ...mutationOptions,
    });
};

export default useUpdate;
