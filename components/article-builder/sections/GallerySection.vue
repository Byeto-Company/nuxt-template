<script lang="ts" setup>
// imports

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";
import { useDropZone, useFileDialog } from "@vueuse/core";
import useUploadFile from "~/composables/api/article-builder/useUploadFile";
import { useSortable } from "@vueuse/integrations/useSortable";

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

const el = useTemplateRef<HTMLElement>("el");

const { getContent, updateContent, getOptions } = useArticleBuilderServices();

// const options = ref(getOptions(id.value));

// queries

const { mutateAsync: uploadFile, isPending: uploadFileIsPending } = useUploadFile();

// computeds

const contentValue = computed<FileResponse[]>({
    get: () => getContent(id.value),
    set: (value) => {
        updateContent(id.value, value);
    },
});

useSortable(el, contentValue, {
    animation: 200,
    direction: "horizontal",
});

// const imageAltOptions = computed({
//     get: () => {
//         return options.value!["alt"];
//     },
//     set: (value) => {
//         options.value!["alt"] = value;
//     },
// });

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
                contentValue.value.push({ ...data });
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

const handleDeletedItem = (id: number) => {
    contentValue.value = contentValue.value.filter((item) => item.id !== id);
};

const onDrop = (files: File[] | null) => {
    if (!files || !files.length) return;
    handleUploadFile(files[0]);
};

const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop,
    dataTypes: ["image/*"],
    multiple: false,
    preventDefaultForUnhandled: false,
});

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
    <SectionsWrapper
        :id="id"
        title="گالری تصویر ( حداقل ۲ تصویر )"
        :contentElevation="false"
    >
        <template #default>
            <div
                class="relative w-full bg-neutral-800 text-neutral-400 flex-center flex-col-center text-center gap-5 rounded-xl border-neutral-700 border-dashed py-20 transition-all overflow-hidden"
                :class="{
                    '!bg-neutral-900 border-2': isOverDropZone,
                    border: !isOverDropZone,
                    '!py-12': contentValue.length > 0,
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
                    name="lucide:image"
                    class="text-[100px] text-neutral-400"
                />
                عکس خود را در اینجا رها کنید
                <br />
                یا انتخاب کنید

                <UButton
                    @click="open()"
                    size="lg"
                    class="z-3"
                    :loading="uploadFileIsPending"
                    :class="contentValue.length > 0 ? 'mt-3' : ''"
                >
                    افزودن عکس
                </UButton>

                <div
                    v-if="contentValue.length > 0"
                    ref="el"
                    class="w-full grid grid-cols-3 gap-5 px-5 mt-8"
                    dir="ltr"
                >
                    <ImagePreview
                        v-for="(image, index) in contentValue"
                        :key="index"
                        :src="image.file"
                        :id="image.id"
                        class="h-[16rem] border border-slate-200/20 rounded-2xl z-3"
                        @delete="handleDeletedItem"
                    >
                        <template #thumbnail>
                            <div class="w-full h-[16rem]">
                                <img
                                    class="size-full object-cover"
                                    :src="image.file"
                                />
                            </div> </template
                    ></ImagePreview>
                </div>
            </div>
        </template>
    </SectionsWrapper>
</template>
