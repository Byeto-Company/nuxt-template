import { createResolver, defineNuxtModule, extendPages, useLogger } from "@nuxt/kit";
import path from "path";
import fs from "fs/promises";
import { exec, spawn } from "child_process";
import util from "util";

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

        // Read packages from root directory

        const currentProjectPackagesList = [];

        const packageJsonContent = await fs.readFile(path.join(nuxt.options.rootDir, "package.json"), "utf-8");
        const parsedPackageJsonContent = JSON.parse(packageJsonContent);

        for (const dependency of Object.keys(parsedPackageJsonContent.dependencies)) {
            currentProjectPackagesList.push(dependency);
        }

        // Read packages from each layer

        const packagesList = new Set<string>();

        for (const layer of nuxt.options._layers) {
            const parentFolderPath = path.dirname(layer.config.rootDir);
            const parentFolderName = path.basename(parentFolderPath);

            if (parentFolderName === ".c12") {
                const packageJsonPath = path.join(layer.config.rootDir, "package.json");
                const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8");
                const parsedPackageJsonContent = JSON.parse(packageJsonContent);

                for (const dependency of Object.keys(parsedPackageJsonContent.dependencies)) {
                    packagesList.add(dependency);
                    console.log(`${layer.config.rootDir} - ${dependency}`);
                }
            }
        }

        const packagesToInstall: string[] = [];

        const arrayOfLayersPackages = Array.from(packagesList);

        for (const dependency of arrayOfLayersPackages) {
            if (currentProjectPackagesList.includes(dependency)) {
                console.log(`${dependency} is installed.`);
            } else {
                packagesToInstall.push(dependency);
                console.log(`${dependency} should install!`);
            }
        }

        const installPackages = () => {
            return new Promise((resolve, reject) => {
                const spawnProcess = spawn(`bun`, ["add", ...packagesToInstall, "--ignore-scripts"], {
                    stdio: "inherit",
                    shell: true,
                });

                spawnProcess.on("error", (err) => {
                    reject(err);
                });

                spawnProcess.on("close", (code) => {
                    if (code === 0) {
                        resolve("ok"); // success
                    } else {
                        reject(new Error(`Command failed with exit code ${code}`));
                    }
                });
            });
        };

        if (packagesToInstall.length > 0) {
            await installPackages();
        } else {
            logger.box("All dependencies are installed");
        }
    },
});
