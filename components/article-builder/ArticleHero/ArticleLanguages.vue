<script setup lang="ts">
// imports

import { QUERY_KEYS } from "~/constants/query-keys";
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const { store } = useArticleBuilderServices();

const { $queryClient: queryClient } = useNuxtApp();

const items = ref<Language[]>([
    { label: "English", code: "en", icon: "circle-flags:us" },
    { label: "العربية", code: "ar", icon: "circle-flags:ae" },
    { label: "فارسی", code: "fa", icon: "circle-flags:ir" },
]);

const currentTab = computed({
    get: () => items.value.findIndex((item) => item.code == store.currentLanguage.code).toString(),
    set: (value: number) => {
        const selectedItem = items.value[value];
        if (store.currentLanguage.code !== selectedItem.code) {
            store.currentLanguage = { ...selectedItem };
            queryClient.resetQueries({ queryKey: [QUERY_KEYS.article] });
        }
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
