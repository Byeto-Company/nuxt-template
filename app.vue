<script setup>
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />

        <NuxtLayout>
            <NuxtPage />
            <div dir="ltr">
                <VueQueryDevtools dir="ltr" buttonPosition="bottom-left" />
            </div>
        </NuxtLayout>
    </div>
</template>