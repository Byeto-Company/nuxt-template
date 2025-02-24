// imports

import { type MutateOptions, useMutation } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiDeleteResourceOptions = {
    id: string | number,
    resource: ApiResources
    urlSearchParams?: ComputedRef<Record<any, any>>,
    axiosOptions?: AxiosRequestConfig,
    mutationOptions?: MutateOptions<any, any, any>
}

const useDelete = <TResponse>({
                                  id, resource, urlSearchParams, axiosOptions, mutationOptions
                              }: ApiDeleteResourceOptions) => {

    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleDelete = async () => {
        const { data } = await axios.delete<TResponse>(`${resource}/${id}`, {
            params: { ...urlSearchParams?.value },
            ...axiosOptions
        });

        return data;
    };

    return useMutation({
        mutationFn: () => handleDelete(),
        ...mutationOptions
    });
};

export default useDelete;
