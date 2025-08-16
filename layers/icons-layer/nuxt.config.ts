export default defineNuxtConfig({
    icon: {
        cssLayer: "base",
        iconifyApiEndpoint: "https://icon-server.time4reserve.ir/",
        fallbackToApi: true,
    },
    modules: ["@nuxt/icon"],
});
