<script lang="ts" setup>
const nuxtApp = useNuxtApp()
const prop = defineProps<{
    collection: Media
}>()

const collectionPath: string = 'collection/' + prop.collection.id
const { data: collectionData } = await useAsyncData<Collection>(
    collectionPath,
    () => nuxtApp.$tmdbAPI(collectionPath, { params: { credits: false } }),
    {
        transform(response) {
            if (response.parts && response.parts.length > 0) {
                response.parts = response.parts.sort((a, b) => a.release_date && b.release_date && new Date(a.release_date) > new Date(b.release_date) ? 1 : -1)
            }
            return response;
        }
    }
)
</script>

<template>
    <Section v-if="collectionData" :title="collectionData.name">
        <template #cards>
            <Cards>
                <Card v-for="part in collectionData.parts" :id="part.id" :key="part.id" :image-path="part.poster_path" :name="part.title" :type="'movie'" />
            </cards>
        </template>
    </Section>
</template>