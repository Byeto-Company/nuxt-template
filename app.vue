<script setup>

// TODO implement complete network logs system ( showing all network requests ) OPTIONAL
// TODO create auth module with otp or credential ( it should have multiple approach )

import { VueQueryDevtools } from "@tanstack/vue-query-devtools";

</script>

<template>
    <div>
        <NuxtRouteAnnouncer />

        <NuxtLayout>
            <UApp>
                <NuxtPage />
            </UApp>
            <div dir="ltr">
                <VueQueryDevtools dir="ltr" buttonPosition="bottom-left" />
            </div>
        </NuxtLayout>
    </div>
</template>