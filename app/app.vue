<script lang="ts" setup>
// imports

import * as ui_locales from "@nuxt/ui/locale";

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
        width: "device-width"
    }
});

useHead({
    htmlAttrs: {
        dir,
        lang,
        class: ""
    },
    bodyAttrs: { class: "" }
});
</script>

<template>
    <NuxtRouteAnnouncer />
    <NuxtPwaManifest />

    <NuxtLayout>
        <UApp
            :locale="ui_locales[locale]"
            :toaster="{ position: 'top-center', progress: false, expand: false }"
            :tooltip="{ delayDuration: 0 }"
        >
            <ApiLayerWrapper dir="ltr">
                <AuthLayerWrapper>
                    <NuxtPage />
                </AuthLayerWrapper>
            </ApiLayerWrapper>
        </UApp>
    </NuxtLayout>
</template>
