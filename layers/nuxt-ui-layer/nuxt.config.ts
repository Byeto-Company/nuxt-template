import { fileURLToPath } from "url";
import { dirname, join } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({    
    css: [join(currentDir, "./assets/css/tailwind.css")],

    postcss: {
        plugins: {
            "@tailwindcss/postcss": {},
            autoprefixer: {},
        },
    },

    ui: {
        colorMode: false,
        theme: {
            colors: ["primary", "secondary", "info", "success", "warning", "error"],
        },
    },

    modules: ["@nuxt/ui"],
});
