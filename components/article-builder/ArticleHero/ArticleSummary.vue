<script setup lang="ts">
// imports

import { useApiServices } from "~/composables/global/useApiServices";
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const { store } = useArticleBuilderServices();

const { handlePatchHero } = useApiServices();

const summary = computed({
    get: () => store.article.summary,
    set: useDebounceFn((value: string) => {
        store.article.summary = value;
        handlePatchHero({
            summary: value,
        });
    }, 1000),
});
</script>

<template>
    <UTextarea
        class="w-full"
        v-model="summary"
        placeholder="توضیحات مقاله"
        :ui="{
            base: 'text-lg p-3.5 resize-none !ring-neutral-700/70',
        }"
    />
</template>

<style scoped></style>
