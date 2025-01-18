import { useAuth } from "~/composables/api/auth/useAuth";

export default defineNuxtRouteMiddleware(() => {

    const { token } = useAuth();

    if (!token.value) {
        return;
    } else {
        return navigateTo("/");
    }
});