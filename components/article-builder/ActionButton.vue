<script lang="ts" setup>
// import

import { motion } from "motion-v";
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const isOpen = ref(false);

const { appendContent } = useArticleBuilderServices();

const actions: {
    icon: string;
    template: Omit<ArticleSection, "id">;
}[] = [
    {
        icon: "lucide:heading-2",
        template: {
            contentValue: "",
            type: "heading",
            options: {
                level: 3,
            },
        },
    },
    {
        icon: "lucide:text",
        template: {
            contentValue: "",
            type: "paragraph",
            options: {},
        },
    },
    {
        icon: "lucide:image",
        template: {
            contentValue: "",
            type: "image",
            options: {
                alt: "",
            },
        },
    },
    {
        icon: "lucide:video",
        template: {
            contentValue: "",
            type: "video",
            options: {},
        },
    },
    {
        icon: "lucide:gallery-horizontal-end",
        template: {
            contentValue: "",
            type: "image",
            options: {},
        },
    },
    {
        icon: "lucide:slash",
        template: {
            contentValue: "",
            type: "seprator",
            options: {},
        },
    },
    {
        icon: "lucide:paperclip",
        template: {
            contentValue: "",
            type: "attachment",
            options: {},
        },
    },
];
</script>

<template>
    <div class="fixed right-20 bottom-20 flex items-center gap-4">
        <UButton
            @click="isOpen = !isOpen"
            size="xl"
            class="size-[60px] flex-center rounded-full cursor-pointer relative z-1"
        >
            <UIcon
                name="lucide:plus"
                class="text-2xl transition-all"
                :class="isOpen ? 'rotate-45' : ''"
            />
        </UButton>
        <AnimatePresence>
            <motion.div
                v-if="isOpen"
                :initial="{
                    x: 20,
                    opacity: 0,
                }"
                :animate="{
                    x: 0,
                    opacity: 1,
                }"
                :exit="{
                    x: 20,
                    opacity: 0,
                }"
                :transition="{
                    default: {
                        duration: 0.2,
                    },
                    opacity: {
                        duration: 0.15,
                    },
                }"
            >
                <UButtonGroup
                    size="xl"
                    class="h-[60px]"
                >
                    <UButton
                        v-for="action in actions"
                        :key="action.icon"
                        class="!text-2xl px-5"
                        :icon="action.icon"
                        variant="solid"
                        @click="
                            () => {
                                appendContent(action.template);
                                isOpen = false;
                            }
                        "
                    />
                </UButtonGroup>
            </motion.div>
        </AnimatePresence>
    </div>
</template>
