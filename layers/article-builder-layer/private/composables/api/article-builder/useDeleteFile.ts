// imports

import { useMutation } from "@tanstack/vue-query";
import { API_ENDPOINTS } from "~/constants/api-endpoints";
import useCustomAxios from "../../useCustomAxios";

// types

export type DeleteFileRequest = {
    id: number;
};

// composable

const useDeleteFile = () => {
    const axios = useCustomAxios();

    const handleDeleteFile = async ({ id }: DeleteFileRequest) => {
        const { data } = await axios.delete(`${API_ENDPOINTS.article.delete_file}/${id}`);

        return data;
    };

    return useMutation({
        mutationFn: (data: DeleteFileRequest) => handleDeleteFile(data),
    });
};

export default useDeleteFile;
