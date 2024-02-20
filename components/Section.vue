<script setup lang="ts">
interface Section {
    title: string,
    queryItem: QueryItem,
}

const prop = defineProps<Section>()
const route = useRoute()
const interval = ref()
const apiPath = ref()
const snapX = ref(true)

if (prop.queryItem.interval) {
    interval.value = prop.queryItem.interval
    apiPath.value = prop.queryItem.path + prop.queryItem.interval
}

const { data, pending, error, refresh } = await useAsyncData<PageResult<Media & Person>>(
    route.path + prop.queryItem.path,
    () => $fetch(apiPath.value ? apiPath.value : prop.  queryItem.path),
    {
        transform: (response) => {
            response.results.forEach((r) => {
                r.media_type = prop.queryItem.path.includes('movie') ? 'movie' : 'tv'
            })

            return response
        },
        watch: apiPath.value ? [apiPath] : undefined,
    }
);

watch(interval, (newVal, oldVal) => {
    if (newVal != oldVal) {
        snapX.value = false
        apiPath.value = prop.queryItem.path + newVal
    }
})

watch(pending, (newVal) => {
    if (!newVal && !snapX.value)
        setTimeout(() => {
            snapX.value = true
        }, 500);
})
</script>
<template>
    <div class="px-2 py-2 flex flex-col gap-3 bg-neutral-300 dark:bg-neutral-950">
        <div class="flex gap-4 items-center">
            <h1 class="font-semibold border-b-secondary dark:border-b-primary" :style="{ borderColor: pending ? 'gray' : '' }">
                {{ title }}
            </h1>
            <select v-if="prop.queryItem.interval" v-model="interval" :disabled="pending">
                <option value="day">
                    Today
                </option>
                <option value="week">
                    This Week
                </option>
            </select>
            <icon v-if="pending" class="text-secondary dark:text-primary" name="svg-spinners:180-ring-with-bg" />
        </div>
        <div class="flex gap-3 overflow-hidden hover:overflow-x-visible scroll-p-4 scrollbar scrollbar-track-transparent dark:scrollbar-track-transparent scrollbar-thumb-secondary dark:scrollbar-thumb-primary" :class="{ 'snap-x': snapX }">
            <transition-group name="list">
                <card v-for="p in data?.results" v-if="prop.queryItem.path.includes('person')" :key="p.id" :name="p.name" :image-path="p.profile_path" :type="'person'" class="hover:scale-[1.02] hover:cursor-pointer duration-200 mb-5 snap-start" />
                <card v-for="mi in data?.results" v-else :key="mi.id" :name="mi.name ? mi.name : mi.title" :image-path="mi.poster_path" :type="'media'" class="hover:scale-[1.02] hover:cursor-pointer duration-200 mb-5 snap-start" />
            </transition-group>
        </div>
    </div>
</template>