<script lang="ts" setup>
withDefaults(defineProps<{
    snapX?: boolean
}>(), {
    snapX: true
})
</script>

<template>
    <div class="flex gap-3 overflow-x-auto xl:snap-none scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-transparent dark:scrollbar-track-transparent scrollbar-thumb-secondary dark:scrollbar-thumb-primary" :class="{ 'snap-x': snapX }">
        <transition-group name="list" mode="out-in">
            <slot />
        </transition-group>
    </div>
</template>