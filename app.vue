<script lang="ts" setup>
// imports

<<<<<<< HEAD
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { ASSETS } from "./constants/assets";
import * as ui_locales from "@nuxt/ui/locale";
=======
import useGetToken from "~/composables/api/auth/useGetToken";
import useAppServices from "~/stores/services/useAppServices";
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366

// states

const { locale } = useI18n();

const { dir, lang } = useAppLocale();

useSeoMeta({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} | Website` : "Website";
    },
    viewport: {
        initialScale: 1,
        maximumScale: 1,
        userScalable: "no",
        width: "device-width",
    },
});

useHead({
    htmlAttrs: {
        dir,
        lang,
        class: "dark",
    },
    bodyAttrs: { class: "bg-neutral-950" },
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
    <NuxtRouteAnnouncer />
    <NuxtPwaManifest />

<<<<<<< HEAD
    <NuxtLayout>
        <UApp
            :locale="ui_locales[locale]"
            :toaster="{ position: 'top-center', progress: false, expand: false }"
            :tooltip="{ delayDuration: 0 }"
        >
            <div data-vaul-drawer-wrapper>
                <NuxtPage />
                <div dir="ltr">
                    <VueQueryDevtools
                        dir="ltr"
                        buttonPosition="bottom-left"
                    />
                </div>
=======
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
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366
            </div>
        </UApp>
    </NuxtLayout>
</template>
