<script lang="ts" setup>
// imports

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices.client";

// types

type Props = {
    id: number;
    content: any;
};

// props

const props = defineProps<Props>();
const { id } = toRefs(props);

// state

const { getContent, getOptions, updateContent, updateContentOptions } = useArticleBuilderServices();

const contentValue = computed({
    get: () => getContent(id.value),
    set: (value) => updateContent(id.value, value),
});

const options = ref(getOptions(id.value));

// computed

const headingLevelOptions = computed({
    get: () => {
        return options.value!["level"];
    },
    set: (value) => {
        options.value!["level"] = value;
    },
});

const currentStyle = computed(() => {
    switch (headingLevelOptions.value) {
        case 1:
            return "text-3xl lg:text-4xl xl:text-5xl";
        case 2:
            return "text-2xl lg:text-3xl xl:text-4xl";
        case 3:
            return "text-xl lg:text-2xl xl:text-3xl";
        case 4:
            return "text-lg lg:text-xl xl:text-2xl";
        case 5:
            return "lg:text-lg xl:text-xl";
        case 6:
            return "text-sm lg:text-[1rem] xl:text-lg";
    }
});

// watch

watch(
    options,
    (nv) => {
        updateContentOptions(id.value, nv);
    },
    {
        deep: true,
    }
);

// life-cycle

onMounted(() => {
    options.value!["level"] = 1;
});
</script>

<template>
    <SectionsWrapper
        :id="id"
        title="عنوان"
    >
        <template #default>
            <UInput
                v-model="contentValue"
                variant="ghost"
                class="w-full font-semibold"
                placeholder="متن عنوان را وارد کنید"
                :ui="{ base: `!w-full ${currentStyle}` }"
                :class="{}"
            />
        </template>
        <template #settings>
            <UFormField label="سایز هدینگ">
                <USelectMenu
                    :default-value="3"
                    v-model="headingLevelOptions"
                    value-key="id"
                    :items="[
                        {
                            label: 'عنوان سایز ۱',
                            id: 1,
                        },
                        {
                            label: 'عنوان سایز ۲',
                            id: 2,
                        },
                        {
                            label: 'عنوان سایز ۳',
                            id: 3,
                        },
                        {
                            label: 'عنوان سایز ۴',
                            id: 4,
                        },
                        {
                            label: 'عنوان سایز ۵',
                            id: 5,
                        },
                        {
                            label: 'عنوان سایز ۶',
                            id: 6,
                        },
                    ]"
                    class="w-48"
                />
            </UFormField>
        </template>
    </SectionsWrapper>
</template>
