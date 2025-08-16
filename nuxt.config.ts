export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    ssr: true,

    typescript: {
        typeCheck: false,
    },

    extends: [
        "./layers/pwa-layer",
        "./layers/utils-layer",
        "./layers/api-layer",
        "./layers/nuxt-ui-layer",
        "./layers/i18n-layer",
        "./layers/auth-layer",
        "./layers/assets-generator-layer",
        "./layers/icons-layer",
    ],

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
            API_BASE_URL: process.env.API_BASE_URL,
            DEBUG: process.env.DEBUG,
        },
    },
});
