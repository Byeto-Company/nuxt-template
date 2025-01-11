// imports

import { useMutation } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";

// types

export type PostRequest = {
    name: string,
};

// state

const { $axios: axios } = useNuxtApp();

// methods

export const handlePost = async (variables: PostRequest) => {
    const { data } = await axios.post(
        `${API_ENDPOINTS.test}/`,
        variables,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
    return data;
};

// composable

const usePost = () => {
    return useMutation({
        mutationFn: (variables: PostRequest) => handlePost(variables)
    });
};

export default usePost();
