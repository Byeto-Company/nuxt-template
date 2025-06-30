<script lang="ts" setup>
// imports

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// type

type Props = {
    id: number;
    title: string;
    contentElevation?: boolean;
};

// props

const props = withDefaults(defineProps<Props>(), {
    contentElevation: true,
});
const { id } = toRefs(props);

// state

const { removeContent } = useArticleBuilderServices();
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
                    @click="removeContent(id)"
                    color="error"
                    class="p-2"
                    variant="subtle"
                >
                    <UIcon
                        name="lucide:trash-2"
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
