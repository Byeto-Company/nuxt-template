export default defineNuxtConfig({
    modules: ["@vite-pwa/nuxt"],

    app: {
        head: {
            meta: [
                {
                    name: "mobile-web-app-capable",
                    content: "yes",
                },
            ],
            link: [
                {
                    rel: "icon",
                    href: "/favicon.ico",
                    sizes: "any",
                },
                {
                    rel: "apple-touch-icon",
                    href: "/apple-touch-icon-180x180.png",
                },
            ],
        },
    },
    pwa: {
        // strategies: "injectManifest",
        // srcDir: "public",
        // filename: "sw.js",
        // registerType: process.env.NODE_ENV === "production" ? "autoUpdate" : "prompt",
        manifest: {
            name: "Unique",
            short_name: "Unique",
            theme_color: "#000000",
            icons: [
                {
                    src: "pwa-64x64.png",
                    sizes: "64x64",
                    type: "image/png",
                },
                {
                    src: "pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    src: "pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                },
                {
                    src: "maskable-icon-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable",
                },
            ],
        },
        workbox: {
            navigateFallback: "/",
            clientsClaim: true,
            skipWaiting: true,
        },
        devOptions: {
            enabled: process.env.NODE_ENV === "production",
            type: "module",
        },
    },
});
