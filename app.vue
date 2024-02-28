<script setup lang="ts">
const title: string = "Moe Ayoub - MoviesApp";
const description: string = "This is a collection of movies and trailers. Built by Moe Ayoub with Nuxt";

useMeta(title, description, undefined, true);
const mode = useColorMode();
</script>
<template>
    <NuxtLoadingIndicator :color="mode.value == 'dark' ? '#FF4000' : '#5F0F40'" />
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
