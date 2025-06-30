// imports

import { useMutation } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";
import { ref } from "vue";

// types

export type UploadFileRequest = {
    file: File;
    onProgress?: (progress: number) => void;
};

export type UploadFileResponse = FileResponse;

// composable

const useUploadFile = () => {
    const { $axios: axios } = useNuxtApp();

    const handleUploadFile = async ({ file, onProgress }: UploadFileRequest) => {
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await axios.post<UploadFileResponse>(API_ENDPOINTS.artilce.upload, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                if (!progressEvent.total) return;
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) onProgress(progress);
            },
        });

        return data;
    };

    return useMutation({
        mutationFn: (data: UploadFileRequest) => handleUploadFile(data),
    });
};

export default useUploadFile;
