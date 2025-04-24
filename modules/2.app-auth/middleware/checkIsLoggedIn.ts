export default defineNuxtRouteMiddleware(() => {
    const { token } = useAuth();

    if (!!token.value) {
        return;
    } else {
        return navigateTo("/signin");
    }
});
