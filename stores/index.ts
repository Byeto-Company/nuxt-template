import { useStorage } from "@vueuse/core";

export const useAppStore = defineStore("app", () => {
    const token = useStorage("token", "", sessionStorage);
    const refreshToken = useStorage("refresh-token", "", sessionStorage);

    const setToken = (value: string) => {
        token.value = value;
    };
    const setRefreshToken = (value: string) => {
        refreshToken.value = value;
    };

    return { token, refreshToken, setToken, setRefreshToken };
});
