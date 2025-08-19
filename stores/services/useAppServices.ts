const useAppServices = () => {
    const useAppStore = useAppStore();

    return {
        store: appStore
    };
};

export default useAppServices;
