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
