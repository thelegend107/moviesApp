<script lang="ts" setup>
export interface Card {
    id?: number
    imagePath?: string
    name?: string
    type: MediaType
    seasonNumber?: number
    personPhotos?: boolean
}

const prop = withDefaults(defineProps<Card>(), {
    type: 'movie',
    seasons: false,
    personPhotos: false
});

function handleCardClick() {
    if (prop.type == 'person') {
        navigateTo({
            path: '/people/' + prop.id,
        })
    }
    else if (prop.seasonNumber) {
        const path: string = '/shows/';
        navigateTo({
            path: path + prop.id + '/season/' + prop.seasonNumber,
        })
    }
    else {
        const path: string = prop.type == 'movie' ? '/movies/' : '/shows/';
        navigateTo({
            path: path + prop.id,
        })
    }
}
</script>

<template>
    <div class="flex flex-col max-w-48 bg-white dark:bg-dark rounded-md shadow-md shadow-neutral-400 dark:shadow-black divide-y-4 divide-secondary dark:divide-primary hover:scale-[1.02] duration-200 mb-5 hover:cursor-pointer snap-center snap-proximity" @click="id ? handleCardClick() : null">
        <div class="w-full">
            <CardImg class="min-w-48 rounded-t-md h-72 w-full" :prop="prop" :class="name ? 'rounded-t-md' : 'rounded-md'" />
        </div>
        <div v-if="name" class="flex flex-col size-full items-center justify-center p-1 gap-1">
            <p> {{ name }} </p>
            <slot class="flex-wrap" name="additionalInfo" />
        </div>
    </div>
</template>