<script lang="ts" setup></script>

<template>
    <div class="w-full flex flex-col gap-5 container border-b-2 border-neutral-800 py-9 relative">
        <ArticleThumbnail />
        <div class="w-full flex items-center justify-between">
            <ArticleMainTitle />
            <div class="w-max flex items-center justify-start gap-5">
                <ArticleLanguages />
            </div>
        </div>
        <div class="w-full flex flex-col gap-5">
            <div class="w-full flex items-center justify-between gap-5">
                <ArticleTitle />
                <ArticleUploadThumbnail />
                <ArticleDeleteThumbnail />
            </div>
            <ArticleSummary />
        </div>
    </div>
</template>
