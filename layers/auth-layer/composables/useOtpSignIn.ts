// imports

import { useMutation } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";

// types

export type OtpSignInRequest = {
    otp: string;
    phone: string;
};

export type OtpSignInResponse = {
    access: string;
    refresh: string;
};

const useOtpSignIn = () => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleOtpSignIn = async (variables: OtpSignInRequest) => {
        const { data } = await axios.post<OtpSignInResponse>(API_ENDPOINTS.user.signin, variables);
        return data;
    };

    return useMutation({
        mutationFn: (variables: OtpSignInRequest) => handleOtpSignIn(variables)
    });
};

export default useOtpSignIn;
