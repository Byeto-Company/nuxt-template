// imports

import { type MutateOptions, useMutation, type UseMutationOptions } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiDeleteResourceOptions<TResponse> = {
    id: Ref<string | number> | ComputedRef<string | number>;
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
    id,
    resource,
    urlSearchParams,
    axiosOptions,
    mutationOptions,
    customResource,
}: ApiDeleteResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleDelete = async () => {
        const { data } = await axios.delete<TResponse>(`${customResource ? customResource.path : resource}/${id.value}`, {
            params: { ...urlSearchParams?.value },
            ...axiosOptions,
        });

        return data;
    };

    return useMutation({
        mutationKey: customResource?.name ? [customResource.name] : undefined,
        mutationFn: () => handleDelete(),
        ...mutationOptions,
    });
};

export default useDelete;
