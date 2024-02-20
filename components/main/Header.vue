<template>
    <div class="flex justify-between sticky p-4">
        <nav class="flex space-x-4 font-medium">
            <NuxtLink class="flex items-center gap-1" to="/">
                <Icon name="ri:home-fill" />
                <p class="hidden x-sm:block">
                    HOME
                </p>
            </NuxtLink>
            <NuxtLink class="flex items-center gap-1" to="movies">
                <Icon name="mdi:movie" />
                <p class="hidden x-sm:block">
                    MOVIES
                </p>
            </NuxtLink>
            <NuxtLink class="flex items-center gap-1" to="shows">
                <Icon name="mdi:slideshow" />
                <p class="hidden x-sm:block">
                    SHOWS
                </p>
            </NuxtLink>
        </nav>
        <ColorModeSwitch />
    </div>
</template>