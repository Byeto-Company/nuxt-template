<script setup lang="ts">
// imports

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// types

type Emits = {
    change: [value: Language];
};

// emits

const emit = defineEmits<Emits>();

// state

const { store } = useArticleBuilderServices();

const items: Language[] = [
    { label: "English", code: "en", icon: "circle-flags:us" },
    { label: "العربية", code: "ar", icon: "circle-flags:ae" },
    { label: "فارسی", code: "fa", icon: "circle-flags:ir" },
];

const currentTab = ref(0);

const onTabClick = (value: number) => {
    currentTab.value = value;
    emit("change", items[currentTab.value]);
    store.setCurrentLanguage(items[currentTab.value]);
};

// watch

watch(
    () => store.currentLanguage?.code,
    (newCode) => {
        const idx = items.findIndex((i) => i.code === newCode);
        currentTab.value = idx !== -1 ? idx : 0;
    },
    { immediate: true }
);
</script>

<template>
    <UTabs
        :items="items"
        class="w-[20rem]"
        :model-value="currentTab.toString()"
        :content="false"
        @update:model-value="(value: any) => onTabClick(value)"
    />
</template>
