export default defineNuxtConfig({
    compatibilityDate: "2025-09-04",
    devtools: {
        enabled: true,
    },
    ssr: true,

    extends: [
        "github:Byeto-Company/nuxt-utils-layer",
        "github:Byeto-Company/nuxt-api-layer",
        "github:Byeto-Company/nuxt-auth-layer",
        "github:Byeto-Company/nuxt-assets-generator-layer",
    ],

    components: [
        {
            path: "~/components",
            pathPrefix: false,
            prefix: "App",
        },
    ],

    assetsGeneratorModule: {
        assets: ["public/img", "public/video"],
        output: "app/constants/assets.ts",
    },

    authModule: {
        // Auth layer module configs
    },

    image: {
        quality: 85,
        domains: [],
    },

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

    typescript: {
        includeWorkspace: true,
    },

    modules: [
        "@vueuse/nuxt",
        "@formkit/auto-animate/nuxt",
        "motion-v/nuxt",
        "@pinia/nuxt",
        "@nuxt/image",
        "@nuxtjs/seo",
        "@nuxt/icon"
    ],

    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL || "https://api.alavihospital.ir",
            DEBUG: process.env.DEBUG,
        },
    },
});
