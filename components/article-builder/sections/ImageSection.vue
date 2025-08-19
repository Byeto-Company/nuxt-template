<script lang="ts" setup>
// imports

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";
import { useDropZone, useFileDialog } from "@vueuse/core";
import useUploadFile from "~/composables/api/article-builder/useUploadFile";

// types

type Props = {
    id: number;
    content: ArticleSection;
};

// props

const props = defineProps<Props>();
const { id } = toRefs(props);

// state

const dropZoneRef = ref<HTMLDivElement>();

const toast = useToast();

const uploadProgress = ref(0);

const { getContent, updateContent, getOptions } = useArticleBuilderServices();

const options = ref(getOptions(id.value));

// queries

const { mutateAsync: uploadFile, isPending: uploadFileIsPending } = useUploadFile();

// computeds

const content_value = computed<FileResponse>({
    get: () => getContent(id.value),
    set: (value) => {
        updateContent(id.value, value);
    },
});

const imageAltOptions = computed({
    get: () => {
        return options.value!["alt"];
    },
    set: (value) => {
        options.value!["alt"] = value;
    },
});

// methods

const handleUploadFile = async (selectedFile: File) => {
    const sizeInMB = selectedFile.size / (1024 * 1024);
    if (sizeInMB > 30) {
        toast.add({
            title: "حجم فایل باید کمتر از ۳۰ مگابایت باشد",
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
        title="تصویر"
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

                <ImagePreview
                    v-if="!!content_value"
                    :src="content_value.file"
                    class="!w-2/3 h-[30rem] border border-slate-200/20 rounded-2xl z-3"
                >
                    <template #thumbnail>
                        <div class="w-full h-[30rem]">
                            <img
                                class="size-full object-cover"
                                :src="content_value.file"
                            />
                        </div>
                    </template>
                </ImagePreview>

                <template v-else>
                    <UIcon
                        name="lucide:image"
                        class="text-[100px] text-neutral-400"
                    />
                    عکس خود را در اینجا رها کنید
                    <br />
                    یا انتخاب کنید
                </template>

                <UButton
                    @click="open()"
                    size="lg"
                    class="z-3"
                    :loading="uploadFileIsPending"
                    :class="!!content_value ? 'mt-3' : ''"
                >
                    {{ !!content_value ? "تغییر عکس" : "انتخاب کنید" }}
                </UButton>
            </div>
        </template>
        <template
            #settings
            v-if="!!content_value"
        >
            <UFormField label="عنوان عکس">
                <UInput
                    v-model="imageAltOptions"
                    size="lg"
                    class="w-full mt-2"
                />
            </UFormField>
        </template>
    </SectionsWrapper>
</template>
