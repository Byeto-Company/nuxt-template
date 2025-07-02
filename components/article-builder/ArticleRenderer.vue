<script lang="ts" setup>
// imports

import { Reorder } from "motion-v";
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const dragControls = useDragControls();

const { store } = useArticleBuilderServices();

const currentContents = computed({
    get: () => store.article.content,
    set: (value) => store.setContent(value),
});

const articleComponents = ["heading", "paragraph", "image", "seprator", "video", "gallery", "attachment"];

const componentMap = Object.fromEntries(
    articleComponents.map((key) => [
        key,
        defineAsyncComponent(() => import(`~/components/article-builder/sections/${capitalize(key)}Section.vue`)),
    ])
);

// methods

const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<template>
    <Reorder.Group
        as="ol"
        axis="y"
        v-model:values="currentContents"
        class="flex flex-col gap-10 py-9 container"
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
                :is="componentMap[content.type]"
                :id="content.id"
                :content="content"
            ></component>
        </Reorder.Item>
    </Reorder.Group>
</template>
