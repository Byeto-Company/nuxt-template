// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    ssr: true,
    css: ["~/assets/css/tailwind.css"],

    postcss: {
        plugins: {
            "@tailwindcss/postcss": {},
            autoprefixer: {}
        }
    },

    components: [
        {
            path: "~/components",
            pathPrefix: false
        }
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
        "@nuxt/ui"
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
    ],

    assetsGenerator: {
        assets: ["../public/img", "../public/video"],
        output: "../constants/assets.ts"
    },

    ui: {
        theme: {
            colors: ["primary", "secondary", "info", "success", "warning", "error", "custom"]
        }
    },

    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL,
            DEBUG: process.env.DEBUG
        }
    }
});
