const useAppStoreServices = () => {
    const appStore = useAppStore();

    return {
        store: appStore,
    };
};

export default useAppStoreServices;
