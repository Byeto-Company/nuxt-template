import { createResolver, defineNuxtModule } from "@nuxt/kit";
import { defu } from "defu";

type ModuleOptions = {
    theme: "sport" | "classic" | "default";
};

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: "ui-module",
        configKey: "uiModule",
    },

    async setup(moduleOptions, nuxt) {
        const resolver = createResolver(import.meta.url);

        nuxt.options.runtimeConfig.public.uiModule = defu(nuxt.options.runtimeConfig.public.uiModule, {
            theme: moduleOptions.theme,
        });

        const themeLayerPath = `../themes/${moduleOptions.theme ?? "default"}`;

        nuxt.options._layers.push({
            cwd: resolver.resolve(themeLayerPath),
            config: {
                rootDir: resolver.resolve(themeLayerPath),
                srcDir: resolver.resolve(themeLayerPath),
            },
            configFile: resolver.resolve(`${themeLayerPath}/nuxt.config.ts`),
        });
    },
});
