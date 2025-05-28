import type { AxiosError } from "axios";

export default defineNuxtRouteMiddleware(async () => {
    const { mutateAsync: refreshAuth } = useRefreshAuth();
    const { token, refreshToken, updateToken, updateRefreshToken, logout } = useAuth();
    const { mutateAsync: verify } = useVerify();

    // lifecycle

    if (!!token.value) {
        // 1.1 - token is there

        try {
            await verify({
                token: token.value,
            });

            return;

            // 2.1 - token is valid, finish
        } catch (e) {
            const err = e as AxiosError;

            if (err?.status && err.status >= 400) {
                // 2.2 - token is there, but not valid, try to refresh token

                if (!!refreshToken.value) {
                    // 3.1 - refresh token is there, try to refresh

                    try {
                        const refreshResponse = await refreshAuth({
                            refresh: refreshToken.value,
                        });

                        // 4.1 - token is refreshed successfully, finish

                        updateToken(refreshResponse.access);
                        updateRefreshToken(refreshResponse.refresh);

                        return;
                    } catch (e) {
                        const err = e as AxiosError;

                        if (err?.status && err.status >= 400) {
                            // 4.2 - cant refreshing token, logout

                            return logout();
                        }

                        return;
                    }
                } else {
                    // 3.2 - refresh token is not exist, logout

                    return logout();
                }
            }

            return;
        }
    } else {
        // 1.2 - token is not exist, try refresh token    logout
        if (!!refreshToken.value) {
            try {
                const refreshResponse = await refreshAuth({
                    refresh: refreshToken.value,
                });

                updateToken(refreshResponse.access);
                updateRefreshToken(refreshResponse.refresh);

                return;
            } catch (e) {
                const err = e as AxiosError;

                if (err?.status && err.status >= 400) {
                    return logout();
                }

                return;
            }
        } else {
            return logout();
        }
    }
});
