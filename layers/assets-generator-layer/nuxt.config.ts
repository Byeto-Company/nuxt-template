export default defineNuxtConfig({
    assetsGenerator: {
        assets: ["public/img", "public/video"],
        output: "constants/assets.ts",
    },
});
