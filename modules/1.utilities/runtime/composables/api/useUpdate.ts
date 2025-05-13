// imports

import { type MutateOptions, useMutation } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiUpdateResourceOptions = {
    id: string | number,
    resource: ApiResources
    urlSearchParams?: ComputedRef<Record<any, any>>,
    axiosOptions?: Omit<AxiosRequestConfig, "params">
    mutationOptions?: any
}

const useUpdate = <TResponse, TRequest>({
    id, resource, urlSearchParams, axiosOptions, mutationOptions
}: ApiUpdateResourceOptions) => {

    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleUpdate = async (variables: TRequest) => {
        const { data } = await axios.patch<TResponse>(`${resource}/${id}`, variables, {
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
        mutationFn: (variables: TRequest) => handleUpdate(variables)
    });
};

export default useUpdate;
