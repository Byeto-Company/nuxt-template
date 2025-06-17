<script lang="ts" setup>

// type2

type Props = {
    id: number;
    content: any;
};

// props

const props = defineProps<Props>();
const { id } = toRefs(props);

// state

const articleBuilderStore = useArticleBuilderStore();

const contentValue = computed({
    get: () => articleBuilderStore.getContent(id.value),
    set: (value) => articleBuilderStore.updateContent(id.value, value),
});

const options = ref(articleBuilderStore.getOptions(id.value));

const headingLevelOptions = computed({
    get: () => {
        return options.value!["level"];
    },
    set: (value) => {
        options.value!["level"] = value;
    },
});

watch(
    options,
    (nv) => {
        articleBuilderStore.updateContentOptions(id.value, nv);
    },
    {
        deep: true,
    }
);

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
            <div class="p-4">
                <input
                    v-model="contentValue"
                    class="w-fit max-w-fit min-w-fit outline-none"
                    placeholder="متن عنوان را وارد کنید"
                    :class="{
                        'text-xl': options!.level === 6,
                        'text-2xl': options!.level === 5,
                        'text-3xl': options!.level === 4,
                        'text-4xl': options!.level === 3,
                        'text-5xl': options!.level === 2,
                        'text-6xl': options!.level === 1,
                    }"
                />
            </div>
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
