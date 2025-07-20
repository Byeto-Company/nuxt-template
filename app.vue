<script setup lang="ts">
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

const { store, clearTokens } = useAppServices();

const route = useRoute();

// queries

const { data: token, isSuccess, isError, error, suspense } = useGetToken();

await suspense();

// watch

watch(
    isSuccess,
    () => {
        store.setToken(token.value?.access!);
        store.setRefreshToken(token.value?.refresh!);
    },
    {
        immediate: true,
    }
);

watch(
    () => isError.value,
    (nv) => {
        //@ts-ignore
        if (nv && store.token != "" && "response" in error.value && error.value.response["status"] == 404) {
            clearTokens();
            throw createError({
                status: 404,
                message: "Your token is invalid",
            });
        }
    },
    { immediate: true }
);

// lifecycle

onMounted(() => {
    if (route.query["otp"] == "" || !route.query.hasOwnProperty("otp")) {
        throw createError({
            status: 404,
            message: "No Token Found",
        });
    }
});
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />

        <NuxtLayout>
            <UApp :toaster="{
                position: 'bottom-center'
            }">
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
