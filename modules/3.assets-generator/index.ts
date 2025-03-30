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

        const assetFolders = moduleOptions.assets.map((assetFolder: string) => {
            return path.join(__dirname, assetFolder);
        });
        const output = path.join(__dirname, moduleOptions.output);

        const watcher = chokidar.watch(assetFolders, { ignored: /^\./, persistent: false, ignoreInitial: true });
        const logger = useLogger("assets-generator");

        const generate = () => {
            const assetsMap: Record<any, any> = {};

            assetFolders.forEach((assetFolder: string) => {
                const extractFilePaths = (directory: string) => {

                    const files = fs.readdirSync(directory);
                    const relativeDirectoryPath = "/" + path.relative("public", directory);

                    files.forEach(async (file) => {
                        if (!file.startsWith(".")) {
                            if (file.includes(".")) {
                                const key = path.basename(file, path.extname(file)).toUpperCase().replaceAll("-", "_");
                                const assetFolderKey = path.basename(assetFolder).toUpperCase();

                                if (!Object.hasOwn(assetsMap, assetFolderKey)) {
                                    assetsMap[assetFolderKey] = {};
                                }

                                if (Object.hasOwn(assetsMap[assetFolderKey], key)) {
                                    logger.error(`Assets conflicted. => ${relativeDirectoryPath}/${file}`);
                                    await watcher.close();
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

        watcher.on("all", function(path) {
            generate();
        });

        nuxt.hook("close", async nuxt => {
            await watcher.close();
        });
    }
});