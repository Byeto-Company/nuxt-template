import { fileURLToPath } from "url";
import { dirname, join } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
    fonts: {
        families: [
            // {
            //     name: "Peyda",
            //     provider: "local",
            // },
        ],
    },
});
