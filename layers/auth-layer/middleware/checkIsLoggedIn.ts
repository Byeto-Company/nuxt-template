export default defineNuxtRouteMiddleware(() => {
    const runtimeConfig = useRuntimeConfig();
    const pagePath = runtimeConfig.public.appAuth.pagePath;

    const { token } = useAuth();

    if (!token.value) {
        return navigateTo(pagePath);
    }
});
