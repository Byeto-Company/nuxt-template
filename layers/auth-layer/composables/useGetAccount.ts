// imports

import { useQuery } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";
import { QUERY_KEYS } from "~/constants/query-keys";
import useAuth from "./useAuth";

// types

export type GetAccountResponse = {
    phone: string;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    profile_photo: string | null;
    gender: "male" | "female";
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

    // computed

    const isEnabled = computed(() => {
        return !!token.value;
    });

    return useQuery({
        enabled: isEnabled,
        queryKey: [QUERY_KEYS.user],
        queryFn: () => handleGetAccount(),
        select: (data) => {
            return {
                ...data,
                first_name: data.first_name?.length === 0 ? null : data.first_name,
                last_name: data.last_name?.length === 0 ? null : data.last_name,
            };
        },
    });
};

export default useGetAccount;
