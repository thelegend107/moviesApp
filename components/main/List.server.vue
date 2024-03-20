<script lang="tsx" setup>
const nuxtApp = useNuxtApp()
const route = useRoute()

interface List {
    sectionId: number,
    queryItem: QueryItem,
}

const prop = defineProps<List>()
let apiPath: string
let eventDispatch: string

if (prop.queryItem.interval) {
    apiPath = prop.queryItem.path + prop.queryItem.interval

    eventDispatch = `this.dispatchEvent(new CustomEvent('section-interval-change', {
        bubbles: true,
        detail: {
            sectionId: ${prop.sectionId},
            interval: event.target.value,
        } 
    }))`
}

const { data, pending } = await useAsyncData<PageResult<Media & Person>>(
    route.path + prop.queryItem.path,
    () => nuxtApp.$tmdbAPI(apiPath ? apiPath : prop.queryItem.path),
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
        dedupe: 'defer'
    }
);
</script>

<template>
    <Section v-if="data && data.results.length > 0" :id="sectionId" :title="queryItem.title">
        <template #action>
            <select v-if="prop.queryItem.interval" :onchange="eventDispatch" :aria-label="prop.queryItem.title + ' ' + prop.queryItem.interval" class="bg-white dark:bg-dark" :disabled="pending">
                <option value="day" :selected="prop.queryItem.interval == 'day'">
                    Today
                </option>
                <option value="week" :selected="prop.queryItem.interval == 'week'">
                    This Week
                </option>
            </select>
        </template>

        <template #cards>
            <cards :key="queryItem.path + queryItem.interval">
                <section-card v-for="r in data?.results" :key="r.id" :info="r" :path="queryItem.path" />
            </cards>
        </template>
    </Section>
</template>