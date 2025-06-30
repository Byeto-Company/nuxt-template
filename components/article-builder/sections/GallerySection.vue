<script lang="ts" setup>
// imports

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

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

function onDrop(files: File[] | null) {
    console.log(files);
    // called when files are dropped on zone
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop,
    dataTypes: ["image/*"],
    multiple: false,
    preventDefaultForUnhandled: false,
});

const { files, open, reset, onCancel, onChange } = useFileDialog({
    accept: "image/*", // Set to accept only image files
    directory: false, // Select directories instead of files if set true
    multiple: false,
});

const { getContent, updateContent, getOptions } = useArticleBuilderServices();

const contentValue = computed({
    get: () => getContent(id.value),
    set: (value) => updateContent(id.value, value),
});

const options = ref(getOptions(id.value));

// watch(
//     options,
//     (nv) => {
//         updateContentOptions(id.value, nv);
//     },
//     {
//         deep: true,
//     }
// );

// onMounted(() => {
//     options.value!["level"] = 1;
// });
</script>

<template>
    <SectionsWrapper
        :id="id"
        title="گالری تصویر"
        :contentElevation="false"
    >
        <template #default>
            <div
                class="w-full bg-neutral-500/10 text-neutral-400 flex-center flex-col-center text-center gap-4 rounded-xl border-neutral-700 border py-20 border-dashed"
                :class="isOverDropZone ? '!bg-red-500' : ''"
                ref="dropZoneRef"
            >
                <UIcon
                    name="lucide:image"
                    class="text-[100px] text-neutral-400"
                />
                عکس خود را در اینجا رها کنید
                <br />
                یا انتخاب کنید
                {{ files }}
                <UButton
                    @click="() => open()"
                    size="lg"
                >
                    انتخاب کنید
                </UButton>
            </div>
        </template>
    </SectionsWrapper>
</template>
