<script lang="ts" setup>
// imports

import useDeleteSection from "~/composables/api/article-builder/useDeleteSection";
import usePatchSection from "~/composables/api/article-builder/usePatchSection";
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// type

type Props = {
    id: number;
    title: string;
    contentElevation?: boolean;
};

type ContentValue = Pick<ArticleSection, "content_value">;
type Options = Pick<ArticleSection, "options">;

// props

const props = withDefaults(defineProps<Props>(), {
    contentElevation: true,
});
const { id } = toRefs(props);

// state

const patchMessage = ref<{
    title: string;
    status: "error" | "success" | "primary" | "secondary" | "info" | "warning" | "neutral" | undefined;
} | null>(null);

const { getContent, getOptions, removeContent } = useArticleBuilderServices();

// computed

const content_value = computed<ContentValue>(() => getContent(id.value));

const options = computed<Options>(() => getOptions(id.value)!);

// queries

const { mutateAsync: patchSection, isPending: patchSectionIsPending } = usePatchSection();

const { mutateAsync: deleteSection, isPending: deleteSectionIsPending } = useDeleteSection();

// methods

const handleDelete = () => {
    deleteSection(
        { id: id.value },
        {
            onSuccess: () => {
                removeContent(id.value);
            },
        }
    );
};

const handlePatch = (content_value: ContentValue, options: Options) => {
    patchSection(
        {
            id: id.value,
            variables: {
                content_value: content_value ?? null,
                options: options ?? null,
            },
        },
        {
            onSuccess: () => {
                patchMessage.value = {
                    title: "ذخیره شده",
                    status: "success",
                };
                setTimeout(() => {
                    patchMessage.value = null;
                }, 2000);
            },
            onError: () => {
                patchMessage.value = {
                    title: "خطا در ذخیره سازی",
                    status: "error",
                };
            },
        }
    );
};

// watch

watchDebounced(
    () => [content_value.value, options.value],
    ([nv1, nv2]) => {
        handlePatch(nv1 as ContentValue, nv2 as Options);
    },
    { debounce: 1000, maxWait: 1500, deep: true }
);
</script>

<template>
    <div
        class="relative p-4 rounded-lg bg-neutral-800/60 backdrop-blur-sm border border-neutral-700/60 shadow-md shadow-black/20"
    >
        <div class="flex items-center justify-between p-4 w-full">
            <span class="text-white text-2xl font-bold">
                {{ title }}
            </span>
            <div class="flex items-center justify-end gap-4">
                <Transition
                    name="fade"
                    mode="out-in"
                >
                    <UIcon
                        v-if="patchSectionIsPending"
                        name="svg-spinners:180-ring-with-bg"
                        class="text-2xl"
                    />
                    <UBadge
                        v-else-if="!!patchMessage"
                        :label="patchMessage.title"
                        :color="patchMessage.status"
                        variant="subtle"
                        trailing-icon="lucide:square-check"
                        :ui="{
                            base: 'text-xs py-[9px] gap-2',
                            trailingIcon: 'text-lg',
                        }"
                    />
                </Transition>
                <UButton
                    v-if="!!patchMessage && patchMessage.status == 'error'"
                    @click="handlePatch(content_value, options)"
                    color="neutral"
                    class="p-2"
                    variant="subtle"
                >
                    <UIcon
                        name="lucide:refresh-ccw"
                        class="text-xl"
                    />
                </UButton>
                <UButton
                    color="neutral"
                    class="p-2"
                    variant="subtle"
                >
                    <UIcon
                        name="lucide:menu"
                        class="text-xl"
                    />
                </UButton>
                <UButton
                    @click="handleDelete"
                    color="error"
                    class="p-2"
                    :disabled="deleteSectionIsPending"
                    variant="subtle"
                >
                    <UIcon
                        :name="deleteSectionIsPending ? 'svg-spinners:180-ring-with-bg' : 'lucide:trash-2'"
                        class="text-xl"
                    />
                </UButton>
            </div>
        </div>
        <div
            class="p-4"
            v-if="$slots['default']"
        >
            <div
                :class="contentElevation ? 'bg-neutral-800 rounded-lg border border-dashed border-neutral-700 p-4' : ''"
            >
                <slot />
            </div>
        </div>
        <div
            v-if="!!$slots['settings']"
            class="p-4 w-full"
        >
            <slot name="settings" />
        </div>
    </div>
</template>
