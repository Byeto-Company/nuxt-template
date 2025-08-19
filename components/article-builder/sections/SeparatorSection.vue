<script setup lang="ts">
// types

type Props = {
    id: number;
    content: any;
};

// props

const props = defineProps<Props>();
const { id } = toRefs(props);
</script>

<template>
    <SectionsWrapper
        :id="id"
        title="جدا کننده"
        :contentElevation="false"
        :type="content.content_type"
    />
</template>

<style scoped></style>
