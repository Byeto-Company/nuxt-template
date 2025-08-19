<script setup lang="ts">
// imports

import useDeleteFile from "~/composables/api/article-builder/useDeleteFile";

// types

type Props = {
    data: FileResponse;
};

type Emits = {
    delete: [id: number];
};

// props

const props = defineProps<Props>();

const { data } = toRefs(props);

// emits

const emit = defineEmits<Emits>();

// state

const toast = useToast();

// queries

const { mutateAsync: deleteFile, isPending: deleteFileIsPending } = useDeleteFile();

// methods

const handleDeleteFile = async () => {
    deleteFile(
        { id: data.value.id },
        {
            onSuccess: () => {
                emit("delete", data.value.id);
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
        class="w-full p-2 flex items-center justify-start gap-3 rounded-lg bg-neutral-700 border border-dashed border-slate-200/20 relative z-3"
    >
        <UButton
            color="error"
            variant="outline"
            class="absolute -left-3 -top-3 z-4 aspect-square bg-red-950 hover:!bg-red-900 scale-80"
            @click="handleDeleteFile"
            :disabled="deleteFileIsPending"
        >
            <UIcon
                :name="deleteFileIsPending ? 'svg-spinners:180-ring' : 'lucide:trash-2'"
                class="text-xl"
            />
        </UButton>
        <div class="aspect-square w-[5rem] rounded-md bg-neutral-900 text-white flex-center">
            <UIcon
                name="lucide:paperclip"
                class="text-xl text-white"
            />
        </div>
        <div class="w-full pe-3 flex flex-col items-start justify-between">
            <NuxtLink
                :to="data.file"
                target="_blank"
                download
                class="line-clamp-1 hover:underline underline-offset-2"
            >
                {{ data.name }}
            </NuxtLink>
            <span class="text-gray-400 text-xs line-clamp-1">{{ (data.size / 1024).toFixed(2) }}KB</span>
        </div>
    </div>
</template>

<style scoped></style>
