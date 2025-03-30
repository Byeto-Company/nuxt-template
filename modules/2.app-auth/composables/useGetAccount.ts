// imports

import { useQuery } from "@tanstack/vue-query";

// types

export type GetAccountResponse = any;

const useGetAccount = () => {

    // state

    const { $axios: axios } = useNuxtApp();
    const { token } = useAuth();

    // methods

    const handleGetAccount = async () => {
        const { data } = await axios.get<GetAccountResponse>("/accounts/profile");
        return data;
    };

    return useQuery({
        enabled: !!token.value,
        queryKey: ["account"],
        queryFn: () => handleGetAccount()
    });
};

export default useGetAccount;
