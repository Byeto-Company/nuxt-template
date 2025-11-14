export default defineNuxtConfig({
    modules: ["@vite-pwa/nuxt"],

    pwa: {
        // strategies: "injectManifest",
        // srcDir: "public",
        // filename: "sw.js",
        // registerType: process.env.NODE_ENV === "production" ? "autoUpdate" : "prompt",
        manifest: {
            name: "Nuxt App",
            short_name: "Nuxt App",
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
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
                    href: "/apple-splash-portrait-light-1125x2436.png",
                },
                // iPhone – light, landscape
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
                    href: "/apple-splash-landscape-light-2436x1125.png",
                },
                // iPhone – dark, portrait
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
                    href: "/apple-splash-portrait-dark-1125x2436.png",
                },
                // iPhone – dark, landscape
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
                    href: "/apple-splash-landscape-dark-2436x1125.png",
                },
                // iPhone (750×1334 px) – light, portrait
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
                    href: "/apple-splash-portrait-light-750x1334.png",
                },
                // iPhone – light, landscape
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
                    href: "/apple-splash-landscape-light-1334x750.png",
                },
                // iPhone – dark, portrait
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
                    href: "/apple-splash-portrait-dark-750x1334.png",
                },
                // iPhone – dark, landscape
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
                    href: "/apple-splash-landscape-dark-1334x750.png",
                },
                // iPhone (1242×2208 px) – light, portrait
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
                    href: "/apple-splash-portrait-light-1242x2208.png",
                },
                // iPhone – light, landscape
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
                    href: "/apple-splash-landscape-light-2208x1242.png",
                },
                // iPhone – dark, portrait
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
                    href: "/apple-splash-portrait-dark-1242x2208.png",
                },
                // iPhone – dark, landscape
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
                    href: "/apple-splash-landscape-dark-2208x1242.png",
                },
                // iPad (1536×2048 px) – light, portrait
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
                    href: "/apple-splash-portrait-light-1536x2048.png",
                },
                // iPad – light, landscape
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
                    href: "/apple-splash-landscape-light-2048x1536.png",
                },
                // iPad – dark, portrait
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
                    href: "/apple-splash-portrait-dark-1536x2048.png",
                },
                // iPad – dark, landscape
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
                    href: "/apple-splash-landscape-dark-2048x1536.png",
                },
                // iPad Pro 12.9" (2048×2732 px) – light, portrait
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
                    href: "/apple-splash-portrait-light-2048x2732.png",
                },
                // iPad Pro 12.9" – light, landscape
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
                    href: "/apple-splash-landscape-light-2732x2048.png",
                },
                // iPad Pro 12.9" – dark, portrait
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
                    href: "/apple-splash-portrait-dark-2048x2732.png",
                },
                // iPad Pro 12.9" – dark, landscape
                {
                    rel: "apple-touch-startup-image",
                    media: "screen and (prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
                    href: "/apple-splash-landscape-dark-2732x2048.png",
                },
            ],
        },
    },
});
