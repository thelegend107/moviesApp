<script lang="ts" setup>
interface HeroSection {
    headline: string,
    subhead: string
}

withDefaults(defineProps<HeroSection>(), {
    headline: "Embark on a Cinematic Journey",
    subhead: "Start Exploring Now"
})
</script>

<template>
    <div class="sm:h-64 p-6 w-full flex flex-col items-center justify-center bg-gradient-to-b from-primary to-secondaryDark shadow-inner shadow-black select-none">
        <h1 class="text-2xl font-light sm:text-6xl sm:font-extralight text-black mb-4">
            {{ headline }}
        </h1>
        <h2 class="text-base sm:text-lg font-medium text-zinc-200">
            {{ subhead }}
        </h2>
    </div>
</template>