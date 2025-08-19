export default defineNuxtConfig({
    icon: {
        cssLayer: "base",
        // customCollections: [
        //     {
        //         prefix: "ci",
        //         dir: "layers/icons-layer/public/icons",
        //     },
        // ],
        iconifyApiEndpoint: "https://icon-server.time4reserve.ir/",
        // fallbackToApi : false
    },
    modules: ["@nuxt/icon"],
});
