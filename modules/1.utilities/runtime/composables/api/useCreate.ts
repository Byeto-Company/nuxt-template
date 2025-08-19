// imports

import { type MutateOptions, useMutation, type UseMutationOptions } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiCreateResourceOptions<TResponse> = {
    customResource?: {
        name?: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    mutationOptions?: Partial<Omit<UseMutationOptions<TResponse>, "queryKey" | "queryFn">>;
<<<<<<< HEAD:layers/api-layer/composables/useCreate.ts
    contentType?: "json" | "form";
    handleError?: boolean;
    authorization?: boolean;
=======
    options?: {
        contentType?: "json" | "form";
    };
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useCreate.ts
};

const useCreate = <TResponse, TRequest>({
    urlSearchParams,
    axiosOptions,
    mutationOptions,
    customResource,
<<<<<<< HEAD:layers/api-layer/composables/useCreate.ts
    axiosInstance,
    contentType = "json",
    handleError,
    authorization,
=======
    options = { contentType: "json" },
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useCreate.ts
}: ApiCreateResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleCreate = async (variables: TRequest) => {
        const { data } = await axios.post<TResponse>(`${customResource?.path}`, variables, {
            params: { ...urlSearchParams?.value },
            ...axiosOptions,
            headers: {
                "Content-Type": options.contentType === "form" ? "multipart/form-data" : "application/json",
                ...axiosOptions?.headers,
            },
            authorization,
        });

        return data;
    };

    return useMutation({
        mutationKey: customResource?.name ? [customResource.name] : undefined,
<<<<<<< HEAD:layers/api-layer/composables/useCreate.ts
        mutationFn: (variables) => handleCreate(variables),
        meta: { handleError: handleError },
=======
        mutationFn: (variables: TRequest) => handleCreate(variables),
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useCreate.ts
        ...mutationOptions,
    });
};

export default useCreate;
