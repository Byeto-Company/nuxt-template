// imports

import { API_ENDPOINTS } from "~/constants/api-endpoints";
<<<<<<< HEAD:layers/auth-layer/composables/useGetAccount.ts
import useAuth from "./useAuth";

// types

export type GetAccountResponse = AccountProfile;
=======
import { QUERY_KEYS } from "~/constants/query-keys";

// types

export type GetAccountResponse = {
    phone: string;
    email: string | null;
    full_name: string;
    profile_photo: string | null;
};
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/2.app-auth/composables/useGetAccount.ts

const useGetAccount = () => {
    // state

    const { token } = useAuth();

<<<<<<< HEAD:layers/auth-layer/composables/useGetAccount.ts
    // computed

    const isEnabled = computed(() => {
        return !!token.value;
    });

    // methods

    return useOne<GetAccountResponse>({
        customResource: {
            name: API_ENDPOINTS.user.profile.key,
            path: API_ENDPOINTS.user.profile.path,
        },
        authorization: true,
        queryOptions: {
            enabled: isEnabled,
            select: (data: GetAccountResponse) => {
                return {
                    ...data,
                    first_name: data.first_name?.length === 0 ? null : data.first_name,
                    last_name: data.last_name?.length === 0 ? null : data.last_name,
                };
            },
        },
=======
    // methods

    const handleGetAccount = async () => {
        const { data } = await axios.get<GetAccountResponse>(API_ENDPOINTS.user.profile);
        return data;
    };

    return useQuery({
        enabled: !!token.value,
        queryKey: [QUERY_KEYS.user],
        queryFn: () => handleGetAccount(),
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/2.app-auth/composables/useGetAccount.ts
    });
};

export default useGetAccount;
