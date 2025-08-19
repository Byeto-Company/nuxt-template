// imports

import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiManyResourceOptions<TResponse> = {
    customResource?: {
        name: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">>;
<<<<<<< HEAD:layers/api-layer/composables/useMany.ts
    handleError?: boolean;
    authorization?: boolean;
=======
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useMany.ts
};

const useMany = <TResponse>({
    customResource,
    urlSearchParams,
    queryOptions,
    axiosOptions,
<<<<<<< HEAD:layers/api-layer/composables/useMany.ts
    axiosInstance,
    handleError,
    authorization,
=======
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useMany.ts
}: ApiManyResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleMany = async () => {
        const { data } = await axios.get<TResponse[]>(`${customResource?.path}`, {
            params: {
                ...urlSearchParams?.value,
            },
            ...axiosOptions,
            authorization,
        });

        return data;
    };

<<<<<<< HEAD:layers/api-layer/composables/useMany.ts
    return useQuery<TResponse[], ApiError>({
        queryKey: [customResource?.name, urlSearchParams],
        queryFn: () => handleMany(),
        meta: { handleError: handleError },
=======
    return useQuery({
        queryKey: [customResource ? customResource.name : resource, urlSearchParams ?? {}],
        queryFn: () => handleMany(),
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useMany.ts
        ...queryOptions,
    });
};

export default useMany;
