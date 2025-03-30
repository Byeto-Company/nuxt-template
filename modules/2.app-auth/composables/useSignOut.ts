// imports

import { useMutation } from "@tanstack/vue-query";

// types

export type SignOutRequest = {
    refresh_token: string;
};

const useSignOut = () => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleSignOut = async (params: SignOutRequest) => {
        const { data } = await axios.post("/accounts/logout", params);
        return data;
    };

    return useMutation({
        mutationFn: (params: SignOutRequest) => handleSignOut(params)
    });
};

export default useSignOut;
