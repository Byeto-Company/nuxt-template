// imports

import { useQuery } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";
import { QUERY_KEYS } from "~/constants/query-keys";
import useCustomAxios from "../../useCustomAxios";

// types

export type GetTokenRequest = {
    otp: string;
};

export type GetTokenResponse = {
    refresh: string;
    access: string;
};

// composable

const useGetToken = () => {
    // state

    const axios = useCustomAxios();

    const route = useRoute();

    const otp = computed(() => route.query["otp"]);

    const handleGetToken = async () => {
        const { data } = await axios.post<GetTokenResponse>(API_ENDPOINTS.article.signin, {
            otp: otp.value,
        });

        return data;
    };

    return useQuery({
        queryKey: [QUERY_KEYS.user],
        queryFn: () => handleGetToken(),
        enabled: !!otp.value,
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};

export default useGetToken;
