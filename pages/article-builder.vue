<template>
    <div class="container min-h-screen border-x-2 border-neutral-800 py-12">
        <ArticleTitle />
        <ClientOnly>
            <RenderSections />
        </ClientOnly>
    </div>
    <ActionButton />
</template>
