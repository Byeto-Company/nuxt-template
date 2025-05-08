// imports

import { useQuery } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";
import { QUERY_KEYS } from "~/constants/query-keys";

// types

export type GetAccountResponse = {
    phone: string;
    email: string | null;
    full_name: string;
    profile_photo: string | null;
};

const useGetAccount = () => {
    // state

    const { $axios: axios } = useNuxtApp();
    const { token } = useAuth();

    // methods

    const handleGetAccount = async () => {
        const { data } = await axios.get<GetAccountResponse>(API_ENDPOINTS.user.profile);
        return data;
    };

    return useQuery({
        enabled: !!token.value,
        queryKey: [QUERY_KEYS.user],
        queryFn: () => handleGetAccount(),
    });
};

export default useGetAccount;
