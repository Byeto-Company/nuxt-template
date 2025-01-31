<script lang="ts" setup>

// import

import { useAuth } from "~/composables/api/auth/useAuth";
import useRefreshAuth from "~/composables/api/auth/useRefreshAuth";
import useVerify from "~/composables/api/auth/useVerify";

// state

const { mutateAsync: refreshAuth } = useRefreshAuth();
const { token, refreshToken, updateToken, updateRefreshToken, logout } = useAuth();
const { mutateAsync: verify } = useVerify();

// lifecycle

onServerPrefetch(async () => {
    if (!!token.value) {

        // 1.1 - token is there

        try {

            await verify({
                token: token.value
            });

            // 2.1 - token is valid, finish

        } catch (e) {

            // 2.2 - token is there, but not valid, try to refresh token

            if (!!refreshToken.value) {

                // 3.1 - refresh token is there, try to refresh

                try {
                    const refreshResponse = await refreshAuth({ refresh: refreshToken.value });

                    // 4.1 - token is refreshed successfully, finish

                    updateToken(refreshResponse.access);
                    updateRefreshToken(refreshResponse.refresh);
                } catch (e) {

                    // 4.2 - cant refreshing token, logout

                    logout();
                }
            } else {

                // 3.2 - refresh token is not exist, logout

                logout();
            }
        }
    } else {

        // 1.2 - token is not exist, logout

        logout();
    }
});

</script>

<template>
    <div class="persian-number font-iran-yekan-x">

        <LoadingIndicator />

        <Header />
        <main>
            <slot />
        </main>
        <Footer />
    </div>
</template>
