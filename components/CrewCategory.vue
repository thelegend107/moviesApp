<script lang="ts" setup>
defineProps<{
    title: string,
    people: Person[],
}>()
</script>
<template>
    <div v-if="people.length > 0" class="flex gap-2 flex-wrap">
        <p class="font-semibold">
            {{ title }}
        </p>
        <NuxtLink v-for="p in people" :key="p.id" :to="{ path: '/people/' + p.id }" class="after:content-['↗']">
            {{ p.name }}
        </NuxtLink>
    </div>
</template>