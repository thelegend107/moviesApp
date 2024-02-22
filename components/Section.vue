<script lang="tsx" setup>
const nuxtApp = useNuxtApp()
const route = useRoute()

interface Section {
    title: string,
    queryItem: QueryItem,
}

const prop = defineProps<Section>()
const interval = ref()
const apiPath = ref()
const snapX = ref(true)

if (prop.queryItem.interval) {
    interval.value = prop.queryItem.interval
    apiPath.value = prop.queryItem.path + prop.queryItem.interval
}

const { data, execute, pending, error } = await useAsyncData<PageResult<Media & Person>>(
    route.path + prop.queryItem.path,
    () => $fetch(apiPath.value ? apiPath.value : prop.queryItem.path),
    {
        transform: (response) => {
            response.results.forEach((r) => {
                prop.queryItem.path.includes('movie') ? r.media_type = 'movie' : r.media_type = 'tv'
            })

            if (prop.queryItem.path.includes('now_playing'))
                response.results = response.results.sort((a, b) => a.release_date && b.release_date && (new Date(b.release_date) >= new Date(a.release_date)) ? 1 : -1)

            if (prop.queryItem.path.includes('upcoming'))
                response.results = response.results.sort((a, b) => a.release_date && b.release_date && (new Date(b.release_date) <= new Date(a.release_date)) ? 1 : -1)

            if (prop.queryItem.path.includes('trending/movie'))
                response.results = response.results.filter(x => x.release_date && new Date(x.release_date) <= new Date(Date.now()))

            response.fetchDate = new Date();

            return response;
        },
        getCachedData(key) {
            const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
            if (!data)
                return null

            const expirationDate = new Date(data.fetchDate.getTime() + 300000)
            if (expirationDate.getTime() < Date.now())
                return null

            return data;
        },
        watch: [apiPath],
        dedupe: 'defer'
    }
);

watch(pending, async (newVal) => {
    if (!newVal && !snapX.value) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        snapX.value = true;
    }
})

watch(interval, async (newVal, oldVal) => {
    if (newVal != oldVal) {
        snapX.value = false
        apiPath.value = prop.queryItem.path + newVal
    }
})
</script>
<template>
    <div class="px-2 py-2 flex flex-col gap-3 bg-light dark:bg-neutral-950">
        <div class="flex gap-4 items-center">
            <h1 class="font-semibold border-b-secondary dark:border-b-primary" :style="{ borderColor: pending ? 'gray' : '' }">
                {{ title }}
            </h1>
            <select v-if="prop.queryItem.interval" v-model="interval" class="bg-white dark:bg-dark" :disabled="pending">
                <option value="day">
                    Today
                </option>
                <option value="week">
                    This Week
                </option>
            </select>
            <icon v-if="pending" class="text-secondary dark:text-primary" name="svg-spinners:180-ring-with-bg" />
        </div>
        <div class="flex gap-3 overflow-hidden hover:overflow-x-auto xl:snap-none scroll-p-4 scrollbar scrollbar-track-transparent dark:scrollbar-track-transparent scrollbar-thumb-secondary dark:scrollbar-thumb-primary" :class="{ 'snap-x': snapX }">
            <transition-group name="list" mode="out-in">
                <section-card v-for="r in data?.results" :key="r.id" :info="r" :path="queryItem.path" class="hover:scale-[1.02] hover:cursor-pointer duration-200 mb-5 snap-start snap-always" />
            </transition-group>
        </div>
    </div>
</template>
<!-- THIS WAS MOVED TO A TSX ARROW FUNCTION 
    <card v-for=" p in data?.results " v-if="prop.queryItem.path.includes('person')" :key="p.id" :name="p.name" :image-path="p.profile_path" :type="'person'" class="hover:scale-[1.02] hover:cursor-pointer duration-200 mb-5 snap-start" />
    <card v-for=" mi in data?.results " v-else :key="mi.id" :name="mi.title ? mi.title : mi.name" :image-path="mi.poster_path" :date="mi.release_date ? mi.release_date : mi.first_air_date" :type="'media'" class="hover:scale-[1.02] hover:cursor-pointer duration-200 mb-5 snap-start" /> 
-->