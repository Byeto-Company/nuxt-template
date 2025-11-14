import {
    defineConfig,
    minimal2023Preset as preset,
    combinePresetAndAppleSplashScreens
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
    preset: combinePresetAndAppleSplashScreens(preset, {
        resizeOptions: { background: "white", fit: "contain" },
        darkResizeOptions: { background: "black" },
        padding: 0.6
    }, ["iPhone XS", "iPhone SE 4.7\"", "iPhone 7 Plus", "iPad Air 9.7\"", "iPad Pro 12.9\""]),
    images: ["layers/pwa-layer/public/logo.png"]
});
