<script lang="ts" setup>
defineProps<{
    season: Season
}>()
</script>

<template>
    <div v-for="ep in season.episodes" :key="ep.id" class="flex flex-col sm:flex-row p-2 rounded-lg divide-y-4 sm:divide-y-0 sm:divide-x-4 divide-secondary dark:divide-primary">
        <div class="shadow-lg shadow-neutral-400 dark:shadow-black sm:rounded-none sm:rounded-l-lg">
            <NuxtImg :src="tmdbImage(ep.still_path, TmdbPosterSizes.md)" height="162" width="342" class="rounded-t-lg w-full sm:w-min sm:rounded-none sm:rounded-l-lg" style="object-fit: cover; object-position: 0 15%;" />
        </div>
        <div class="flex flex-col gap-2 rounded-b-lg sm:rounded-none sm:rounded-r-lg p-2 lg:p-4 w-full bg-white dark:bg-dark shadow-md shadow-neutral-400 dark:shadow-black">
            <p class="font-semibold text-secondary dark:text-primary sm:text-xl">
                Ep.{{ ep.episode_number }} {{ ep.name.includes('Episode') ? null : ep.name }}
            </p>
            <p v-if="ep.overview" class="mb-2">
                {{ ep.overview }}
            </p>
            <p class="mt-auto text-end">
                {{ ep.air_date }}
            </p>
        </div>
    </div>
</template>