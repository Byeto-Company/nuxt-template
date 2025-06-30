<script setup lang="ts">
// imports

import { useImage } from "@vueuse/core";

// types

type Props = {
    src: string;
    alt?: string;
};

const props = defineProps<Props>();

const { src } = toRefs(props);

// state

const previewVisible = ref(false);

const { isLoading } = useImage({ src: src.value });
</script>

<template>
    <div class="w-full">
        <USkeleton
            v-if="isLoading"
            class="w-full h-[30rem] rounded-2xl"
        />
        <div
            v-else
            class="relative w-full h-[30rem] group rounded-xl lg:rounded-2xl overflow-hidden"
        >
            <slot name="thumbnail" />

            <div
                class="w-full absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex-center transition-opacity duration-300 cursor-pointer"
                @click="previewVisible = true"
            >
                <slot
                    v-if="$slots['icon']"
                    name="icon"
                />
                <UIcon
                    v-else
                    name="lucide:eye"
                    size="20"
                    class="text-slate-100"
                />
            </div>
        </div>
        <UModal
            v-model:open="previewVisible"
            :ui="{
                content: 'bg-transparent !ring-slate-200/20 divide-none scale-150',
            }"
        >
            <template #content>
                <img
                    :src="src"
                    :alt="alt"
                    class="rounded-lg shadow"
                />

                <UIcon
                    name="lucide:circle-x"
                    size="16"
                    class="text-slate-100 absolute top-5 left-5 cursor-pointer"
                    @click="previewVisible = false"
                />
            </template>
        </UModal>
    </div>
</template>
