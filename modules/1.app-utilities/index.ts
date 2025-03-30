import { addImportsDir, defineNuxtModule } from "@nuxt/kit";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineNuxtModule({
    meta: {
        name: "app-utilities",
        configKey: "app-utilities"
    },

    setup(moduleOptions, nuxt) {
        addImportsDir(path.resolve(__dirname, "./composables"));
    }
});