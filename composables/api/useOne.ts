// imports

import { type QueryOptions, useQuery } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiOneResourceOptions = {
    id: string | number,
    resource: ApiResources
    urlSearchParams?: ComputedRef<Record<any, any>>,
    axiosOptions?: Omit<AxiosRequestConfig, "params">
    queryOptions?: any
}

const useOne = <T>({ resource, urlSearchParams, id, queryOptions, axiosOptions }: ApiOneResourceOptions) => {

    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleOne = async () => {
        const { data } = await axios.get<T>(`${resource}/${id}`, {
            params: { ...urlSearchParams?.value },
            ...axiosOptions
        });

        return data;
    };

    return useQuery({
        queryKey: [resource, id, urlSearchParams ?? {}],
        queryFn: () => handleOne()
    });
};

export default useOne;
