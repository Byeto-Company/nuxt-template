<script lang="ts" setup>
// imports
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices.client";

// state

const { store } = useArticleBuilderServices();

// computed

const title = computed({
    get: () => store.article.title,
    set: (value: string) => store.setTitle(value),
});

const description = computed({
    get: () => store.article.description,
    set: (value: string) => store.setDescription(value),
});
</script>

<template>
    <div class="w-full flex flex-col gap-5 container border-b-2 border-neutral-800 pb-9">
        <div class="w-full flex items-center justify-between">
            <h1 class="text-2xl font-semibold">عنوان اصلی : متن تستی است</h1>
            <ArticleLanguages />
        </div>
        <div class="w-full flex flex-col gap-5">
            <UInput
                class="w-full"
                v-model="title"
                placeholder="عنوان مقاله"
                variant="ghost"
                :ui="{
                    base: 'text-2xl p-3.5',
                }"
            />
            <UTextarea
                class="w-full"
                v-model="description"
                placeholder="توضیحات مقاله"
                :ui="{
                    base: 'text-lg p-3.5 resize-none !ring-neutral-700/70',
                }"
            />
        </div>
    </div>
</template>
