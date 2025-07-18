import type { DehydratedState, VueQueryPluginOptions } from "@tanstack/vue-query";
import { VueQueryPlugin, QueryClient, hydrate, dehydrate, QueryCache, MutationCache } from "@tanstack/vue-query";

import { defineNuxtPlugin, useState } from "#imports";
import { AxiosError } from "axios";

export default defineNuxtPlugin({
    enforce: "pre",
    setup: (nuxt) => {
        const toast = useToast();
        const vueQueryState = useState<DehydratedState | null>("vue-query");

        const queryClient = new QueryClient({
            defaultOptions: { queries: { staleTime: 5000 } },
            queryCache: new QueryCache({
                onError: (error, query) => {
                    if (import.meta.client && error instanceof AxiosError && query.meta?.handleError) {
                        toast.add({
                            color: "error",
                            title: "مشکلی پیش آمده",
                            description: JSON.stringify(error.response?.data),
                            icon: "ci:circle-exclamation",
                        });
                    }
                },
            }),
            mutationCache: new MutationCache({
                onError: (error, _variables, _context, mutation) => {
                    if (import.meta.client && error instanceof AxiosError && mutation.meta?.handleError) {
                        toast.add({
                            color: "error",
                            title: "مشکلی پیش آمده",
                            description: JSON.stringify(error.response?.data),
                            icon: "ci:circle-exclamation",
                        });
                    }
                },
            }),
        });
        const options: VueQueryPluginOptions = { queryClient };

        nuxt.vueApp.use(VueQueryPlugin, options);

        if (import.meta.server) {
            nuxt.hooks.hook("app:rendered", () => {
                vueQueryState.value = dehydrate(queryClient);
            });
        }

        if (import.meta.client) {
            hydrate(queryClient, vueQueryState.value);
        }

        return {
            provide: {
                queryClient,
            },
        };
    },
});
