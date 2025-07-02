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

const contentValue = computed({
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
    >
        <template #default>
            <QuillEditor
                v-model:content="contentValue"
                contentType="html"
                class="!p-0 [&>.ql-editor>ul]:list-disc [&>.ql-editor>ol]:list-decimal [&>.ql-editor>ol>li.ql-direction-rtl]:ms-4 [&>.ql-editor>ol>li]:ms-4 [&>.ql-editor>ul>li.ql-direction-rtl]:ms-4 [&>.ql-editor>ul>li]:ms-4 [&>.ql-editor>p>a]:underline [&>.ql-editor>p>a]:text-cyan-400"
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
    padding: 8px;
    align-items: center;
    background-color: var(--color-neutral-900) !important;
}

.ql-formats {
    display: inline-flex;
    align-items: center;
    justify-content: start;
    gap: 5px;
}

.ql-formats button {
    width: 35px;
    height: 35px;
    padding: 5px;
    border-radius: 4px !important;
    display: flex;
    align-items: center;
    justify-content: center;
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

.ql-clipboard,
.ql-tooltip {
    display: none;
}

button[value="bullet"] > svg {
    transform: translateX(-2px);
}

.ql-direction-rtl {
    direction: ltr !important;
    text-align: left;
}
</style>
