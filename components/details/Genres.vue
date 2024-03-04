<script lang="ts" setup>
defineProps<{
    list?: Genre[]
}>()
</script>
<template>
    <ul v-if="list" class="flex flex-row gap-1 select-none flex-wrap">
        <li v-for="genre in list" :key="genre.id" class="border-2 border-secondary dark:border-primary bg-light dark:bg-black rounded-full px-2 py-1">
            {{ genre.name }}
        </li>
    </ul>
</template>