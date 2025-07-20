<script setup lang="ts">
// imports

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const { store } = useArticleBuilderServices();

const route = useRoute();

// computed

const main_title = computed({
    get: () => store.main_title,
    set: (value: string) => (store.main_title = value),
});

// watch

watch(
    () => route.query,
    (nv) => {
        main_title.value = nv.parent_title as any;
    },
    {
        immediate: true,
    }
);
</script>

<template>
    <h1 class="text-2xl font-semibold">عنوان اصلی : {{ main_title }}</h1>
</template>

<style scoped></style>
