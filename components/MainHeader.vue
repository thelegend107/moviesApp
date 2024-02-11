<template>
    <div class="flex justify-between h-full p-4">
        <nav class="flex space-x-4 font-medium">
            <NuxtLink class="flex items-center gap-1" to="/">
                <Icon class="def-icon" name="ri:home-fill" />
                <p class="hidden x-sm:block">
                    HOME
                </p>
            </NuxtLink>
            <NuxtLink class="flex items-center gap-1" to="movies">
                <Icon class="def-icon" name="mdi:movie" />
                <p class="hidden x-sm:block">
                    MOVIES
                </p>
            </NuxtLink>
            <NuxtLink class="flex items-center gap-1" to="shows">
                <Icon class="def-icon" name="mdi:slideshow" />
                <p class="hidden x-sm:block">
                    SHOWS
                </p>
            </NuxtLink>
        </nav>
        <ColorModeSwitch />
    </div>
</template>