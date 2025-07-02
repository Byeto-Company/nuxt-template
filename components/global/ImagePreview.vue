<script setup lang="ts">
// imports

import { useImage } from "@vueuse/core";
import useDeleteFile from "~/composables/api/article-builder/useDeleteFile";

// types

type Props = {
    id?: number;
    src: string;
    alt?: string;
};

type Emits = {
    delete: [id: number];
};

// props

const props = defineProps<Props>();

const { src, id } = toRefs(props);

// emits

const emit = defineEmits<Emits>();

// state

const previewVisible = ref(false);

const toast = useToast();

const { isLoading } = useImage({ src: src.value });

// queries

const { mutateAsync: deleteFile, isPending: deleteFileIsPending } = useDeleteFile();

// methods

const handleDeleteFile = async () => {
    deleteFile(
        { id: id.value! },
        {
            onSuccess: () => {
                emit("delete", id.value!);
                toast.add({
                    title: "فایل با موفقیت حذف شد",
                    color: "success",
                });
            },
            onError: () => {
                toast.add({
                    title: "خطایی در حذف فایل رخ داد",
                    color: "error",
                });
            },
        }
    );
};
</script>

<template>
    <div
        class="w-full"
        :class="!!id ? 'relative' : ''"
    >
        <UButton
            v-if="!!id"
            color="error"
            variant="outline"
            class="absolute -left-2 -top-2 z-4 aspect-square bg-red-950 hover:bg-red-900 scale-90"
            @click="handleDeleteFile"
            :disabled="deleteFileIsPending"
        >
            <UIcon
                :name="deleteFileIsPending ? 'svg-spinners:180-ring' : 'lucide:trash-2'"
                class="text-xl"
            />
        </UButton>
        <USkeleton
            v-if="isLoading"
            class="w-full h-max rounded-2xl"
        />
        <div
            v-else
            class="relative w-full h-max group rounded-2xl overflow-hidden"
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
