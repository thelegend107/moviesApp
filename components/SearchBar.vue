<script lang="ts" setup>
const emit = defineEmits(['close-search-bar'])
const prop = withDefaults(defineProps<{
    show?: boolean
}>(), {
    show: false
})

const nuxtApp = useNuxtApp()
const search = ref<string>('')
const page = ref<number>(1)
const searchData = ref<(Media & Person)[]>([] as (Media & Person)[])

const { data } = await useLazyAsyncData<PageResult<Media & Person>>(
    'search/multi' + search,
    () => nuxtApp.$tmdbAPI('search/multi', { params: { query: search.value } }),
    {
        transform(response) {
            if (response.results) {
                response.results.pop()
                response.results.pop()
            }
            return response
        },
        immediate: false,
        watch: [search]
    }
);

const closeSearchBar = () => {
    searchData.value = []
    search.value = ''
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
    <div class="z-20 transition-all ease-in-out duration-500 absolute inset-0 bg-white dark:bg-dark" :class="!show ? '-translate-y-full' : null">
        <div class="flex justify-between items-center size-full px-4">
            <input id="searchInput" v-model="search" class="flex-grow outline-none bg-inherit dark:bg-inherit" type="text" placeholder="Search Movie, TV Show, or People...">
            <button class="rounded-full" @click="closeSearchBar()">
                <Icon name="carbon:close-filled" />
            </button>
        </div>
        <Transition mode="out-in">
            <div v-if="data && data?.results.length > 0 && show" class="no-scroll h-screen overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 p-4 bg-neutral-950">
                <div class="flex gap-5 justify-center flex-wrap mb-10">
                    <Card v-for="d in data.results" :id="d.id" :key="d.id" :image-path="d.poster_path || d.profile_path" :type="d.media_type" :name="d.name || d.title" @click="closeSearchBar()" />
                </div>
            </div>
        </Transition>
    </div>
</template>