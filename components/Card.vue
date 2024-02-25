<script lang="ts" setup>
export interface Card {
    id: number
    mediaType?: MediaType
    imagePath?: string
    name: string
    type: "media" | "person"
}

const prop = withDefaults(defineProps<Card>(), {
    type: 'media'
});

async function handleCardClick() {
    if (prop.type == 'person') {
        await navigateTo({
            path: '/person/' + prop.id,
        })
    }
    else {
        const path: string = prop.mediaType == 'movie' ? '/movies/' : '/shows/';
        await navigateTo({
            path: path + prop.id,
        })
    }
}

</script>
<template>
    <div class="flex flex-col bg-white dark:bg-dark rounded-md shadow-md shadow-neutral-400 dark:shadow-black hover:scale-[1.02] hover:cursor-pointer duration-200 mb-5 snap-center snap-always" @click="handleCardClick">
        <div class="min-w-48 border-b-4 border-b-secondary dark:border-b-primary">
            <CardImg class="rounded-t-md h-72 w-full" :prop="prop" />
        </div>
        <div class="flex flex-col h-full items-center justify-center p-1 gap-1">
            <p>
                {{ name }}
            </p>
            <slot name="additionalInfo" />
        </div>
    </div>
</template>