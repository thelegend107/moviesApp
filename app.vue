<script setup lang="ts">
const title: string = "Moe Ayoub - MoviesApp";
const description: string = "This is a collection of movies and trailers. Built by Moe Ayoub with Nuxt";

useMeta(title, description, undefined, true);
</script>
<template>
    <NuxtLayout>
        <template #header>
            <MainHeader />
        </template>
        <template #main>
            <NuxtPage class="h-full w-full" />
        </template>
        <template #footer>
            Moe Ayoub
        </template>
    </NuxtLayout>
</template>
