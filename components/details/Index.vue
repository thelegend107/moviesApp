<script lang="ts" setup>
const nuxtApp = useNuxtApp()
const prop = defineProps<{
    id: number,
    type: MediaType | 'person'
}>()

const queryItem: QueryItem = {
    title: 'Movie',
    path: ('/api/').concat(prop.type, '/', prop.id.toString())
}

const relatedQueryItems: ComputedRef<QueryItem[]> = computed(() => {
    const items: QueryItem[] = [];

    items.push({
        title: 'Recommended ' + (prop.type == 'movie' ? 'Movies' : 'Shows'),
        path: queryItem.path + '/recommendations'
    })

    items.push({
        title: 'Similar ' + (prop.type == 'movie' ? 'Movies' : 'Shows'),
        path: queryItem.path + '/similar'
    })

    return items;
})

const { data, error } = await useAsyncData<Media & Person>(
    queryItem.path,
    () => $fetch(queryItem.path, { params: { credits: prop.type == 'person' ? false : true, AV: true } }),
    {
        transform(response) {
            if (response.release_dates && response.release_dates.results)
                response.release_dates.results = response.release_dates.results.filter(x => x.iso_3166_1 == 'US');

            if (response.content_ratings && response.content_ratings.results)
                response.content_ratings.results = response.content_ratings.results.filter(x => x.iso_3166_1 == 'US');

            if (response.videos && response.videos.results.length > 0) {
                response.video = true
                response.trailerVideos = response.videos.results.filter((v) => v.type == "Trailer" && v.site == "YouTube")
            }

            if (response.external_ids && !response.external_ids.homepage) {
                response.external_ids.homepage = response.homepage
            }

            response.fetchDate = new Date()
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

if (error.value) {
    throw createError({
        statusCode: error.value?.statusCode,
        message: error.value?.statusCode == 404 ? `${prop.id} ${prop.type} was not found` : error.value?.message
    })
}
</script>
<template>
    <YoutubeTrailer v-if="type != 'person' && data?.trailerVideos && data.trailerVideos?.length > 0" class="h-[57vi] sm:h-[500px]" :videos="data.trailerVideos" />
    <NuxtImg v-else-if="type != 'person'" class="w-full h-[57vi] sm:h-[500px]" :src="tmdbImage(data?.backdrop_path || data?.poster_path, TmdbBackdropSizes.og)" style="object-fit: cover; object-position: 0 15%;" />
    <NuxtImg v-else class="bg-neutral-950 w-full max-h-[500px] sm:hidden" :src="tmdbImage(data?.profile_path, TmdbProfileSizes.og)" style="object-fit: cover; object-position: 0 15%;" />
    <div class="flex sm:justify-center p-4 gap-2 bg-white dark:bg-dark">
        <DetailsImg :img-path="data?.poster_path || data?.profile_path" :external-ids="data?.external_ids" :type="type" />
        <div class="flex flex-col gap-4 sm:p-4 sm:w-1/2">
            <DetailsHeader class="empty:hidden" :title-name="data?.title || data?.name" :release-dates="data?.release_dates?.results" :runtime="data?.runtime" :content-ratings="data?.content_ratings?.results" :first-air-date="data?.first_air_date" :last-air-date="data?.last_air_date" />
            <DetailsGenres class="empty:hidden" :list="data?.genres" />
            <DetailsCrew class="empty:hidden" :crew="type != 'person' ? data?.credits?.crew : undefined" :creators="data?.created_by" :type="type" />
            <p>{{ data?.overview || data?.biography }}</p>
        </div>
    </div>
    <DetailsTopCast v-if="type != 'person' && data?.credits && data.credits.cast && data.credits.cast?.length > 0" :cast="data?.credits?.cast" />
    <MovieCollection v-if="type == 'movie' && data?.belongs_to_collection" :collection="data?.belongs_to_collection" />
    <TvSeasons v-if="type == 'tv' && data?.seasons" :seasons="data?.seasons" />

    <PersonKnownFor v-if="type == 'person' && data?.combined_credits" :combined-credits="data?.combined_credits" />
    <div v-else>
        <MainList v-for="qi in relatedQueryItems" :key="qi.path" :query-item="qi" />
    </div>
</template>
