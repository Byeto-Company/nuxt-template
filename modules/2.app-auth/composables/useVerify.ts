// imports

import { useMutation } from "@tanstack/vue-query";

// types

export type VerifyRequest = {
    token: string,
};

const useVerify = () => {

    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleVerify = async (variables: VerifyRequest) => {
        const { data } = await axios.post("/accounts/verify", variables);
        return data;
    };

    return useMutation({
        mutationFn: (variables: VerifyRequest) => handleVerify(variables)
    });
};

export default useVerify;
