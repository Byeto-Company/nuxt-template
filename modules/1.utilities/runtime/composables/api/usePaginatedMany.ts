// imports

import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiPaginatedManyResourceOptions<TResponse> = {
    customResource?: {
        name: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    options?: MaybeRefOrGetter<{
        pagination?: {
            page?: number;
            limit?: number;
            initialOffset?: number;
        };
<<<<<<< HEAD:layers/api-layer/composables/usePaginatedMany.ts
    }>;
    axiosInstance?: AxiosInstance;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">>;
    handleError?: boolean;
    authorization?: boolean;
=======
    };
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">>;
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/usePaginatedMany.ts
};

const usePaginatedMany = <TResponse>({
    customResource,
    urlSearchParams,
    options,
    queryOptions,
    axiosOptions,
<<<<<<< HEAD:layers/api-layer/composables/usePaginatedMany.ts
    axiosInstance,
    handleError,
    authorization,
}: ApiPaginatedManyResourceOptions<TResponse>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();
    const axios = axiosInstance ?? globalAxiosInstance;
=======
}: ApiPaginatedManyResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/usePaginatedMany.ts

    const pageParam = useRouteQuery("page", "1", { transform: Number });
    const limitParam = useRouteQuery("limit", "10", { transform: Number });
    const offsetParam = useRouteQuery("offset", undefined, {
        transform: (value) => (value ? Number(value) : undefined),
    });

    const optionsObject = computed(() => toValue(options));

    const limit = computed(() => optionsObject.value?.pagination?.limit ?? limitParam.value);
    const page = computed(() => optionsObject.value?.pagination?.initialOffset ?? pageParam.value);
    const initialOffset = computed(() => optionsObject.value?.pagination?.initialOffset ?? offsetParam.value);

    // methods

    const handleMany = async () => {
        const { data } = await axios.get<ApiPaginated<TResponse>>(`${customResource?.path}`, {
            params: {
                ...urlSearchParams?.value,
                limit: limit.value,
                offset: initialOffset.value ?? page.value * limit.value - limit.value,
            },
            ...axiosOptions,
            authorization,
        });

        return data;
    };

<<<<<<< HEAD:layers/api-layer/composables/usePaginatedMany.ts
    return useQuery<ApiPaginated<TResponse>, ApiError>({
        queryKey: [customResource?.name, urlSearchParams, page],
        queryFn: () => handleMany(),
        meta: { handleError: handleError },
=======
    return useQuery({
        queryKey: [customResource ? customResource.name : resource, urlSearchParams ?? {}, page],
        queryFn: () => handleMany(),
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/usePaginatedMany.ts
        ...queryOptions,
    });
};

export default usePaginatedMany;
