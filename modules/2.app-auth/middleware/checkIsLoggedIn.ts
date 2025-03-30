export default defineNuxtRouteMiddleware(() => {
    const { token, logout } = useAuth();

    const runtimeConfig = useRuntimeConfig()
    const moduleConfig = runtimeConfig.public.appAuth

    console.log(moduleConfig);

    if (!!token.value) {
        return;
    } else {
        return navigateTo("/signin");
    }
});
