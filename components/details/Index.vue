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

// Collection
const collection = ref<Collection>();
if (data.value && data.value.belongs_to_collection) {
    const { data: collectionData } = await useAsyncData<Collection>(
        '/api/collection/' + data.value?.belongs_to_collection?.id,
        () => $fetch('/api/collection/' + data.value?.belongs_to_collection?.id, { params: { credits: false } }),
        {
            transform(response) {
                // Adjusting the order
                if (response.parts && response.parts.length > 0) {
                    response.parts = response.parts.sort((a, b) => {
                        if (a.release_date && b.release_date && new Date(a.release_date) < new Date(b.release_date))
                            return -1
                        else
                            return 1
                    })
                }
                return response;
            }
        }
    );

    if (collectionData.value) {
        collection.value = collectionData.value
    }
}

// Non-Acting Person Combined Credits
const nonActorRoles = ref<{ media: Media, jobs: string[] }[]>([]);
if (data.value && data.value.combined_credits && data.value.combined_credits.crew) {
    data.value.combined_credits.crew.forEach(m => {
        if (m.job) {
            const existingRoleIndex = nonActorRoles.value.findIndex(x => x.media.id == m.id)
            if (existingRoleIndex == -1)
                nonActorRoles.value.push({ media: m, jobs: [m.job] })
            else {
                nonActorRoles.value[existingRoleIndex].jobs.push(m.job)
            }
        }
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
    <Section v-if="data?.credits?.cast && data.credits.cast.length > 0" title="Top Cast">
        <template #cards>
            <Cards>
                <Card v-for="c in data?.credits?.cast" :id="c.id" :key="c.id" :image-path="c.profile_path" :name="c.name" :type="'person'">
                    <template #additionalInfo>
                        <p class="font-extralight">
                            {{ c.character }}
                        </p>
                    </template>
                </Card>
            </cards>
        </template>
    </Section>
    <Section v-if="collection" :title="collection.name || ''">
        <template #cards>
            <Cards>
                <Card v-for="c in collection.parts" :id="c.id" :key="c.id" :image-path="c.poster_path" :name="c.title" :type="'movie'" />
            </cards>
        </template>
    </Section>
    <Section v-if="type == 'tv'" title="Seasons">
        <template #cards>
            <Cards>
                <Card v-for="s in data?.seasons" :id="id" :key="s.id" :season-number="s.season_number" :image-path="s.poster_path" :name="s.name" :type="type">
                    <template #additionalInfo>
                        <div class="font-extralight">
                            <p> {{ s.episode_count }} Epsiodes </p>
                        </div>
                    </template>
                </Card>
            </cards>
        </template>
    </Section>
    <div v-if="type == 'person'" :class="data?.known_for_department != 'Acting' ? 'flex flex-col-reverse' : 'flex flex-col'">
        <Section v-if="(data?.combined_credits?.cast && data?.combined_credits?.cast.length > 0)" :title="data?.known_for_department == 'Acting' ? 'Known For' : 'Known For (Cast)'">
            <template #cards>
                <Cards>
                    <Card v-for="c in data?.combined_credits?.cast" :id="c.id" :key="c.id + 1" :image-path="c.poster_path" :name="c.name || c.title" :type="c.media_type">
                        <template #additionalInfo>
                            <p class="font-extralight">
                                {{ c.character }}
                            </p>
                        </template>
                    </Card>
                </cards>
            </template>
        </section>
        <Section v-if="nonActorRoles.length > 0" :title="data?.known_for_department != 'Acting' ? 'Known For' : 'Known For (Crew)'">
            <template #cards>
                <Cards>
                    <Card v-for="c in nonActorRoles" :id="c.media.id" :key="c.media.id" :image-path="c.media.poster_path" :name="c.media.name || c.media.title" :type="c.media.media_type">
                        <template #additionalInfo>
                            <p class="font-extralight">
                                {{ c.jobs.join(', ') }}
                            </p>
                        </template>
                    </Card>
                </cards>
            </template>
        </section>
    </div>
    <div v-if="type != 'person'">
        <MainList v-for="qi in relatedQueryItems" :key="qi.path" :query-item="qi" />
    </div>
</template>
