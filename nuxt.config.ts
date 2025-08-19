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

<<<<<<< HEAD
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

=======
    components: [
        {
            path: "~/components",
            pathPrefix: false,
        },
    ],

>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366
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

<<<<<<< HEAD
=======
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

>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL || "https://api.alavihospital.ir",
            DEBUG: process.env.DEBUG,
        },
    },
});
