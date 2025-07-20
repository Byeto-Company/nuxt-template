<script setup lang="ts">
// imports

import { useApiServices } from "~/composables/global/useApiServices";
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const { store } = useArticleBuilderServices();

const { handlePatchHero } = useApiServices();

const isPublished = computed({
    get: () => store.article.is_publish,
    set: useDebounceFn((value: boolean) => {
        store.article.is_publish = value;
        handlePatchHero({
            is_publish: value,
        });
    }, 1000),
});
</script>

<template>
    <USwitch
        label="منتشر شده"
        v-model="isPublished"
        class="pt-1"
    />
</template>

<style scoped></style>
