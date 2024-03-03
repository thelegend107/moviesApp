<script lang="ts" setup>
const nuxtApp = useNuxtApp()
const router = useRouter();

interface RouteParams {
    id: number,
    seasonNumber: number
}

const params: RouteParams = {
    id: Number.parseInt(router.currentRoute.value.params.id as string),
    seasonNumber: Number.parseInt(router.currentRoute.value.params.seasonNumber as string)
}

const currentSeason = toRef<number>(params.seasonNumber)

const showPath = '/api/tv/' + params.id
const { data: showData } = await useAsyncData<Media>(
    showPath,
    () => $fetch(showPath, { params: { credits: false } }),
    {
        transform(response) {
            response.fetchDate = new Date
            return response
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

const seasonPath = ref<string>(showPath + '/season/' + params.seasonNumber)
const { data: seasonData, error } = await useAsyncData<Season>(
    seasonPath.value,
    () => $fetch(seasonPath.value),
    {
        transform(response) {
            response.fetchDate = new Date
            return response
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

if (error.value) throw error

const handleSeasonSelectEvent = (eventTargetValue: string) => {
    router.push(router.currentRoute.value.path.slice(0, -1) + eventTargetValue)
}
</script>

<template>
    <div>
        <TvEpisodeListHeader v-if="showData" :show="showData" :season-number="currentSeason" @season-select="handleSeasonSelectEvent" />
        <TvEpisodeList v-if="seasonData" :season="seasonData" />
    </div>
</template>