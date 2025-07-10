<script lang="ts" setup>
// imports

import { QuillEditor } from "@vueup/vue-quill";
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

const { getContent, updateContent, getOptions } = useArticleBuilderServices();

const content_value = computed({
    get: () => getContent(id.value),
    set: (value) => updateContent(id.value, value),
});

const options = ref(getOptions(id.value));

// const headingLevelOptions = computed({
//     get: () => {
//         return options.value!["level"];
//     },
//     set: (value) => {
//         options.value!["level"] = value;
//     },
// });

// watch(
//     options,
//     (nv) => {
//         articleBuilderStore.updateContentOptions(id.value, nv);
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
        title="پاراگراف"
        :contentElevation="false"
        :type="content.content_type"
    >
        <template #default>
            <QuillEditor
                dir="ltr"
                v-model:content="content_value"
                contentType="html"
                class="!p-0 [&>.ql-editor>ul]:list-disc [&>.ql-editor>ol]:list-decimal [&>.ql-editor]:text-[1rem] [&>.ql-editor>ol>li]:before:!text-left [&>.ql-editor>ul>li]:before:!text-left [&>.ql-editor>ol>li.ql-align-right]:before:!text-right [&>.ql-editor>ul>li.ql-align-right]:before:!text-right"
                :toolbar="[
                    ['bold', 'italic', 'underline', 'link', { direction: 'rtl' }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['clean'],
                ]"
            />
        </template>
    </SectionsWrapper>
</template>

<style>
@import url("@vueup/vue-quill/dist/vue-quill.snow.css");

.ql-container {
    border: 1px solid var(--color-neutral-700) !important;
    border-style: dashed !important;
    background-color: hsla(0, 0%, 100%, 0.05);
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: var(--color-neutral-800) !important;
}

.ql-editor {
    min-height: 200px;
    padding: 16px;
}

.ql-toolbar {
    border: 1px solid var(--color-neutral-700) !important;
    border-style: dashed !important;
    background-color: hsla(0, 0%, 100%, 0.1);
    border-radius: 8px;
    margin-bottom: 20px;
    min-height: 40px;
    display: flex;
    gap: 5px;
    justify-content: start;
    align-items: center;
    background-color: var(--color-neutral-900) !important;
}

.ql-formats {
    margin: 0px !important;
}

.ql-formats {
    display: inline-flex;
    align-items: center;
    justify-content: start;
    gap: 5px;
}

.ql-formats button {
    width: 32px !important;
    height: 32px !important;
    padding: 5px !important;
    border-radius: 4px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.ql-formats button:hover {
    background: hsla(0, 0%, 50%, 0.2) !important;
}

.ql-formats button:hover .ql-stroke {
    fill: var(--color-neutral-900) !important;
}

.ql-formats button svg {
    /* filter: (1); */
}

.ql-active {
    background: hsla(0, 0%, 50%, 0.3) !important;
}

.ql-stroke {
    stroke: white !important;
    fill: var(--color-neutral-900) !important;
}

.ql-fill {
    fill: white !important;
}

.ql-snow.ql-toolbar button.ql-active .ql-stroke,
.ql-snow .ql-toolbar button.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
    stroke: white !important;
}

.ql-clipboard {
    display: none;
}

.ql-tooltip {
    background-color: var(--color-neutral-900) !important;
    color: white !important;
    padding: 8px 16px !important;
    border-radius: 5px !important;
    border: 1px solid var(--color-neutral-700) !important;
    box-shadow: none !important;
}

.ql-tooltip > input {
    border-radius: 3px !important;
}

.ql-tooltip > input:focus {
    outline: none;
    border: 1px solid var(--color-neutral-700) !important;
}

ol,
ul {
    padding: 0px !important;
}
</style>
