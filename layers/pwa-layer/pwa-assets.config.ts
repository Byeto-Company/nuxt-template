import { defineConfig, minimal2023Preset as preset } from "@vite-pwa/assets-generator/config";

export default defineConfig({
    preset,
    images: ["layers/pwa-layer/public/logo.png"],
});
