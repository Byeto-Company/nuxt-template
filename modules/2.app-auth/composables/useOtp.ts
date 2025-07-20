// imports

import { useMutation } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";

// types

export type OtpRequest = {
    phone: string;
};

const useOtp = () => {

    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleOtp = async (variables: OtpRequest) => {
        const { data } = await axios.post(API_ENDPOINTS.user.otp, variables);
        return data;
    };

    return useMutation({
        mutationFn: (variables: OtpRequest) => handleOtp(variables)
    });
};

export default useOtp;
