// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    ssr: true,
    css: ["~/assets/css/tailwind.css"],

    app: {
        head: {},
    },

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

    // icon: {
    //     mode: "svg",
    //     customCollections: [
    //         {
    //             prefix: "ci",
    //             dir: "./public/icons",
    //         },
    //     ],
    // },

    modules: [
      "@nuxt/icon",
      "@vueuse/nuxt",
      "@formkit/auto-animate/nuxt",
      "@pinia/nuxt",
      // [
      //     "@nuxtjs/google-fonts",
      //     {
      //         families: {
      //             "DM Sans": "100..900",
      //             Inter: "100..900",
      //             download: true,
      //             inject: false,
      //         },
      //     },
      // ]
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

    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL,
            DEBUG: process.env.DEBUG,
        },
    },
});
