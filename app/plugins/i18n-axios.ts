export default defineNuxtPlugin({
    dependsOn: ["axios"],
    setup: () => {
        const { $i18n } = useNuxtApp();

        updateAppConfig({
            appApi: {
                extendHeaders: (headers) => {
                    headers["Accept-Language"] = $i18n?.locale.value === "fa_ir" ? "fa" : $i18n?.locale.value;
                    return headers;
                },
            },
        });
    },
});
