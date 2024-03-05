<script lang="ts" setup>
const searchIcons: string[] = ['mingcute:search-line', 'mingcute:search-fill']
const iconToggle = ref<number>(0)
</script>

<template>
    <div class="flex justify-between sticky p-4">
        <nav class="flex gap-4 font-medium">
            <NuxtLink class="flex items-center gap-1" :to="{ path: '/' }">
                <Icon name="ri:home-fill" />
                <p class="hidden x-sm:block">
                    HOME
                </p>
            </NuxtLink>
            <NuxtLink class="flex items-center gap-1" :to="{ path: '/movies' }">
                <Icon name="mdi:movie" />
                <p class="hidden x-sm:block">
                    MOVIES
                </p>
            </NuxtLink>
            <NuxtLink class="flex items-center gap-1" :to="{ path: '/shows' }">
                <Icon name="mdi:slideshow" />
                <p class="hidden x-sm:block">
                    SHOWS
                </p>
            </NuxtLink>
        </nav>
        <nav class="flex gap-2">
            <button class="flex" @mouseover="iconToggle = 1" @mouseout="iconToggle = 0">
                <Icon :name="searchIcons[iconToggle]" />
            </button>
            <ColorModeSwitch />
        </nav>
    </div>
</template>