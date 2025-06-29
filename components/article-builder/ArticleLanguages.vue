<script setup lang="ts">
// imports

import type { TabsItem } from "@nuxt/ui";

// state

const currentLanguage = ref({
    label: "فارسی",
    code: "fa",
    icon: "circle-flags:ir",
});

const items = [
    {
        label: "English",
        code: "en",
        icon: "circle-flags:us",
    },
    {
        label: "العربية",
        code: "ar",
        icon: "circle-flags:ae",
    },
    {
        label: "فارسی",
        code: "fa",
        icon: "circle-flags:ir",
    },
];

// computeds

const currentTab = computed({
    get: () => items.findIndex((item) => item.code == currentLanguage.value.code).toString(),
    set: (value: number) => {
        currentLanguage.value = items[value];
    },
});
</script>

<template>
    <UTabs
        :items="items"
        class="w-[20rem]"
        v-model="currentTab"
        :content="false"
    />
</template>

<style scoped></style>
