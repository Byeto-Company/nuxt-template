export default defineNuxtConfig({
    i18n: {
        // strategy: "prefix",
        // detectBrowserLanguage: false,
        defaultLocale: "fa_ir",
        locales: [
            {
                name: "Farsi",
                verbose_name: "فارسی",
                code: "fa_ir",
                language: "fa_ir",
                dir: "rtl",
                file: "fa.json",
                icon: "circle-flags:ir",
            },
        ],
    },
});
