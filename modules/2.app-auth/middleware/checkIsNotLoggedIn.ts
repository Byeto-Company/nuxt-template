export default defineNuxtRouteMiddleware(() => {
    const { token } = useAuth();
    const localePath = useLocalePath();

<<<<<<< HEAD:layers/auth-layer/middleware/checkIsNotLoggedIn.ts
    if (!!token.value) {
        return navigateTo(localePath("/"));
=======
    if (!token.value) {
        return;
    } else {
        return navigateTo("/");
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/2.app-auth/middleware/checkIsNotLoggedIn.ts
    }
});