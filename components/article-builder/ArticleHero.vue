<script lang="ts" setup>
// imports

import usePatchHero from "~/composables/api/article-builder/usePatchHero";
import { useAppParams } from "~/composables/global/useAppParams";
import { useTrackChanges } from "~/composables/global/useObjectTrack";
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const { store } = useArticleBuilderServices();

const route = useRoute();

const toast = useToast();

const { slug } = useAppParams();

// queries

const { mutateAsync: patchHero, isPending: patchIsPending } = usePatchHero();

// computed

const main_title = computed({
    get: () => store.main_title,
    set: (value: string) => (store.main_title = value),
});

const thumbnail = computed({
    get: () => store.article.thumbnail,
    set: (value: File | null) => (store.article.thumbnail = value),
});

const title = computed({
    get: () => store.article.title,
    set: (value: string) => (store.article.title = value),
});

const summary = computed({
    get: () => store.article.summary,
    set: (value: string) => (store.article.summary = value),
});

const isPublished = computed({
    get: () => store.article.is_publish,
    set: (value: boolean) => (store.article.is_publish = value),
});

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

// watch

watch(
    () => route.query,
    (nv) => {
        main_title.value = nv.parent_title as any;
    },
    {
        immediate: true,
    }
);

const { changedFields, reset: resetTracking } = useTrackChanges(store.article, ["contents", "id"]);

const { ignoreUpdates } = watchIgnorable(
    () => changedFields.value,
    useDebounceFn(() => {
        patchHero(
            { ...changedFields.value, slug: slug.value },
            {
                onSuccess: (data) => {
                    toast.add({
                        title: "تغییرات عنوان با موفقیت ثبت شد",
                        color: "success",
                    });
                    if (!slug.value) {
                        slug.value = data.slug;
                    }
                    ignoreUpdates(() => {
                        Object.assign(store.article, data);
                        resetTracking();
                    });
                },
                onError: () => {
                    toast.add({
                        title: "خطایی در تغییرات عنوان پیش آمد",
                        description: "لطفا مجدد تلاش کنید",
                        color: "error",
                    });
                    resetTracking();
                },
            }
        );
    }, 1000),
    { deep: true }
);
</script>

<template>
    <div class="w-full flex flex-col gap-5 container border-b-2 border-neutral-800 py-9 relative">
        <div
            class="absolute inset-0 bg-cover bg-no-repeat opacity-4 -z-1"
            :style="{
                backgroundImage: `url(${store.article.thumbnail})`,
            }"
        ></div>
        <div class="w-full flex items-center justify-between">
            <h1 class="text-2xl font-semibold">عنوان اصلی : {{ store.main_title }}</h1>
            <div class="w-max flex items-center justify-start gap-5">
                <USwitch
                    label="منتشر شده"
                    v-model="isPublished"
                    class="pt-1"
                />
                <ArticleLanguages @change="resetTracking" />
            </div>
        </div>
        <div class="w-full flex flex-col gap-5">
            <div class="w-full flex items-center justify-between gap-5">
                <UInput
                    class="w-full"
                    v-model="title"
                    placeholder="عنوان مقاله"
                    variant="outline"
                    :ui="{
                        base: 'text-2xl p-3.5',
                    }"
                />
                <UButton
                    label="حذف بنر"
                    variant="subtle"
                    :loading="patchIsPending"
                    :disabled="store.article.thumbnail == null"
                    color="error"
                    @click="thumbnail = null"
                    :ui="{
                        base: 'w-40 justify-center py-5',
                    }"
                />
                <UButton
                    label="آپلود بنر"
                    variant="subtle"
                    @click="open()"
                    :loading="patchIsPending"
                    :ui="{
                        base: 'w-40 justify-center py-5',
                    }"
                />
            </div>
            <UTextarea
                class="w-full"
                v-model="summary"
                placeholder="توضیحات مقاله"
                :ui="{
                    base: 'text-lg p-3.5 resize-none !ring-neutral-700/70',
                }"
            />
        </div>
    </div>
</template>
