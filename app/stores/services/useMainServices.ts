export const useMainServices = () => {
    const mainStore = useMainStore();

    return {
        store: mainStore,
    };
};