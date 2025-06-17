<script lang="ts" setup>
// imports

import { Reorder } from "motion-v";

// state

const dragControls = useDragControls();

const articleBuilderStore = useArticleBuilderStore();

const currentContents = computed({
    get: () => articleBuilderStore.contents,
    set: (value) => articleBuilderStore.setContents(value),
});
</script>

<template>
    <Reorder.Group
        axis="y"
        v-model:values="currentContents"
        class="flex flex-col gap-10 mt-20"
    >
        <Reorder.Item
            v-for="(content, i) in currentContents"
            :data-index="i"
            :key="content.id"
            :value="content"
            class="relative"
            :dragListener="false"
        >
            <HeadingSection
                :id="content.id"
                :content="content"
                v-if="content.type === 'heading'"
            />
            <ParagraphSection
                :id="content.id"
                :content="content"
                v-if="content.type === 'paragraph'"
            />
            <ImageSection
                :id="content.id"
                :content="content"
                v-if="content.type === 'image'"
            />
        </Reorder.Item>
    </Reorder.Group>
</template>
