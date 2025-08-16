export default defineNuxtPlugin({
    dependsOn: ["axios"],
    setup: () => {
        const { $axios: axios, $i18n } = useNuxtApp();

        axios.interceptors.request.use((config) => {
            // @ts-ignore
            config.headers["Accept-Language"] = $i18n?.locale.value;

            return config;
        });
    },
});
