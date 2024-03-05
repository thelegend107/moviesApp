<script lang="ts" setup>
const emit = defineEmits(['close-search-bar', 'search'])
const prop = withDefaults(defineProps<{
    show?: boolean
}>(), {
    show: false
})

const search = ref<string>()

const closeSearchBar = () => {
    search.value = undefined
    emit('close-search-bar')
}

watch(() => (prop.show), (newVal) => {
    if (newVal)
        setTimeout(() => {
            document.getElementById('searchInput')?.focus()
        });
})
</script>

<template>
    <div class="z-10 transition-all ease-in-out duration-500 absolute inset-0 flex justify-between items-center bg-white dark:bg-dark px-5" :class="!show ? '-translate-y-full' : null">
        <input id="searchInput" v-model="search" class="flex-grow outline-none bg-inherit dark:bg-inherit" type="text" placeholder="Search..." @keyup.enter="emit('search', search)" @keyup.esc="closeSearchBar()" @focusout="closeSearchBar()">
        <button class="rounded-full" @click="closeSearchBar()">
            <Icon name="carbon:close-filled" />
        </button>
    </div>
</template>