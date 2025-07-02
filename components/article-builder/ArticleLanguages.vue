<script setup lang="ts">
// imports

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const { store, clearData } = useArticleBuilderServices();

const confirmChangingIsOpen = ref(false);

const items: Language[] = [
    { label: "English", code: "en", icon: "circle-flags:us" },
    { label: "العربية", code: "ar", icon: "circle-flags:ae" },
    { label: "فارسی", code: "fa", icon: "circle-flags:ir" },
];

const currentTab = ref(0);
const previousTab = ref(currentTab.value);
const pendingTab = ref<number | null>(null);

const onTabClick = (index: number) => {
    if (index === currentTab.value) return;

    pendingTab.value = index;
    confirmChangingIsOpen.value = true;
};

const confirmChange = () => {
    previousTab.value = currentTab.value;
    currentTab.value = pendingTab.value!;
    store.setCurrentLanguage(items[currentTab.value]);
    confirmChangingIsOpen.value = false;
    pendingTab.value = null;
    clearData();
};

const cancelChange = () => {
    pendingTab.value = null;
    confirmChangingIsOpen.value = false;
};

// watch

watch(
    () => store.currentLanguage?.code,
    (newCode) => {
        const idx = items.findIndex((i) => i.code === newCode);
        currentTab.value = idx !== -1 ? idx : 0;
    },
    { immediate: true }
);
</script>

<template>
    <UTabs
        :items="items"
        class="w-[20rem]"
        :model-value="currentTab.toString()"
        :content="false"
        @update:model-value="(value: any) => onTabClick(value)"
    />

    <UModal
        v-model:open="confirmChangingIsOpen"
        class="persian-number font-iran-yekan-x"
        close-icon="lucide:x"
        :dismissible="false"
        :close="false"
    >
        <template #title>
            <span class="flex items-center justify-start text-lg gap-2">
                <UIcon
                    name="lucide:triangle-alert"
                    class="text-lg mb-0.5 text-red-500"
                />
                هشدار
            </span>
        </template>

        <template #body>
            <div class="w-full flex flex-col gap-3 text-sm">
                <p>لطفا قبل از تغییر زبان موارد زبان قبلی را ذخیره کنید</p>
                <p>در صورت ذخیره نشدن موارد قبلی قابل بازگشت نیستند.</p>
            </div>
        </template>

        <template #footer>
            <div class="w-full flex justify-end items-center gap-4">
                <UButton
                    label="بازگشت"
                    variant="subtle"
                    size="md"
                    trailing-icon="lucide:x"
                    @click="cancelChange"
                />
                <UButton
                    label="ذخیره و تغییر زبان"
                    variant="solid"
                    size="md"
                    trailing-icon="lucide:save"
                    @click="confirmChange"
                />
            </div>
        </template>
    </UModal>
</template>
