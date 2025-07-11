// imports

import { API_ENDPOINTS } from "~/constants/api-endpoints";
import useCustomAxios from "../../useCustomAxios";

// composable

const useDeleteSection = () => {
    const axios = useCustomAxios();

    return useDelete({
        axiosInstance: axios,
        customResource: {
            path: API_ENDPOINTS.article.delete_section,
        },
    });
};

export default useDeleteSection;
