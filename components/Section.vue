<script lang="ts" setup>
defineProps<{
    title: string
}>()
</script>

<template>
    <div class="px-2 py-2 flex flex-col gap-3 bg-light dark:bg-neutral-950">
        <div class="flex gap-4 items-center">
            <h1 class="font-semibold select-none">
                {{ title }}
            </h1>
            <slot name="action" />
        </div>
        <slot name="cards" />
    </div>
</template>