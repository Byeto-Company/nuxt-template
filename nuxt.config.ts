export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    ssr: true,

    extends: [
        "github:Byeto-Company/nuxt-utils-layer",
        "github:Byeto-Company/nuxt-api-layer",
        "github:Byeto-Company/nuxt-auth-layer",
    ],

    assetsGenerator: {
        assets: ["public/img", "public/video"],
        output: "app/constants/assets.ts",
    },

    appAuth: {
        internalPage: true,
        pagePath: "/signinn",
    },

    image: {
        quality: 85,
        domains: [],
    },

    modules: [
        "@vueuse/nuxt",
        "@formkit/auto-animate/nuxt",
        "motion-v/nuxt",
        "@pinia/nuxt",
        "@nuxt/image",
        "@nuxtjs/i18n",
        "@nuxtjs/seo",
        "@vite-pwa/nuxt",
    ],

    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL || "https://api.alavihospital.ir",
            DEBUG: process.env.DEBUG,
        },
    },
});
