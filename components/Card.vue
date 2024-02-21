<script lang="ts" setup>
export interface Card {
    imagePath?: string;
    name: string;
    date?: string;
    type: "media" | "person";
}

const prop = withDefaults(defineProps<Card>(), {
    type: 'media'
});
</script>
<template>
    <div class="flex flex-col bg-white dark:bg-dark rounded-md shadow-md shadow-neutral-400 dark:shadow-black">
        <div class="w-48 border-b-4 border-b-secondary dark:border-b-primary">
            <CardImg class="rounded-t-md h-72 w-full" :prop="prop" />
        </div>
        <div class="flex flex-col h-full items-center justify-center p-1 gap-1">
            <p>{{ name }}</p>
            <p v-if="date">
                {{ new Date(date).toLocaleDateString() }}
            </p>
        </div>
    </div>
</template>