<script setup lang="ts">
defineEmits(['seasonSelect'])
defineProps<{
    show: Media
    seasonNumber: number
}>()
</script>

<template>
    <div class="relative select-none">
        <div class="z-20 absolute flex bg-white dark:bg-dark pr-4 p-2 gap-1 rounded-br-lg opacity-65 hover:opacity-100 cursor-pointer" @click="$router.push('/shows/' + show.id)">
            <Icon name="mingcute:arrow-left-fill" />
            <p>Back</p>
        </div>
        <NuxtImg class="w-full h-[40vi] sm:h-[500px]" :src="tmdbImage(show.backdrop_path || show.poster_path, TmdbBackdropSizes.og)" style="object-fit: cover; object-position: 0 15%;" />
        <div class="absolute inset-0 size-full z-10 flex justify-center items-end flex-wrap">
            <div class="flex flex-col items-center justify-center size-full sm:size-auto bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(0,0,0,0.85)] text-secondary dark:text-primary gap-2 py-4 sm:px-32 sm:rounded-t-lg">
                <h1 class="text-4xl sm:text-5xl">
                    {{ show.name }}
                </h1>
                <p class="text-black dark:text-white">
                    Episode list
                </p>
            </div>
        </div>
    </div>
    <div class="flex items-center gap-4 p-2 bg-white dark:bg-dark">
        <p class="text-2xl font-semibold">
            Season
        </p>
        <select class="text-sm" :aria-label="`${show.name} season ${seasonNumber}`" @change="$emit('seasonSelect', ($event.target as HTMLSelectElement).value)">
            <option v-for="s in show.seasons?.filter(x => x.season_number).map(x => x.season_number)" :key="s" :value="s" :selected="s == seasonNumber">
                {{ s }}
            </option>
        </select>
    </div>
</template>
