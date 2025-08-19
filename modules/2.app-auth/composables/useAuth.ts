const useAuth = () => {
    // state

    const token = useCookie("token");
    const refreshToken = useCookie("refresh-token");

    // methods

    const updateToken = (newToken: string) => {
        token.value = newToken;
    };

    const updateRefreshToken = (newToken: string) => {
        refreshToken.value = newToken;
    };

    const logout = (reload?: boolean) => {
        token.value = undefined;
        refreshToken.value = undefined;
        if (reload) window.location.reload();
    };

    // computed

    const isLoggedIn = computed(() => !!token.value);

    return {
        token,
        refreshToken,
        updateRefreshToken,
        updateToken,
        logout,
        isLoggedIn,
    };
};

export default useAuth;