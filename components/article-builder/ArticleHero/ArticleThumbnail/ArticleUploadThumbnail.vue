<script setup lang="ts">
// imports

import { useApiServices } from "~/composables/global/useApiServices";
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const { store } = useArticleBuilderServices();

const { handlePatchHero, patchIsPending } = useApiServices();

const toast = useToast();

const thumbnail = computed({
    get: () => store.article.thumbnail,
    set: useDebounceFn((value: File) => {
        store.article.thumbnail = value;
        handlePatchHero({
            thumbnail: value,
        });
    }, 1000),
});

// methods

const handleUploadFile = async (selectedFile: File) => {
    const sizeInMB = selectedFile.size / (1024 * 1024);
    reset();
    if (sizeInMB > 10) {
        toast.add({
            title: "حجم فایل باید کمتر از ۱۰ مگابایت باشد",
            color: "error",
        });
        return;
    }
    thumbnail.value = selectedFile;
};

const { files, open, onChange, reset } = useFileDialog({
    accept: "image/*",
    directory: false,
    multiple: false,
});

onChange(() => {
    if (!files.value?.length) return;
    handleUploadFile(files.value[0]);
});
</script>

<template>
    <UButton
        label="آپلود بنر"
        variant="subtle"
        @click="open()"
        :loading="patchIsPending"
        :ui="{
            base: 'w-40 justify-center py-5',
        }"
    />
</template>

<style scoped></style>
