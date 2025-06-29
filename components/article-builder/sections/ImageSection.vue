<script lang="ts" setup>
// imports

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices.client";
import { useDropZone, useFileDialog } from "@vueuse/core";

// types

type Props = {
    id: number;
    content: any;
};

// props

const props = defineProps<Props>();
const { id } = toRefs(props);

// state

const dropZoneRef = ref<HTMLDivElement>();

function handleFile(selectedFile: File) {
    const sizeInMB = selectedFile.size / (1024 * 1024);
    if (sizeInMB > 10) {
        console.error("File size exceeds 10MB limit.");
        return;
    }
    contentValue.value = selectedFile;
}

function onDrop(files: File[] | null) {
    if (!files || !files.length) return;
    handleFile(files[0]);
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop,
    dataTypes: ["image/*"],
    multiple: false,
    preventDefaultForUnhandled: false,
});

const { files, open, onChange } = useFileDialog({
    accept: "image/*",
    directory: false,
    multiple: false,
});

const { getContent, updateContent, getOptions } = useArticleBuilderServices();

const contentValue = computed({
    get: () => getContent(id.value),
    set: (value) => updateContent(id.value, value),
});

const options = ref(getOptions(id.value));

onChange(() => {
    if (!files.value?.length) return;
    handleFile(files.value[0]);
});
</script>

<template>
    <SectionsWrapper
        :id="id"
        title="تصویر"
        :contentElevation="false"
    >
        <template #default>
            <div
                class="w-full bg-neutral-800 text-neutral-400 flex-center flex-col-center text-center gap-4 rounded-xl border-neutral-700 py-20 border-dashed transition-all"
                :class="isOverDropZone ? '!bg-neutral-900 border-2' : 'border'"
                ref="dropZoneRef"
            >
                <UIcon
                    name="lucide:image"
                    class="text-[100px] text-neutral-400"
                />
                عکس خود را در اینجا رها کنید
                <br />
                یا انتخاب کنید
                <UButton
                    @click="open()"
                    size="lg"
                >
                    انتخاب کنید
                </UButton>
            </div>
        </template>
    </SectionsWrapper>
</template>
