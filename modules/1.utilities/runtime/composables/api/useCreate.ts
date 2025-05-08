// imports

import { type MutateOptions, useMutation } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiCreateResourceOptions = {
    resource: ApiResources
    urlSearchParams?: ComputedRef<Record<any, any>>,
    axiosOptions?: Omit<AxiosRequestConfig, "params">
    mutationOptions?: any
}

const useCreate = <TResponse, TRequest>({
    resource, urlSearchParams, axiosOptions, mutationOptions
}: ApiCreateResourceOptions) => {

    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleCreate = async (variables: TRequest) => {
        const { data } = await axios.post<TResponse>(`${resource}/`, variables, {
            params: { ...urlSearchParams?.value },
            ...axiosOptions,
            headers: {
                "Content-Type": "multipart/form-data",
                ...axiosOptions?.headers
            }
        });

        return data;
    };

    return useMutation({
        mutationFn: (variables: TRequest) => handleCreate(variables)
    });
};

export default useCreate;
