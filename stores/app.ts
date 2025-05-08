export const useAppStore = defineStore("app", () => {
    const test = ref(false);

    const toggleTest = (value: boolean) => {
        test.value = value;
    };
    
    return { toggleTest, test };
});
