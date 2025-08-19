// imports

import { type UseQueryOptions, useQuery } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiOneResourceOptions<TResponse> = {
<<<<<<< HEAD:layers/api-layer/composables/useOne.ts
    id?: MaybeRef<string | number>;
=======
    id: Ref<string | number> | ComputedRef<string | number>;
    resource?: ApiResources;
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useOne.ts
    customResource?: {
        name: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">>;
<<<<<<< HEAD:layers/api-layer/composables/useOne.ts
    handleError?: boolean;
    authorization?: boolean;
=======
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useOne.ts
};

const useOne = <TResponse>({
    customResource,
    urlSearchParams,
    id,
    queryOptions,
    axiosOptions,
<<<<<<< HEAD:layers/api-layer/composables/useOne.ts
    axiosInstance,
    handleError,
    authorization,
=======
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useOne.ts
}: ApiOneResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleOne = async () => {
<<<<<<< HEAD:layers/api-layer/composables/useOne.ts
        const { data } = await axios.get<TResponse>(`${customResource?.path}${id ? "/" + unref(id) : ""}`, {
            params: { ...urlSearchParams?.value },
            ...axiosOptions,
            authorization,
=======
        const { data } = await axios.get<TResponse>(`${customResource ? customResource.path : resource}/${id.value}`, {
            params: { ...urlSearchParams?.value },
            ...axiosOptions,
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useOne.ts
        });

        return data;
    };

<<<<<<< HEAD:layers/api-layer/composables/useOne.ts
    return useQuery<TResponse, ApiError>({
        queryKey: [customResource?.name, id, urlSearchParams],
        queryFn: () => handleOne(),
        meta: { handleError: handleError },
=======
    return useQuery({
        queryKey: [customResource ? customResource.name : resource, id, urlSearchParams ?? {}],
        queryFn: () => handleOne(),
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useOne.ts
        ...queryOptions,
    });
};

export default useOne;
