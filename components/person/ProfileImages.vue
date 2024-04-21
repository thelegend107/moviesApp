<script lang="ts" setup>
defineProps<{
    images: Image[]
}>()

const modalShow = ref<boolean>(false)
const imageIndex = ref<number>(0)
</script>

<template>
    <ImagesModal v-if="modalShow" :images="images" :show="modalShow" :image-index="imageIndex" @close-modal="modalShow = false" />
    <Section v-if="images.length > 0" title="Photos">
        <template #cards>
            <Cards>
                <div v-for="(img, index) in images" :key="img.file_path">
                    <Card :image-path="img.file_path" :name="''" :type="'person'" :person-photos="true" @click="imageIndex = index; modalShow = true" />
                </div>
            </Cards>
        </template>
    </Section>
</template>