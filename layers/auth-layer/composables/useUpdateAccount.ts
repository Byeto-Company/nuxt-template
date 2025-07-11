// imports

import { useMutation } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";

// types

export type UpdateAccountRequest = any;

export type UpdateAccountResponse = any;

const useUpdateAccount = () => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleUpdateAccount = async (variables: UpdateAccountRequest) => {
        const { data } = await axios.patch<UpdateAccountResponse>(API_ENDPOINTS.user.profile, variables, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    };

    return useMutation({
        mutationFn: (variables: UpdateAccountRequest) => handleUpdateAccount(variables),
    });
};

export default useUpdateAccount;
