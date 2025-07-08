// imports

import { type MutateOptions, useMutation, type UseMutationOptions } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiUpdateResourceOptions<TResponse> = {
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

const useUpdate = <TResponse, TRequest>({
    resource,
    urlSearchParams,
    axiosOptions,
    mutationOptions,
    customResource,
    options = { contentType: "json" },
}: ApiUpdateResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleUpdate = async (variables: TRequest, id: number | string) => {
        const { data } = await axios.patch<TResponse>(
            `${customResource ? customResource.path : resource}/${id}`,
            variables,
            {
                params: { ...urlSearchParams?.value },
                ...axiosOptions,
                headers: {
                    "Content-Type": options.contentType === "form" ? "multipart/form-data" : "application/json",
                    ...axiosOptions?.headers,
                },
            }
        );

        return data;
    };

    return useMutation({
        mutationKey: customResource?.name ? [customResource.name] : undefined,
        mutationFn: ({ id, variables }: { id: number | string; variables: TRequest }) => handleUpdate(variables, id),
        ...mutationOptions,
    });
};

export default useUpdate;
