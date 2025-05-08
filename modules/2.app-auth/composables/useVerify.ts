// imports

import { useMutation } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";

// types

export type VerifyRequest = {
    token: string,
};

const useVerify = () => {

    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleVerify = async (variables: VerifyRequest) => {
        const { data } = await axios.post(API_ENDPOINTS.user.verify, variables);
        return data;
    };

    return useMutation({
        mutationFn: (variables: VerifyRequest) => handleVerify(variables)
    });
};

export default useVerify;
