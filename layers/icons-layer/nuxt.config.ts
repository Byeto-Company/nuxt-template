export default defineNuxtConfig({
    icon: {
        cssLayer: "base",
        customCollections: [
            {
                prefix: "ci",
                dir: "layers/icons-layer/public/icons",
            },
        ],
    },
    modules: ["@nuxt/icon"],
});
