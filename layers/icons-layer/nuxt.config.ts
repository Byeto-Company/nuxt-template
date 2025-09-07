export default defineNuxtConfig({
    icon: {
        cssLayer: "base",
        // customCollections: [
        //     {
        //         prefix: "ci",
        //         dir: "layers/icons-layer/public/icons",
        //     },
        // ],
        iconifyApiEndpoint: process.env.API_ICONS_URL || "https://icon-server.time4reserve.ir/",
        // fallbackToApi : false
    },
    modules: ["@nuxt/icon"],
});
