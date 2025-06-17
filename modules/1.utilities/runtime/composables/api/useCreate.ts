// imports

import { type MutateOptions, useMutation, type UseMutationOptions } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiCreateResourceOptions<TResponse> = {
    resource?: ApiResources;
    customResource?: {
        name?: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    mutationOptions?: Partial<Omit<UseMutationOptions<TResponse>, "queryKey" | "queryFn">>;
    options?: {
        contentType?: "json" | "form";
    };
};

const useCreate = <TResponse, TRequest>({
    resource,
    urlSearchParams,
    axiosOptions,
    mutationOptions,
    customResource,
    options = { contentType: "json" },
}: ApiCreateResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleCreate = async (variables: TRequest) => {
        const { data } = await axios.post<TResponse>(`${customResource ? customResource.path : resource}`, variables, {
            params: { ...urlSearchParams?.value },
            ...axiosOptions,
            headers: {
                "Content-Type": options.contentType === "form" ? "multipart/form-data" : "application/json",
                ...axiosOptions?.headers,
            },
        });

        return data;
    };

    return useMutation({
        mutationKey: customResource?.name ? [customResource.name] : undefined,
        mutationFn: (variables: TRequest) => handleCreate(variables),
        ...mutationOptions,
    });
};

export default useCreate;
