// imports

import { useQuery } from "@tanstack/vue-query";
import { useAuth } from "~/composables/api/auth/useAuth";
import {API_ENDPOINTS} from "~/constants/api-endpoints";
import {QUERY_KEYS} from "~/constants/query-keys";

// types

export type GetAccountResponse = any;

const useGetAccount = () => {

    // state

    const { $axios: axios } = useNuxtApp();
    const { token } = useAuth();

    // methods

    const handleGetAccount = async () => {
        const { data } = await axios.get<GetAccountResponse>(`${API_ENDPOINTS.account.profile}`);
        return data;
    };

    return useQuery({
        enabled: !!token.value,
        queryKey: [QUERY_KEYS.account],
        queryFn: () => handleGetAccount()
    });
};

export default useGetAccount;
