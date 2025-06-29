// imports

import { useMutation } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";

// types

export type UploadFileRequest = {
    file: File;
};

export type UploadFileResponse = {
    id: number;
    file_link: string;
    date: string;
    size: number;
    name: string;
};

// composable

const useUploadFile = () => {
    // state

    const { $axios: axios } = useNuxtApp();

    // methods

    const handleUploadFile = async ({ file }: UploadFileRequest) => {
        const payload = {
            file,
        };

        const { data } = await axios.post<UploadFileResponse>(API_ENDPOINTS.artilce.upload, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    };

    return useMutation({
        mutationFn: (data: UploadFileRequest) => handleUploadFile({ file: data.file }),
    });
};

export default useUploadFile;
