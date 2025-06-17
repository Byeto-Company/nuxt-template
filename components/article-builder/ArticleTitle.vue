<script lang="ts" setup>
const store = useArticleBuilderStore();

const title = computed({
    get: () => store.title,
    set: (value: string) => store.setTitle(value),
});
</script>

<template>
    <div class="w-full">
        <input class="text-white text-5xl outline-none border-none w-full" v-model="title" placeholder="عنوان مقاله" />
    </div>
</template>
