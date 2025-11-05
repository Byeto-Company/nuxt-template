<script lang="ts" setup>

// state

const nuxtApp = useNuxtApp();
const isLoading = ref(false);

// hook

nuxtApp.hook("page:start", () => {
    isLoading.value = true;
});

nuxtApp.hook("page:finish", () => {
    isLoading.value = false;
});

</script>

<template>
    <Transition name="fade">
        <div
            v-if="isLoading"
            class="h-[20px] flex items-center justify-center bg-black w-full left-0 top-0 fixed z-100"
        >
            <div class="absolute progress-indicator w-1/3 bg-white h-1 rounded-full"></div>
        </div>
    </Transition>
</template>

<style>

.progress-indicator {
    animation-name: progress;
    animation-duration: 0.65s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

@keyframes progress {
    0% {
        left: -50%;
    }

    100% {
        left: 110%;
    }
}
</style>