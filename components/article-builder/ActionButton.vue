<script lang="ts" setup>
// import

import { motion } from "motion-v";
import useCreateSection from "~/composables/api/article-builder/useCreateSection";
import { useAppParams } from "~/composables/global/useAppParams";
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// types

type Action = {
    icon: string;
    template: Omit<ArticleSection, "id">;
};

// state

const isOpen = ref(false);

const { appendContent } = useArticleBuilderServices();

const { store } = useArticleBuilderServices();

const actions: Action[] = [
    {
        icon: "lucide:heading-2",
        template: {
            content_value: "",
            content_type: "heading",
            options: {
                level: 3,
            },
        },
    },
    {
        icon: "lucide:text",
        template: {
            content_value: "",
            content_type: "paragraph",
            options: {},
        },
    },
    {
        icon: "lucide:image",
        template: {
            content_value: "",
            content_type: "image",
            options: {
                alt: "",
            },
        },
    },
    {
        icon: "lucide:video",
        template: {
            content_value: "",
            content_type: "video",
            options: {},
        },
    },
    {
        icon: "lucide:gallery-horizontal-end",
        template: {
            content_value: [],
            content_type: "gallery",
            options: {},
        },
    },
    {
        icon: "lucide:slash",
        template: {
            content_value: "",
            content_type: "separator",
            options: {},
        },
    },
    {
        icon: "lucide:paperclip",
        template: {
            content_value: [],
            content_type: "attachment",
            options: {},
        },
    },
];

// queries

const { mutateAsync: createSection, isPending: createSectionIsPending } = useCreateSection();

const { slug } = useAppParams();

// methods

const handleAppendContent = (action: Action) => {
    isOpen.value = false;
    createSection(
        {
            slug: slug.value!,
            options: action.template.options,
            content_value: action.template.content_value,
            content_type: action.template.content_type,
            order: store.article.contents.length,
        },
        {
            onSuccess: () => {
                appendContent(action.template);
                setTimeout(() => {
                    window.scrollY = window.innerHeight;
                }, 100);
            },
        }
    );
};
</script>

<template>
    <div class="fixed right-20 bottom-20 flex items-center gap-4">
        <UButton
            @click="isOpen = !isOpen"
            size="xl"
            class="size-[60px] flex-center rounded-full cursor-pointer relative z-1"
        >
            <UIcon
                :name="createSectionIsPending ? 'svg-spinners:180-ring' : 'lucide:plus'"
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
                    :class="createSectionIsPending ? 'pointer-events-none' : ''"
                >
                    <UButton
                        v-for="action in actions"
                        :key="action.icon"
                        class="!text-2xl px-5"
                        :icon="action.icon"
                        variant="solid"
                        @click="handleAppendContent(action)"
                    />
                </UButtonGroup>
            </motion.div>
        </AnimatePresence>
    </div>
</template>
