// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    ssr: true,

    typescript: {
        typeCheck: false,
    },

    components: [
        {
            path: "~/components",
            pathPrefix: false,
        },
    ],

    extends: [
        "./layers/pwa-layer",
        "./layers/utils-layer",
        "./layers/api-layer",
        "./layers/nuxt-ui-layer",
        "./layers/auth-layer",
        "./layers/assets-generator-layer",
        "./layers/icons-layer",
        "./layers/article-builder-layer",
    ],

    modules: [
        "@nuxt/icon",
        "@vueuse/nuxt",
        "@formkit/auto-animate/nuxt",
        "@pinia/nuxt",
        "@nuxt/ui",
        "motion-v/nuxt",
        "@nuxtjs/seo",
    ],

    sitemap: {
        enabled: false,
    },

    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL,
            DEBUG: process.env.DEBUG,
        },
    },
});
