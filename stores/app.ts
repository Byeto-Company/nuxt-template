export const useAppStore = defineStore("app", () => {
    const test = ref(false);

    const setTest = (value: boolean) => {
        test.value = value;
    };

    return { setTest, test };
});
