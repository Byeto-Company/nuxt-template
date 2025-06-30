<script setup lang="ts">
// imports

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const { store } = useArticleBuilderServices();

const items: Language[] = [
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
    get: () => items.findIndex((item) => item.code == store.currentLanguage?.code).toString(),
    set: (value: number) => {
        console.log(items[value]);

        store.setCurrentLanguage(items[value]);
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
