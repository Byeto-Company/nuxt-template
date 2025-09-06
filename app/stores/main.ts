export const useMainStore = defineStore("main", () => {
    const test = ref("");

    const setTest = (value: string) => {
        test.value = value;
    };

    return { test,setTest };
});
