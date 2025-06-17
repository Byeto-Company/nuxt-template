import { defineNuxtModule, createResolver, addImportsDir } from "@nuxt/kit";

export default defineNuxtModule({
    meta: {
        name: "utilities",
        configKey: "utilities",
    },
    defaults: {},
    async setup(_options, _nuxt) {
        const resolver = createResolver(import.meta.url);

        addImportsDir(resolver.resolve("runtime/composables"));
        addImportsDir(resolver.resolve("runtime/composables/api"));
    },
});
