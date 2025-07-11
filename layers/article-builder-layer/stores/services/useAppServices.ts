import { useAppStore } from "..";

const useAppServices = () => {
    const appStore = useAppStore();

    // methods

    const clearTokens = () => {
        appStore.setToken("");
        appStore.setRefreshToken("");
    };

    return {
        store: appStore,
        clearTokens,
    };
};

export default useAppServices;
