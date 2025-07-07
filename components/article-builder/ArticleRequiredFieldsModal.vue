<script setup lang="ts">
// import

import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";
import { helpers, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

// state

const { store } = useArticleBuilderServices();

// computeds

const title = computed({
    get: () => store.article.title,
    set: useDebounceFn((value: string) => {
        store.article.title = value;
    }, 1000),
});

const summary = computed({
    get: () => store.article.summary,
    set: useDebounceFn((value: string) => {
        store.article.summary = value;
    }, 1000),
});

const fakeTitle = ref(title.value);
const fakeSummary = ref(summary.value);

const isOpen = computed(() => title.value.length == 0 || summary.value.length == 0);

const formRules = computed(() => {
    return {
        fakeTitle: {
            required: helpers.withMessage("عنوان مقاله اجباری می باشد", required),
            minLength: helpers.withMessage("عنوان مقاله حداقل ۳ کرکتر می باشد", minLength(3)),
        },
        fakeSummary: {
            required: helpers.withMessage("توضیحات مقاله اجباری می باشد", required),
            minLength: helpers.withMessage("توضیحات مقاله حداقل ۵ کرکتر می باشد", minLength(5)),
        },
    };
});

const formValidator$ = useVuelidate(formRules, { fakeTitle, fakeSummary });

// methods

const handleSubmit = async () => {
    await formValidator$.value.$validate();
    if (!formValidator$.value.$errors.length) {
        title.value = fakeTitle.value;
        summary.value = fakeSummary.value;
    }
};
</script>

<template>
    <UModal
        v-model:open="isOpen"
        title="لطفا عنوان اصلی مقاله را وارد کنید"
        class="persian-number font-iran-yekan-x"
        close-icon="lucide:x"
        :dismissible="false"
        :close="false"
    >
        <template #body>
            <div class="w-full flex flex-col gap-5">
                <div class="w-full flex flex-col gap-3">
                    <label
                        for="title"
                        class="text-sm w-max"
                    >
                        عنوان مقاله
                    </label>
                    <UInput
                        id="title"
                        size="xl"
                        v-model="fakeTitle"
                        :color="formValidator$.fakeTitle.$error ? 'error' : 'primary'"
                    />
                    <UBadge
                        v-if="formValidator$.fakeTitle.$error"
                        class="w-full py-2 mt-1"
                        color="error"
                        variant="subtle"
                    >
                        {{ formValidator$.fakeTitle.$errors[0].$message }}
                    </UBadge>
                </div>

                <div class="w-full flex flex-col gap-3">
                    <label
                        for="summary"
                        class="text-sm w-max"
                    >
                        توضیحات مقاله
                    </label>
                    <UTextarea
                        id="summary"
                        size="xl"
                        v-model="fakeSummary"
                        :color="formValidator$.fakeSummary.$error ? 'error' : 'primary'"
                        class="!resize-none"
                    />
                    <UBadge
                        v-if="formValidator$.fakeSummary.$error"
                        class="w-full py-2 mt-1"
                        color="error"
                        variant="subtle"
                    >
                        {{ formValidator$.fakeSummary.$errors[0].$message }}
                    </UBadge>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="w-full flex justify-end items-center">
                <UButton
                    label="ثبت تغییرات"
                    variant="subtle"
                    trailing-icon="lucide:save"
                    size="lg"
                    :block="true"
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
