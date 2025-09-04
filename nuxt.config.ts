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

    uiModule: {
        theme: "default",
    },

    image: {
        quality: 85,
        domains: [],
    },

    typescript: {
        includeWorkspace: true
    },

    modules: [
        "@vueuse/nuxt",
        "@formkit/auto-animate/nuxt",
        "motion-v/nuxt",
        "@pinia/nuxt",
        "@nuxt/image",
        "@nuxtjs/seo",
    ],

    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL || "https://api.alavihospital.ir",
            DEBUG: process.env.DEBUG,
        },
    },
});
