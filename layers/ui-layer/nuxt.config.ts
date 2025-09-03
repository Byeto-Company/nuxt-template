import { fileURLToPath } from "url";
import { dirname, join } from "path";
import tailwindcss from "@tailwindcss/vite";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
    css: [join(currentDir, "./assets/css/main-tailwind.css"), join(currentDir, "./assets/css/vue-animations.css")],

    vite: {
        plugins: [tailwindcss()],
    },

    uiModule: {
        theme: "sport",
    },

    modules: ["@nuxt/ui", "@nuxt/fonts"],
});
