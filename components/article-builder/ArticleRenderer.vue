<script lang="ts" setup>
// imports

import { cloneDeep } from "lodash-es";
import { Reorder } from "motion-v";
import useGetArticle from "~/composables/api/article-builder/useGetArticle";
import useReorderSection, { type ReorderSectionRequest } from "~/composables/api/article-builder/useReorderSection";
import { useAppParams } from "~/composables/global/useAppParams";
import { QUERY_KEYS } from "~/constants/query-keys";

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const { $queryClient: queryClient } = useNuxtApp();
const toast = useToast();

const dragControls = useDragControls();

const shouldTrackContentChanges = ref(false);

const progress = ref(null);

const { slug } = useAppParams();
const { store } = useArticleBuilderServices();

const currentContents = computed({
    get: () => store.article.contents,
    set: (value) => store.setContents(value),
});

const previous = ref(cloneDeep(currentContents.value));

const articleComponents = ["heading", "paragraph", "image", "separator", "video", "gallery", "attachments"];

const componentMap = Object.fromEntries(
    articleComponents.map((key) => [
        key,
        defineAsyncComponent(() => import(`~/components/article-builder/sections/${capitalize(key)}Section.vue`)),
    ])
);

// queries

const { data: article, isPending: getArticleIsPending, status: getArticleStatus } = useGetArticle();

const { mutateAsync: reorderSection, isPending: reorderIsPending } = useReorderSection();

// methods

const setShouldTrackContentChanges = (value: boolean) => {
    shouldTrackContentChanges.value = value;
};

const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleSwap = async (id: number, new_index: number, current_order?: number) => {
    const movedTo = await previous.value.find((_, index) => index == new_index);

    const payload: ReorderSectionRequest = {
        content_id: id,
        new_order: movedTo?.order ?? undefined,
    };
    if (!!movedTo?.order && movedTo.order != current_order) {
        reorderSection(
            { ...payload },
            {
                onSettled: () => {
                    queryClient.resetQueries({ queryKey: [QUERY_KEYS.article] });
                },
                onError: () => {
                    toast.add({
                        title: "در جابجایی سکشن خطایی رخ داد",
                        color: "error",
                    });
                },
            }
        );
    }
};

// watch

watch(
    () => getArticleStatus.value,
    (nv) => {
        shouldTrackContentChanges.value = false;

        if (nv == "success") {
            Object.assign(store.article, article.value);
            slug.value = article.value?.slug;
            setTimeout(() => {
                shouldTrackContentChanges.value = true;
            }, 3000);
        }
    },
    {
        immediate: true,
    }
);
</script>

<template>
    <Transition name="fade">
        <UProgress
            v-if="getArticleIsPending || reorderIsPending"
            v-model="progress"
            class="fixed top-0 inset-x-0 z-20"
            :ui="{
                base: '!h-1 !bg-neutral-800/20 rounded-none',
            }"
        />
    </Transition>

    <Transition
        name="fade"
        mode="out-in"
    >
        <div
            v-if="!currentContents.length"
            class="size-full min-h-[62svh] p-5 flex-center shrink-0 grow"
        >
            <div
                class="size-full min-h-[63svh] flex grow border-2 rounded-xl shrink-0 border-neutral-800 border-dashed flex-col-center gap-5"
            >
                <Icon
                    name="lucide:circle-fading-plus"
                    class="text-neutral-600 text-7xl"
                />
                <span class="lg:text-lg text-neutral-600"> محتوایی وجود ندارد </span>
            </div>
        </div>
        <Reorder.Group
            v-else
            as="ol"
            axis="y"
            v-model:values="currentContents"
            class="flex flex-col gap-9 !px-5 !py-9 container overflow-y-scroll"
            layoutScroll
        >
            <Reorder.Item
                v-for="(content, i) in currentContents"
                :key="content.id"
                :value="content"
                :dragControls="dragControls"
                class="relative"
                @dragTransitionEnd="handleSwap(content.id, i, content?.order)"
            >
                <component
                    :is="componentMap[content.content_type]"
                    :id="content.id"
                    :content="content"
                ></component>
            </Reorder.Item>
        </Reorder.Group>
    </Transition>
</template>
