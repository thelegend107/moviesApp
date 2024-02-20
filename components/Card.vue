<script setup lang="ts">
export interface Card {
    imagePath: string,
    name: string,
    type: 'media' | 'person'
}

withDefaults(defineProps<Card>(), {
    type: 'media'
});
</script>
<template>
    <div class="flex flex-col bg-white dark:bg-neutral-900 rounded-md shadow-md shadow-neutral-400 dark:shadow-black">
        <div class="w-48 border-b-4 border-b-secondary dark:border-b-primary">
            <NuxtImg v-if="type == 'media'" class="rounded-t-md h-72 w-full" :src="tmdbImage(imagePath, TmdbPosterSizes.md)" />
            <NuxtImg v-else class="rounded-t-md h-72 w-full" :src="tmdbImage(imagePath, TmdbProfileSizes.md)" />
        </div>
        <div class="flex h-full items-center justify-center p-1">
            <p>{{ name }}</p>
        </div>
    </div>
</template>