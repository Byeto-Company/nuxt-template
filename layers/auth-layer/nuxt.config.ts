export default defineNuxtConfig({
    appAuth: {
        internalPage: true,
        otpCount: 4,
        otpTimer: 60,
        pagePath: "/signin",
    },
});
