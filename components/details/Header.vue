<script setup lang="ts">
const prop = defineProps<{
    titleName?: string,
    runtime?: number,
    releaseDates?: ReleaseDates[]
    contentRatings?: ContentRating[]
    firstAirDate?: string
    lastAirDate?: string
}>()

console.log(prop.releaseDates)
</script>

<template>
    <div class="flex flex-col gap-2">
        <p class="text-4xl sm:text-5xl text-secondary dark:text-primary">
            {{ titleName }}
        </p>
        <div v-if="releaseDates && releaseDates?.length > 0 || runtime" class="flex gap-1 font-light items-center *:after:content-['_•_'] last:*:after:content-['']">
            <div v-if="releaseDates && releaseDates?.length > 0" class="flex gap-1">
                <p class="border border-dark dark:border-light rounded-sm px-1">
                    {{ releaseDates[0].release_dates[0].certification ? releaseDates[0].release_dates[0].certification : 'NR' }}
                </p>
            </div>
            <p v-if="releaseDates && releaseDates?.length > 0">
                {{ 
                    new Date(releaseDates[0].release_dates[0].release_date).getTime() < Date.now() ? 
                    new Date(releaseDates[0].release_dates[0].release_date).getFullYear() :
                    new Date(releaseDates[0].release_dates[0].release_date).toLocaleDateString()
                }}
            </p>
            <p v-if="runtime">
                {{ runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}m` : null }}
            </p>
        </div>
        <div v-else class="flex gap-1 font-light items-center *:after:content-['_•_'] last:*:after:content-['']">
            <div v-if="contentRatings" class="flex gap-1">
                <p class="border border-dark dark:border-light rounded-sm px-1">
                    {{ contentRatings.length > 0 ? contentRatings[0].rating : 'NR' }}
                </p>
            </div>
            <p>TV Series</p>
            <p v-if="firstAirDate && new Date(firstAirDate).getTime() < Date.now()">
                {{
                    (new Date(firstAirDate).getFullYear()).toString() +
                    (lastAirDate && new Date(firstAirDate).getFullYear() != new Date(lastAirDate).getFullYear() ? '-' + new Date(lastAirDate).getFullYear() : '').toString()
                }}
            </p>
            <p v-else-if="firstAirDate">
                {{ new Date(firstAirDate).toLocaleDateString() }}
            </p>
        </div>
    </div>
</template>
