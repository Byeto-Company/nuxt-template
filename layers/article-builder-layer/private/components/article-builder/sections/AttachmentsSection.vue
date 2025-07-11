<script lang="ts" setup>
// imports

import useArticleBuilderServices from "../../../../stores/services/useArticleBuilderServices";
import { useDropZone, useFileDialog } from "@vueuse/core";
import useUploadFile from "../../../composables/api/article-builder/useUploadFile";
import SectionsWrapper from "../SectionsWrapper.vue";
import Attachment from "../../Attachment.vue";

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

const toast = useToast();

const uploadProgress = ref(0);

const { getContent, updateContent, getOptions } = useArticleBuilderServices();

// queries

const { mutateAsync: uploadFile, isPending: uploadFileIsPending } = useUploadFile();

// computeds

const content_value = computed<FileResponse[]>({
    get: () => getContent(id.value),
    set: (value) => {
        updateContent(id.value, value);
    },
});

const options = ref(getOptions(id.value));

// methods

const handleUploadFile = async (selectedFile: File) => {
    const sizeInMB = selectedFile.size / (1024 * 1024);
    if (sizeInMB > 10) {
        toast.add({
            title: "حجم فایل باید کمتر از ۱۰ مگابایت باشد",
            color: "error",
        });
        return;
    }
    await uploadFile(
        {
            file: selectedFile,
            onProgress: (p) => {
                uploadProgress.value = p;
            },
        },
        {
            onSuccess: (data: FileResponse) => {
                content_value.value.push({ ...data });
            },
            onError: () => {
                toast.add({
                    title: "خطایی در آپلود فایل رخ داد",
                    color: "error",
                });
            },
            onSettled: () => {
                uploadProgress.value = 0;
                reset();
            },
        }
    );
};

const onDrop = (files: File[] | null) => {
    if (!files || !files.length) return;
    handleUploadFile(files[0]);
};

const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop,
    dataTypes: ["**/*"],
    multiple: false,
    preventDefaultForUnhandled: false,
});

const { files, open, onChange, reset } = useFileDialog({
    accept: "**/*",
    directory: false,
    multiple: false,
});

onChange(() => {
    if (!files.value?.length) return;
    handleUploadFile(files.value[0]);
});
</script>

<template>
    <SectionsWrapper
        :id="id"
        title="فایل یا ضمیمه"
        :contentElevation="false"
        :type="content.content_type"
    >
        <template #default>
            <div
                class="relative w-full bg-neutral-800 text-neutral-400 flex-center flex-col-center text-center gap-5 rounded-xl border-neutral-700 border-dashed py-20 transition-all overflow-hidden"
                :class="{
                    '!bg-neutral-900 border-2': isOverDropZone,
                    border: !isOverDropZone,
                    '!py-12': content_value.length > 0,
                }"
                ref="dropZoneRef"
            >
                <div
                    class="absolute inset-0 bg-primary-500/15 z-1 transition-all"
                    :style="{
                        width: `${uploadProgress}%`,
                    }"
                />

                <UIcon
                    name="lucide:paperclip"
                    class="text-[100px] text-neutral-400"
                />
                فایل خود را در اینجا رها کنید
                <br />
                یا انتخاب کنید

                <UButton
                    @click="open()"
                    size="lg"
                    class="z-3"
                    :loading="uploadFileIsPending"
                    :class="content_value.length > 0 ? 'mt-3' : ''"
                >
                    افزودن ضمیمه
                </UButton>

                <div
                    v-if="content_value.length > 0"
                    class="w-full grid grid-cols-4 gap-5 px-5 mt-8"
                >
                    <Attachment
                        v-for="(attachment, index) in content_value"
                        :key="index"
                        :data="attachment"
                    />
                </div>
            </div>
        </template>
    </SectionsWrapper>
</template>
