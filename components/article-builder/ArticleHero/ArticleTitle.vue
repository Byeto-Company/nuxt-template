<script setup lang="ts">
// imports

import { useApiServices } from "~/composables/global/useApiServices";
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const { store } = useArticleBuilderServices();

const { handlePatchHero } = useApiServices();

const title = computed({
    get: () => store.article.title,
    set: useDebounceFn((value: string) => {
        store.article.title = value;
        handlePatchHero({
            title: value,
        });
    }, 1000),
});
</script>

<template>
    <UInput
        class="w-full"
        v-model="title"
        placeholder="عنوان مقاله"
        variant="outline"
        :ui="{
            base: 'text-2xl p-3.5',
        }"
    />
</template>

<style scoped></style>
