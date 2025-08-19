<script setup lang="ts">
// imports

import { useApiServices } from "~/composables/global/useApiServices";
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const { store } = useArticleBuilderServices();

const { handlePatchHero, patchIsPending } = useApiServices();

const thumbnail = computed({
    get: () => store.article.thumbnail,
    set: useDebounceFn((value: null) => {
        store.article.thumbnail = value;
        handlePatchHero({
            thumbnail: value,
        });
    }, 1000),
});
</script>

<template>
    <UButton
        label="حذف بنر"
        variant="subtle"
        :disabled="thumbnail == null"
        color="error"
        @click="thumbnail = null"
        :loading="patchIsPending"
        :ui="{
            base: 'w-40 justify-center py-5',
        }"
    />
</template>

<style scoped></style>
