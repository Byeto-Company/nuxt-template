<script lang="ts" setup>
// imports

import ActionButton from "../private/components/article-builder/ActionButton.vue";
import ArticleHero from "../private/components/article-builder/ArticleHero.vue";
import ArticleRenderer from "../private/components/article-builder/ArticleRenderer.vue";
import ArticleRequiredFieldsModal from "../private/components/article-builder/ArticleRequiredFieldsModal.vue";
import useGetToken from "../private/composables/api/auth/useGetToken";
import useAppServices from "../stores/services/useAppServices";

// state

const { store, clearTokens } = useAppServices();

// queries

const route = useRoute();

definePageMeta({
    layout : "default",
    validate: (route) => {
        if (route.query["otp"] == "" || !route.query.hasOwnProperty("otp")) {
            // throw createError({
            //     status: 404,
            //     message: "No Token Found",
            // });
            return false
        }

        return true
    },
});

const { data: token, isSuccess, isError, error, suspense } = useGetToken();

await suspense();

// watch

watch(
    isSuccess,
    () => {
        store.setToken(token.value?.access!);
        store.setRefreshToken(token.value?.refresh!);
    },
    {
        immediate: true,
    }
);

watch(
    () => isError.value,
    (nv) => {
        //@ts-ignore
        if (nv && store.token != "" && "response" in error.value && error.value.response["status"] == 404) {
            clearTokens();
            throw createError({
                status: 404,
                message: "Your token is invalid",
            });
        }
    },
    { immediate: true }
);

// lifecycle

// onMounted(() => {
//     if (route.query["otp"] == "" || !route.query.hasOwnProperty("otp")) {
//         throw createError({
//             status: 404,
//             message: "No Token Found",
//         });
//     }
// });
</script>

<template>
    <div class="container px-0 min-h-screen border-x-2 border-neutral-800">
        <ArticleRequiredFieldsModal />
        <ArticleHero />
        <ClientOnly>
            <ArticleRenderer />
        </ClientOnly>
    </div>
    <ActionButton />
</template>
