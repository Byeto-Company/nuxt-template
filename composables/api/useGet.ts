// imports

import { useQuery } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";
import { QUERY_KEYS } from "~/constants/query-keys";

// types

export type GetResponse = {
    name: string;
};

// state

const { $axios: axios } = useNuxtApp();

// methods

export const handleGet = async (id: string | number) => {
    const { data } = await axios.get<GetResponse>(`${API_ENDPOINTS.test}/${id}`);
    return data;
};

// composable

const useGet = (id: ComputedRef<string | number>) => {
    return useQuery({
        queryKey: [QUERY_KEYS.test, id],
        queryFn: () => handleGet(id.value)
    });
};

export default useGet;
