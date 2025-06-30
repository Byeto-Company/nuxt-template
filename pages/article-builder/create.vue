<template>
    <div class="container px-0 min-h-screen border-x-2 border-neutral-800 py-9">
        <!-- <ArticleMainTitleModal /> -->
        <ArticleHero />
        <ClientOnly>
            <ArticleRenderer />
        </ClientOnly>
    </div>
    <ActionButton />
</template>
