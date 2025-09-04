export default defineNuxtConfig({
    modules: ["@nuxtjs/i18n"],

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
            // {
            //     name: "Germany",
            //     verbose_name: "Germany",
            //     code: "de",
            //     language: "de",
            //     dir: "ltr",
            //     file: "de.json",
            //     icon: "circle-flags:de",
            // },
            // {
            //     name: "English",
            //     verbose_name: "English",
            //     code: "en",
            //     language: "en",
            //     dir: "ltr",
            //     file: "en.json",
            //     icon: "circle-flags:us",
            // },
            // {
            //     name: "Arabic",
            //     verbose_name: "العربية",
            //     code: "ar",
            //     language: "ar",
            //     dir: "rtl",
            //     file: "ar.json",
            //     icon: "circle-flags:ae",
            // },
        ],
    },
});
