// imports

import { type MutateOptions, useMutation, type UseMutationOptions } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

// types

export type ApiUpdateResourceOptions<TResponse> = {
    customResource?: {
        name?: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    mutationOptions?: Partial<Omit<UseMutationOptions<TResponse>, "queryKey" | "queryFn">>;
<<<<<<< HEAD:layers/api-layer/composables/useUpdate.ts
    contentType?: "form" | "json";
    handleError?: boolean;
    authorization?: boolean;
=======
    options?: {
        contentType?: "json" | "form";
    };
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useUpdate.ts
};

const useUpdate = <TResponse, TRequest>({
    urlSearchParams,
    axiosOptions,
    mutationOptions,
    customResource,
<<<<<<< HEAD:layers/api-layer/composables/useUpdate.ts
    contentType = "json",
    handleError,
    authorization,
=======
    options = { contentType: "json" },
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useUpdate.ts
}: ApiUpdateResourceOptions<TResponse>) => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleUpdate = async (variables: TRequest, id: number | string) => {
        const { data } = await axios.patch<TResponse>(
<<<<<<< HEAD:layers/api-layer/composables/useUpdate.ts
            `${customResource?.path}/${variables.id}`,
            { ...variables, id: undefined },
=======
            `${customResource ? customResource.path : resource}/${id}`,
            variables,
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useUpdate.ts
            {
                params: { ...urlSearchParams?.value },
                ...axiosOptions,
                headers: {
                    "Content-Type": options.contentType === "form" ? "multipart/form-data" : "application/json",
                    ...axiosOptions?.headers,
                },
                authorization,
            }
        );

        return data;
    };

    return useMutation({
        mutationKey: customResource?.name ? [customResource.name] : undefined,
<<<<<<< HEAD:layers/api-layer/composables/useUpdate.ts
        mutationFn: (variables) => handleUpdate(variables),
        meta: { handleError: handleError },
=======
        mutationFn: ({ id, variables }: { id: number | string; variables: TRequest }) => handleUpdate(variables, id),
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/1.utilities/runtime/composables/api/useUpdate.ts
        ...mutationOptions,
    });
};

export default useUpdate;
