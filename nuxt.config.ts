// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    ssr: false,
    css: ["~/assets/css/tailwind.css"],

    sitemap: {
        enabled: false,
    },

    postcss: {
        plugins: {
            "@tailwindcss/postcss": {},
            autoprefixer: {},
        },
    },

    components: [
        {
            path: "~/components",
            pathPrefix: false,
        },
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

    assetsGenerator: {
        assets: ["../../public/img", "../../public/video"],
        output: "../../constants/assets.ts",
    },

    appAuth: {
        // pagePath : null
    },

    ui: {
        colorMode: false,
        theme: {
            colors: ["primary", "secondary", "info", "success", "warning", "error"],
        },
    },

    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL || "https://api.alavihospital.ir",
            DEBUG: process.env.DEBUG,
        },
    },
});
