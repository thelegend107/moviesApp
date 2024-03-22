<script setup lang="ts">
const title: string = "Moe Ayoub - MoviesApp";
const description: string = "This is a collection of movies and trailers. Built by Moe Ayoub with Nuxt, TypeScript & Tailwind";

useMeta(title, description, undefined, true);
const mode = useColorMode();
</script>

<template>
    <NuxtLoadingIndicator :color="mode.value == 'dark' ? '#FF4000' : '#8B1D37'" />
    <NuxtLayout>
        <template #header>
            <MainHeader />
        </template>

        <template #main>
            <NuxtPage class="h-full w-full" />
        </template>

        <template #footer>
            <MainFooter />
        </template>
    </NuxtLayout>
</template>
