// imports

import { API_ENDPOINTS } from "~/constants/api-endpoints";

// types

export type DeleteFileRequest = {
    id: number;
};

// composable

const useDeleteSection = () => {
    return useDelete({
        customResource: {
            path: API_ENDPOINTS.article.delete_section,
        },
    });
};

export default useDeleteSection;
