<script lang="ts" setup>
// imports

import { Reorder } from "motion-v";
import useGetArticle from "~/composables/api/article-builder/useGetArticle";
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const dragControls = useDragControls();

const progress = ref(null);

const { store } = useArticleBuilderServices();

const currentContents = computed({
    get: () => store.article.contents,
    set: (value) => store.setContents(value),
});

const articleComponents = ["heading", "paragraph", "image", "separator", "video", "gallery", "attachment"];

const componentMap = Object.fromEntries(
    articleComponents.map((key) => [
        key,
        defineAsyncComponent(() => import(`~/components/article-builder/sections/${capitalize(key)}Section.vue`)),
    ])
);

// queries

const { data: article, isPending: GetArticleIsPending, isSuccess: GetArticleIsSuccess } = useGetArticle();

// methods

const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

whenever(
    () => GetArticleIsSuccess.value,
    (nv) => {
        if (nv) {
            Object.assign(store.article, article.value);
        }
    }
);
</script>

<template>
    <Transition name="fade">
        <UProgress
            v-if="GetArticleIsPending"
            v-model="progress"
            class="fixed top-0 inset-x-0"
            :ui="{
                base: '!h-1 !bg-neutral-800/20 rounded-none',
            }"
        />
    </Transition>

    <Reorder.Group
        as="ol"
        axis="y"
        v-model:values="currentContents"
        class="flex flex-col gap-9 !px-5 !py-9 container"
    >
        <Reorder.Item
            v-for="(content, i) in currentContents"
            :key="content.id"
            :value="content"
            :dragListener="false"
            :dragControls="dragControls"
            class="relative"
        >
            <component
                :is="componentMap[content.content_type]"
                :id="content.id"
                :content="content"
            ></component>
        </Reorder.Item>
    </Reorder.Group>
</template>
