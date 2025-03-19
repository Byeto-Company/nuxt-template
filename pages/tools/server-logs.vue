<script lang="ts" setup>

// import

import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/atom-one-dark.css";
import LogDate from "~/components/server-logs/LogDate.vue";
import { useQuery } from "@tanstack/vue-query";

// meta

definePageMeta({
    middleware : "check-is-debug",
    layout: "none"
});

// state

const { $axios: axios } = useNuxtApp();

const { data: serverLogs, isFetching, suspense } = useQuery({
    queryKey: ["server-logs"],
    queryFn: async () => {
        const response = await axios.get("http://localhost:3000/api/server-logs");
        return response.data.reverse();
    },
    refetchInterval: 5000,
    staleTime: 0
});

await suspense();

// computed

const logIcon = (status: number) => {
    if (status >= 200 && status < 300) return "bi:check-circle-fill";
    return "bi:x-circle-fill";
};

// lifecycle

onMounted(() => {
    hljs.registerLanguage("json", javascript);
    hljs.highlightAll();
});

</script>

<template>
    <div class="bg-neutral-900 w-full min-h-svh py-32">
        <div class="fixed top-10 right-1/2 translate-x-1/2 flex-center" v-if="isFetching">
            <Icon
                name="svg-spinners:180-ring-with-bg"
                class="size-12 mb-1 **:fill-neutral-500"
            />
        </div>
        <div class="w-full container flex flex-col gap-8">
            <div
                v-for="(log,index) in serverLogs"
                :key="index"
                class="border-2 p-5 rounded-xl log-item-animation"
                :class="{
                    'bg-success-950/30 border-success-800' : log.status >= 200 && log.status < 300,
                    'bg-danger-950/30 border-danger-800' : log.status >= 400 && log.status < 600,
                }"
            >
                <div class="flex items-center gap-4 mt-4">
                    <Icon
                        :name="logIcon(log.status)"
                        class="size-8 mb-1"
                        :class="{
                            '**:fill-success-500' : log.status >= 200 && log.status < 300,
                            '**:fill-danger-500' : log.status >= 400 && log.status < 600,
                        }"
                    />
                    <h3 class="text-white font-medium text-3xl">
                        {{ log.url }}
                    </h3>
                </div>
                <div class="flex items-center gap-2 py-8">
                    <div
                        class="px-3 pb-1 pt-1.5 rounded-lg uppercase font-bold text-white"
                        :class="{
                            'bg-success-500' : log.status >= 200 && log.status < 300,
                            'bg-danger-500' : log.status >= 400 && log.status < 600,
                        }"
                    >
                        {{ log.method }}
                    </div>
                    <div
                        class="px-3 pb-1 pt-1.5 rounded-lg font-bold text-white"
                        :class="{
                            'bg-success-500' : log.status >= 200 && log.status < 300,
                            'bg-danger-500' : log.status >= 400 && log.status < 600,
                        }"
                    >
                        {{ log.status }}
                    </div>
                    <LogDate :date="log.date" />
                </div>
                <details class="text-white">
                    <summary class="cursor-pointer select-none">Details :</summary>
                    <div class="flex flex-col gap-2 mt-2 ml-4">
                        <details class="text-white">
                            <summary class="cursor-pointer select-none">Response :</summary>
                            <pre>
                                <code class="language-json">
                                    {{ log.response }}
                                </code>
                            </pre>
                        </details>
                        <details class="text-white">
                            <summary class="cursor-pointer select-none">Req Headers :</summary>
                            <pre class="whitespace-pre-line">
                                <code class="language-json">
                                    {{ log.requestHeaders }}
                                </code>
                            </pre>
                        </details>
                        <details class="text-white">
                            <summary class="cursor-pointer select-none">Res Headers :</summary>
                            <pre>
                                <code class="language-json">
                                    {{ log.responseHeaders }}
                                </code>
                            </pre>
                        </details>
                        <details v-if="log.payload" class="text-white">
                            <summary class="cursor-pointer select-none">Payload :</summary>
                            <pre>
                                <code class="language-json">
                                    {{ log.payload }}
                                </code>
                            </pre>
                        </details>
                    </div>
                </details>
            </div>
        </div>

    </div>
</template>

<style>

.log-item-animation {
    animation-name: log-fade-in;
    animation-duration: 0.5s;
}

@keyframes log-fade-in {
    from {
        opacity : 0;
        scale: 0.8;
    }
    to {
        opacity : 1;
        scale: 1;
    }
}

</style>