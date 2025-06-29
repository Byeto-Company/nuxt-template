<script setup lang="ts">
// import

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices.client";
import { helpers, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

// state

const { store } = useArticleBuilderServices();

const mainTitle = ref("");

const hasMainTitle = computed(() => !!store.main_title && store.main_title.length > 0);

const isOpen = computed(() => (!hasMainTitle.value ? true : false));

// computeds

const formRules = computed(() => {
    return {
        mainTitle: {
            required: helpers.withMessage("عنوان اصلی اجباری می باشد", required),
            minLength: helpers.withMessage("عنوان اصلی حداقل ۳ کرکتر می باشد", minLength(3)),
        },
    };
});

const formValidator$ = useVuelidate(formRules, { mainTitle });

// methods

const handleSubmit = async () => {
    await formValidator$.value.$validate();
    if (!formValidator$.value.$errors.length) {
        store.setMainTitle(mainTitle.value);
        isOpen.value = false;
    }
};
</script>

<template>
    <UModal
        v-model:open="isOpen"
        title="لطفا عنوان اصلی مقاله را وارد کنید"
        class="persian-number font-iran-yekan-x"
        close-icon="lucide:x"
        :dismissible="hasMainTitle"
        :close="hasMainTitle"
    >
        <template #body>
            <div class="w-full flex flex-col gap-3">
                <label
                    for="main-title"
                    class="text-sm w-max"
                >
                    عنوان اصلی
                </label>
                <UInput
                    id="main-title"
                    size="xl"
                    v-model="mainTitle"
                    :color="formValidator$.mainTitle.$error ? 'error' : 'primary'"
                />
                <UBadge
                    v-if="formValidator$.mainTitle.$error"
                    class="w-full py-2 mt-1"
                    color="error"
                    variant="subtle"
                >
                    {{ formValidator$.mainTitle.$errors[0].$message }}
                </UBadge>
            </div>
        </template>

        <template #footer>
            <div class="w-full flex justify-end items-center">
                <UButton
                    label="ثبت"
                    variant="subtle"
                    size="lg"
                    :ui="{
                        base: 'px-4',
                    }"
                    @click="handleSubmit"
                />
            </div>
        </template>
    </UModal>
</template>

<style scoped></style>
