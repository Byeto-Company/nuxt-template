import { createResolver, defineNuxtModule, extendPages, useLogger } from "@nuxt/kit";
import path from "path";
import fs from "fs/promises";
import { exec, spawn } from "child_process";
import util from "util";
import semver from "semver";

// import { defu } from "defu";
// import { addCustomTab } from "@nuxt/devtools-kit";

type Package = {
    scope: string;
    name: string;
    version: string;
};

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
        const logger = useLogger("nuxt-template-module", {});

        // Read packages from root directory

        const currentProjectPackagesList: Package[] = [];

        const packageJsonContent = await fs.readFile(path.join(nuxt.options.rootDir, "package.json"), "utf-8");
        const parsedPackageJsonContent = JSON.parse(packageJsonContent);

        for (const dependency of Object.keys(parsedPackageJsonContent.dependencies)) {
            currentProjectPackagesList.push({
                scope: "Project",
                name: dependency,
                version: parsedPackageJsonContent.dependencies[dependency],
            });
        }

        // Read packages from each layer

        const packagesList: Package[] = [];

        for (const layer of nuxt.options._layers) {
            const parentFolderPath = path.dirname(layer.config.rootDir);
            const parentFolderName = path.basename(parentFolderPath);

            if (parentFolderName === ".c12") {
                const packageJsonPath = path.join(layer.config.rootDir, "package.json");
                const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8");
                const parsedPackageJsonContent = JSON.parse(packageJsonContent);

                for (const dependency of Object.keys(parsedPackageJsonContent.dependencies)) {
                    if (!packagesList.find((pkg) => pkg.name === dependency)) {
                        console.log(layer);
                        packagesList.push({
                            scope: "Layer",
                            name: dependency,
                            version: parsedPackageJsonContent.dependencies[dependency],
                        });
                    }
                }
            }
        }

        // Check versions and decide which packages to install

        const packagesToInstall: {
            canInstall: boolean;
            status?: "MAJOR" | "MINOR" | "PATH";
            package: Package;
        }[] = [];

        for (const dependency of packagesList) {
            // const projectDependency = currentProjectPackagesList.find((pkg) => pkg.name === dependency.name);

            // if (projectDependency) {
            // const projectVersion = semver.minVersion(projectDependency.version);
            // const layerVersion = semver.minVersion(dependency.version);

            // if (projectVersion!.major !== layerVersion!.major) {
            //     packagesToInstall.push({
            //         canInstall: false,
            //         status: "MAJOR",
            //         package: dependency,
            //     });
            // } else if (projectVersion!.minor !== layerVersion!.minor) {
            //     packagesToInstall.push({
            //         canInstall: true,
            //         status: "MINOR",
            //         package: dependency,
            //     });
            // } else if (projectVersion!.patch !== layerVersion!.patch) {
            //     packagesToInstall.push({
            //         canInstall: true,
            //         status: "PATH",
            //         package: dependency,
            //     });
            // }
            // } else {

            // }

            packagesToInstall.push({
                canInstall: true,
                package: dependency,
            });

            // if (currentProjectPackagesList.includes(dependency)) {
            //     // console.log(`${dependency} is installed.`);
            // } else {
            //     packagesToInstall.push(dependency);
            //     // console.log(`${dependency} should install!`);
            // }
        }

        const installPackages = () => {
            return new Promise((resolve, reject) => {
                const packagesListString = packagesToInstall
                    .filter((item) => item.canInstall)
                    .map((item) => item.package.name + "@" + item.package.version);

                const spawnProcess = spawn(`bun`, ["add", ...packagesListString, "--ignore-scripts"], {
                    stdio: "inherit",
                    shell: false,
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
            logger.box(
                `These packages will be installed:\n\n${packagesToInstall
                    .map(
                        (item) =>
                            `${item.package.scope} ${item.canInstall ? "✅" : "⚠️"} ${item.package.name}@${
                                item.package.version
                            }`
                    )
                    .join("\n")}`
            );

            logger.info("Installing dependencies...");

            await installPackages();

            logger.success("All dependencies are installed");
        } else {
            logger.box(
                `All layer dependencies are already installed:\n\n${packagesList
                    .map((item) => `${item.name}@${item.version}`)
                    .join("\n")}`
            );
        }
    },
});
