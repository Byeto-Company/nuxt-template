// imports

import { useMutation } from "@tanstack/vue-query";

// types

export type SignInRequest = {
    otp: string;
    phone: string;
};

export type SignInResponse = {
    access: string;
    refresh: string;
};

const useSignIn = () => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleSignIn = async (variables: SignInRequest) => {
        const { data } = await axios.post<SignInResponse>("/token", variables);
        return data;
    };

    return useMutation({
        mutationFn: (variables: SignInRequest) => handleSignIn(variables)
    });
};

export default useSignIn;
