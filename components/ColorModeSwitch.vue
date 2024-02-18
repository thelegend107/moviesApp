<script setup lang="ts">
const colorMode = useColorMode();
const darkMode = ref(true);

function toggleColorMode() {
    darkMode.value = !darkMode.value;
    if (colorMode.value == 'dark')
        colorMode.preference = 'light'
    else {
        colorMode.preference = 'dark'
    }
}

watch(colorMode, (newVal) => {
    if (newVal.value == 'dark' && !newVal.unknown)
        darkMode.value = true;
    else
        darkMode.value = false;
})
</script>
<template>
    <transition mode="out-in">
        <div v-if="!colorMode.unknown" class="transition-all ease-in-out duration-500 rounded-full shadow-inner bg-zinc-500 shadow-zinc-700 dark:bg-primary dark:shadow-primaryDark w-10 cursor-pointer flex items-center" style="padding: 0 1px;" @click="toggleColorMode">
            <div class="transition-all ease-in-out duration-500 flex justify-center rounded-full shadow-around bg-white dark:bg-zinc-900 dark:text-white w-1/2" :class="{ moveSlider: darkMode }">
                <Icon v-if="darkMode" class="size-full" name="ph:moon-fill" style="padding: 2px;" />
                <Icon v-else class="size-full" name="ph:sun-fill" style="padding: 2px;" />
            </div>
        </div>
    </transition>
</template>
<style lang="scss" scoped>
.moveSlider {
    transform: translateX(100%);
}
</style>