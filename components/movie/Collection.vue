<script lang="ts" setup>
const prop = defineProps<{
    collection: Media
}>()

const { data: collectionData } = await useAsyncData<Collection>(
    '/api/collection/' + prop.collection.id,
    () => $fetch('/api/collection/' + prop.collection.id, {
        headers: {
            Authorization: import.meta.env.VITE_INTERNAL_API_KEY
        },
        params: { credits: false }
    }),
    {
        transform(response) {
            if (response.parts && response.parts.length > 0) {
                response.parts = response.parts.sort((a, b) => {
                    if (a.release_date && b.release_date && new Date(a.release_date) >= new Date(b.release_date))
                        return 1
                    else
                        return -1
                })
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