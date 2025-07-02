<script setup>
// imports

import useGetToken from "~/composables/api/auth/useGetToken";
import useAppServices from "~/stores/services/useAppServices";

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

// imports

import { VueQueryDevtools } from "@tanstack/vue-query-devtools";

// state

const { store } = useAppServices();

// queries

const { data: token, isSuccess } = useGetToken();

// watch

watch(isSuccess, () => {
    store.setToken(token.value.access);
    store.setRefreshToken(token.value.refresh);
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
