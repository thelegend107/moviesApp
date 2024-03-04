<script lang="ts" setup>
const emit = defineEmits(['close-modal'])

const prop = withDefaults(defineProps<{
    title?: string
    images: Image[]
    imageIndex?: number
    show: boolean
}>(), {
    title: 'IMAGES',
    imageIndex: 0,
    show: false
})

const lastImgIndex = prop.images.length - 1
const currentImgIndex = ref<number>(prop.imageIndex)

const imagesNavLeft = (): void => {
    currentImgIndex.value == 0 ? currentImgIndex.value = lastImgIndex : currentImgIndex.value--;
}

const imagesNavRight = (): void => {
    currentImgIndex.value == lastImgIndex ? currentImgIndex.value = 0 : currentImgIndex.value++;
}

const keyboardEventHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape")
        emit('close-modal')
    if (event.key === "ArrowLeft")
        imagesNavLeft()
    if (event.key === "ArrowRight")
        imagesNavRight()
};

onMounted(() => {
    document.addEventListener("keydown", keyboardEventHandler)
})

onBeforeUnmount(() => {
    document.removeEventListener("keydown", keyboardEventHandler)
})
</script>

<template>
    <Teleport v-if="show" to="body">
        <div class="no-scroll fixed inset-0 size-full bg-white dark:bg-black">
            <div class="z-10 sticky columns-3 bg-white dark:bg-dark p-1 md:p-4 border-b border-b-dark dark:border-b-light">
                <p class="text-left">
                    {{ title }}
                </p>
                <p class="text-center">
                    {{ (currentImgIndex + 1) + ' / ' + (lastImgIndex + 1) }}
                </p>
                <div class="text-right">
                    <Icon class="cursor-pointer hover:opacity-75" name="mdi:close-box" @click="emit('close-modal')" />
                </div>
            </div>
            <div class="flex items-center justify-between size-full">
                <div class="z-10 ml-2 flex h-1/8 rounded-full sm:m-0 sm:h-full sm:rounded-none items-center bg-white dark:bg-black p-1 md:p-4 lg:p-10 cursor-pointer opacity-45 hover:opacity-75" @click="imagesNavLeft()">
                    <Icon class="hover:opacity-75" name="teenyicons:left-outline" />
                </div>
                <Transition class="absolute inset-0 top-8 m-auto h-[70dvh] sm:top-16 sm:h-full" mode="out-in">
                    <NuxtImg :key="currentImgIndex" format="webp" :alt="title" :src="tmdbImage(images[currentImgIndex].file_path, TmdbProfileSizes.og)" class="h-full" />
                </Transition>
                <div class="z-10 flex mr-2 h-1/8 rounded-full sm:m-0 sm:h-full sm:rounded-none items-center bg-white dark:bg-black p-1 md:p-4 lg:p-10 cursor-pointer opacity-45 hover:opacity-75" @click="imagesNavRight()">
                    <Icon name="teenyicons:right-outline" />
                </div>
            </div>
        </div>
    </Teleport>
</template>