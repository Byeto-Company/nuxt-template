// imports

import { useMutation } from "@tanstack/vue-query";

// types

export type RefreshAuthRequest = {
    refresh: string;
};

export type RefreshAuthResponse = {
    access: string;
    refresh: string;
};

const useRefreshAuth = () => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleRefreshAuth = async (variables: RefreshAuthRequest) => {
        const { data } = await axios.post<RefreshAuthResponse>("/token/refresh", variables);
        return data;
    };

    return useMutation({
        mutationFn: (variables: RefreshAuthRequest) =>
            handleRefreshAuth(variables)
    });
};

export default useRefreshAuth;
