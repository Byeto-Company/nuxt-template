import { createResolver, defineNuxtModule, extendPages, useLogger } from "@nuxt/kit";
import path from "path";
import fs from "fs/promises";
// import { defu } from "defu";
// import { addCustomTab } from "@nuxt/devtools-kit";

type ModuleOptions = {};

export default defineNuxtModule<ModuleOptions>({
    meta: {
        // name: "nuxt-template-module",
        // configKey: "authModule",
    },

    // defaults: {
    // },

    async setup(moduleOptions, nuxt) {
        const resolver = createResolver(import.meta.url);
        const logger = useLogger("nuxt-template-module");

        // const themeLayerPath = `../themes/${moduleOptions.theme ?? "default"}`;

        // nuxt.options._layers.push({
        //     cwd: resolver.resolve(themeLayerPath),
        //     config: {
        //         rootDir: resolver.resolve(themeLayerPath),
        //         srcDir: resolver.resolve(themeLayerPath),
        //     },
        //     configFile: resolver.resolve(`${themeLayerPath}/nuxt.config.ts`),
        // });

        const packagesList = new Set();

        for (const layer of nuxt.options._layers) {
            const parentFolderPath = path.dirname(layer.config.rootDir);
            const parentFolderName = path.basename(parentFolderPath);

            if (parentFolderName === ".c12") {
                const packageJsonPath = path.join(layer.config.rootDir, "package.json");
                const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8");
                const parsedPackageJsonContent = JSON.parse(packageJsonContent);

                Object.keys(parsedPackageJsonContent.dependencies).forEach((key) => {
                    console.log(key);
                    packagesList.add(key);
                });
            }
        }
        
        // testLayer?.config.rootDir;
    },
});
