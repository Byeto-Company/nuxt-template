
const useAppServices = () => {
    const appStore = useAppStore();

    return {
        store: appStore,
    };
};

export default useAppServices;
