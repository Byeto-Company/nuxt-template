<script setup>
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";

useHead({
    htmlAttrs: {
        lang: "fa",
        dir: "rtl",
        class: "dark",
    },
});

useSeoMeta({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - Site Title` : "Site Title";
    },
});
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />

        <NuxtLayout>
            <UApp>
                <NuxtPage />
            </UApp>
            <div dir="ltr">
                <VueQueryDevtools
                    dir="l-tr"
                    buttonPosition="bottom-left"
                />
            </div>
        </NuxtLayout>
    </div>
</template>
