export const useAppStore = defineStore("app", () => {
    const token = ref("");
    const refreshToken = ref("");

    const setToken = (value: string) => {
        token.value = value;
    };
    const setRefreshToken = (value: string) => {
        refreshToken.value = value;
    };

    return { token, refreshToken, setToken, setRefreshToken };
});
