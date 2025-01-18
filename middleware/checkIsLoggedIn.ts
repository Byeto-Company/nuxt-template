import { useAuth } from "~/composables/api/auth/useAuth";

export default defineNuxtRouteMiddleware(() => {
    const { token, logout } = useAuth();

    if (!!token.value) {
        return;
    } else {
        return navigateTo("/signin");
    }
});
