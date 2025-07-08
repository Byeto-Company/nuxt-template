// imports

import { type MutateOptions, useMutation, type UseMutationOptions } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiDeleteResourceOptions<TResponse> = {
    resource?: ApiResources;
    customResource?: {
        name?: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosOptions?: AxiosRequestConfig;
    mutationOptions?: Partial<Omit<UseMutationOptions<TResponse>, "queryKey" | "queryFn">>;
};

const useDelete = <TResponse>({
    resource,
    urlSearchParams,
    axiosOptions,
    mutationOptions,
    customResource,
}: ApiDeleteResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleDelete = async (id: number | string) => {
        const { data } = await axios.delete<TResponse>(`${customResource ? customResource.path : resource}/${id}`, {
            params: { ...urlSearchParams?.value },
            ...axiosOptions,
        });

        return data;
    };

    return useMutation({
        mutationKey: customResource?.name ? [customResource.name] : undefined,
        mutationFn: ({ id }: { id: number | string }) => handleDelete(id),
        ...mutationOptions,
    });
};

export default useDelete;
