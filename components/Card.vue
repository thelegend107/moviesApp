<script lang="ts" setup>
export interface Card {
    id: number
    imagePath?: string
    name: string
    type: MediaType | "person"
    seasonNumber?: number
}

const prop = withDefaults(defineProps<Card>(), {
    type: 'movie',
    seasons: false
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
    <div class="flex flex-col max-w-48 bg-white dark:bg-dark rounded-md shadow-md shadow-neutral-400 dark:shadow-black hover:scale-[1.02] hover:cursor-pointer duration-200 mb-5 snap-center snap-always" @click="handleCardClick()">
        <div class="w-full border-b-4 border-b-secondary dark:border-b-primary">
            <CardImg class="min-w-48 rounded-t-md h-72 w-full" :prop="prop" />
        </div>
        <div class="flex flex-col size-full items-center justify-center p-1 gap-1">
            <p> {{ name }} </p>
            <slot class="flex-wrap" name="additionalInfo" />
        </div>
    </div>
</template>