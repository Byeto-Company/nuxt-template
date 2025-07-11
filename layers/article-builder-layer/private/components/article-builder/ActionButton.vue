<script lang="ts" setup>
// import

import { motion } from "motion-v";
import useArticleBuilderServices from "../../../stores/services/useArticleBuilderServices";
import type { ArticleSection } from "../../../stores/articleBuilder";
import useCreateSection from "../../composables/api/article-builder/useCreateSection";
import { useAppParams } from "../../composables/useAppParams";

// types

type Action = {
    icon: string;
    name: string;
    template: Omit<ArticleSection, "id">;
};

// state

const isOpen = ref(false);

const { appendContent } = useArticleBuilderServices();

const { store } = useArticleBuilderServices();

const actions: Action[] = [
    {
        icon: "lucide:heading-2",
        name: "عنوان",
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
        name: "پاراگراف",
        template: {
            content_value: "",
            content_type: "paragraph",
            options: {},
        },
    },
    {
        icon: "lucide:image",
        name: "عکس",
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
        name: "ویدیو",
        template: {
            content_value: "",
            content_type: "video",
            options: {},
        },
    },
    {
        icon: "lucide:gallery-horizontal-end",
        name: "گالری عکس",
        template: {
            content_value: [],
            content_type: "gallery",
            options: {},
        },
    },
    {
        icon: "lucide:slash",
        name: "جدا کننده",
        template: {
            content_value: "",
            content_type: "separator",
            options: {},
        },
    },
    {
        icon: "lucide:paperclip",
        name: "ضمیمه",
        template: {
            content_value: [],
            content_type: "attachments",
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
            onSuccess: (data) => {
                appendContent({ ...data });
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
                    <UTooltip
                        v-for="action in actions"
                        :key="action.icon"
                        arrow
                        :text="action.name"
                        :content="{ side: 'top', sideOffset: 5 }"
                        :delay-duration="0"
                    >
                        <UButton
                            class="!text-2xl px-5"
                            :icon="action.icon"
                            variant="solid"
                            @click="handleAppendContent(action)"
                        />
                    </UTooltip>
                </UButtonGroup>
            </motion.div>
        </AnimatePresence>
    </div>
</template>
