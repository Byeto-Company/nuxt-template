// imports

import { useMutation } from "@tanstack/vue-query";

// types

export type OtpRequest = {
    phone: string;
};

const useOtp = () => {

    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleOtp = async (variables: OtpRequest) => {
        const { data } = await axios.post("/accounts/send_otp", variables);
        return data;
    };

    return useMutation({
        mutationFn: (variables: OtpRequest) => handleOtp(variables)
    });
};

export default useOtp;
