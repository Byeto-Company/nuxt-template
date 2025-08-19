import { defineNuxtModule, useLogger } from "@nuxt/kit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chokidar from "chokidar";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineNuxtModule({
    meta: {
        name: "assets-generator",
        configKey: "assetsGenerator"
    },

    defaults: {
        // assets: ["../public/img", "../public/video"],
        // output: "../constants/assets.ts"
    },

    setup(moduleOptions, nuxt) {
<<<<<<< HEAD:layers/assets-generator-layer/modules/assets-generator/index.ts
=======

        const assetFolders = moduleOptions.assets.map((assetFolder: string) => {
            return path.join(__dirname, assetFolder);
        });
        const output = path.join(__dirname, moduleOptions.output);

        const watcher = chokidar.watch(assetFolders, { ignored: /^\./, persistent: false, ignoreInitial: true });
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/3.assets-generator/index.ts
        const logger = useLogger("assets-generator");

        // resolve relative paths to project root
        const assetsList = Array.from(new Set([...moduleOptions.assets]));

        const assetFolders = assetsList.map((assetFolder: string) => path.resolve(nuxt.options.rootDir, assetFolder));

        const output = path.resolve(nuxt.options.rootDir, moduleOptions.output);

        const watcher = chokidar.watch(assetFolders, {
            ignored: /^\./,
            persistent: false,
            ignoreInitial: true,
        });

        const generate = () => {
            const assetsMap: Record<any, any> = {};

            assetFolders.forEach((assetFolder: string) => {
                const extractFilePaths = (directory: string) => {

                    const files = fs.readdirSync(directory);
                    const relativeDirectoryPath = "/" + path.relative("public", directory);

                    files.forEach((file) => {
                        if (!file.startsWith(".")) {
                            if (file.includes(".")) {
                                const key = path.basename(file, path.extname(file)).toUpperCase().replaceAll("-", "_");
                                const assetFolderKey = path.basename(assetFolder).toUpperCase();

                                if (!Object.hasOwn(assetsMap, assetFolderKey)) {
                                    assetsMap[assetFolderKey] = {};
                                }

                                if (Object.hasOwn(assetsMap[assetFolderKey], key)) {
                                    logger.error(`Assets conflicted. => ${relativeDirectoryPath}/${file}`);
                                    watcher.close();
                                    process.exit(0);
                                } else {
                                    assetsMap[assetFolderKey][key] = `${relativeDirectoryPath}/${file}`;
                                }
                            } else {
                                extractFilePaths(`${directory}/${file}`);
                            }
                        }
                    });

                };

                extractFilePaths(assetFolder);
            });

            let assetsFileTemplate = "export const ASSETS = {";

            for (const folderKey of Object.keys(assetsMap)) {
                assetsFileTemplate += ` ${folderKey} : { `;

                for (const fileKey of Object.keys(assetsMap[folderKey])) {
                    assetsFileTemplate += ` ${fileKey} : '${assetsMap[folderKey][fileKey]}',`;
                }

                assetsFileTemplate += `},`;
            }

            assetsFileTemplate += "}";

            fs.writeFileSync(output, assetsFileTemplate);

            logger.box("Assets generated successfully.");
        };

        generate();

<<<<<<< HEAD:layers/assets-generator-layer/modules/assets-generator/index.ts
        watcher.on("all", () => {
            generate();
        });

        nuxt.hook("close", async () => {
=======
        watcher.on("all", function(path) {
            generate();
        });

        nuxt.hook("close", async nuxt => {
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366:modules/3.assets-generator/index.ts
            await watcher.close();
        });
    }
});