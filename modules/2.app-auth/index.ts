import {
    addImportsDir,
    addRouteMiddleware,
    createResolver,
    defineNuxtModule,
    extendPages
} from "@nuxt/kit";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineNuxtModule({
    meta: {
        name: "app-auth",
        configKey: "appAuth"
    },

    defaults: {},

    async setup(moduleOptions, nuxt) {
        const resolver = createResolver(import.meta.url);

        addImportsDir(path.resolve(__dirname, "./composables"));

        if (moduleOptions.pagePath !== null) {
            extendPages((pages) => {
                pages.unshift({
                    name: "signin",
                    path: moduleOptions.pagePath ?? "/signin",
                    file: path.resolve(__dirname, "./templates/signin.vue")
                });
            });
        }

        addRouteMiddleware({
            name: "check-is-logged-in",
            path: path.resolve(__dirname, "./middleware/checkIsLoggedIn.ts"),
            global: false
        }, { prepend: false });

        addRouteMiddleware({
            name: "check-is-not-logged-in",
            path: path.resolve(__dirname, "./middleware/checkIsNotLoggedIn.ts"),
            global: false
        }, { prepend: false });
    }
});