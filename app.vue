<script setup lang="ts">
// imports

import { VueQueryDevtools } from "@tanstack/vue-query-devtools";

// meta

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

useServerSideAuthCheck();
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />

        <NuxtLayout>
            <UApp
                :toaster="{
                    position: 'bottom-center',
                }"
            >
                <NuxtPage />
            </UApp>
            <div dir="ltr">
                <VueQueryDevtools
                    dir="ltr"
                    buttonPosition="bottom-left"
                />
            </div>
        </NuxtLayout>
    </div>
</template>
