// imports

import { useMutation } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";

// types

export type CreateParentRequest = {
    title: string;
    related_page: string;
};

export type CreateParentResponse = {
    id: number;
    title: string;
    related_page: string;
    slug_fa: string;
};

// composable

const useCreateParent = () => {
    const { $axios: axios } = useNuxtApp();

    const handleCreateParent = async (params: CreateParentRequest) => {
        const { data } = await axios.post<CreateParentResponse>(API_ENDPOINTS.article.create_parent, {
            ...params,
        });

        return data;
    };

    return useMutation({
        mutationFn: (data: CreateParentRequest) => handleCreateParent(data),
    });
};

export default useCreateParent;
