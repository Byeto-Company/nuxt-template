<script lang="ts" setup>
// imports

import useArticleBuilderServices from "../../../../stores/services/useArticleBuilderServices";
import { useDropZone, useFileDialog } from "@vueuse/core";
import useUploadFile from "../../../composables/api/article-builder/useUploadFile";
import SectionsWrapper from "../SectionsWrapper.vue";

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

const content_value = computed<FileResponse>({
    get: () => getContent(id.value),
    set: (value) => {
        console.log(value);
        updateContent(id.value, value);
    },
});

const options = ref(getOptions(id.value));

// methods

const handleFile = async (selectedFile: File) => {
    const sizeInMB = selectedFile.size / (1024 * 1024);
    if (sizeInMB > 50) {
        toast.add({
            title: "حجم فایل باید کمتر از ۵۰ مگابایت باشد",
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
                content_value.value = { ...data };
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
    handleFile(files[0]);
};

const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop,
    dataTypes: ["video/*"],
    multiple: false,
    preventDefaultForUnhandled: false,
});

const { files, open, onChange, reset } = useFileDialog({
    accept: "video/*",
    directory: false,
    multiple: false,
});

onChange(() => {
    if (!files.value?.length) return;
    handleFile(files.value[0]);
});
</script>

<template>
    <SectionsWrapper
        :id="id"
        title="ویدیو"
        :contentElevation="false"
        :type="content.content_type"
    >
        <template #default>
            <div
                class="relative w-full bg-neutral-800 text-neutral-400 flex-center flex-col-center text-center gap-5 rounded-xl border-neutral-700 border-dashed py-20 transition-all overflow-hidden"
                :class="{
                    '!bg-neutral-900 border-2': isOverDropZone,
                    border: !isOverDropZone,
                    '!py-12': !!content_value,
                }"
                ref="dropZoneRef"
            >
                <div
                    class="absolute inset-0 bg-primary-500/15 z-1 transition-all"
                    :style="{
                        width: `${uploadProgress}%`,
                    }"
                />

                <video
                    v-if="!!content_value"
                    :src="content_value.file"
                    controls
                    class="w-2/3 rounded-2xl z-3 border border-slate-200/20 h-[14rem] sm:h-[20rem] lg:h-[35rem]"
                ></video>

                <template v-else>
                    <UIcon
                        name="lucide:video"
                        class="text-[100px] text-neutral-400"
                    />
                    ویدیو خود را در اینجا رها کنید
                    <br />
                    یا انتخاب کنید
                </template>

                <UButton
                    @click="open()"
                    size="lg"
                    class="z-3"
                    :loading="uploadFileIsPending"
                    :class="!!content_value ? 'mt-4' : ''"
                >
                    {{ !!content_value ? "تغییر ویدیو" : "انتخاب کنید" }}
                </UButton>
            </div>
        </template>
    </SectionsWrapper>
</template>
