<script setup lang="ts">
// import

import { helpers, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useAppParams } from "~/composables/global/useAppParams";
import useCreateParent from "~/composables/api/article-builder/useCreateParent";
import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";

// state

const { related_page, otp } = useAppParams();

const { clearData } = useArticleBuilderServices();

const router = useRouter();

// queries

const { mutateAsync: createParent, isPending: createParentIsPending } = useCreateParent();

// computeds

const main_title = ref("");

const isOpen = ref(true);

const formRules = computed(() => {
    return {
        main_title: {
            required: helpers.withMessage("عنوان اصلی اجباری می باشد", required),
            minLength: helpers.withMessage("عنوان اصلی حداقل ۳ کرکتر می باشد", minLength(3)),
        },
    };
});

const formValidator$ = useVuelidate(formRules, { main_title });

// methods

const handleSubmit = async () => {
    await formValidator$.value.$validate();
    if (!formValidator$.value.$errors.length) {
        createParent(
            {
                title: main_title.value,
                related_page: related_page.value ?? "",
            },
            {
                onSuccess: (data) => {
                    clearData();
                    router.replace({
                        name: "article-builder-update",
                        query: {
                            otp: otp.value,
                            parent_id: data.id,
                            parent_title: data.title,
                            slug: data.slug_fa,
                        },
                    });
                },
            }
        );
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
                        عنوان اصلی مقاله
                    </label>
                    <UInput
                        id="title"
                        size="xl"
                        v-model="main_title"
                        :color="formValidator$.main_title.$error ? 'error' : 'primary'"
                    />
                    <UBadge
                        v-if="formValidator$.main_title.$error"
                        class="w-full py-2 mt-1"
                        color="error"
                        variant="subtle"
                    >
                        {{ formValidator$.main_title.$errors[0].$message }}
                    </UBadge>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="w-full flex justify-end items-center">
                <UButton
                    label="ثبت"
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
