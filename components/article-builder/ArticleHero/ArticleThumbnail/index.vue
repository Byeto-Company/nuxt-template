<script setup lang="ts">
// imports

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const { store } = useArticleBuilderServices();

const thumbnail = computed(() => store.article.thumbnail);
</script>

<template>
    <div
        class="absolute inset-0 bg-cover bg-no-repeat opacity-4 -z-1"
        :style="{
            backgroundImage: `url(${thumbnail})`,
        }"
    ></div>
</template>

<style scoped></style>
