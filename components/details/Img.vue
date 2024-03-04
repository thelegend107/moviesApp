<script setup lang="ts">
const prop = withDefaults(defineProps<{
    imgPath?: string
    type: MediaType | 'person'
    externalIds?: ExternalIds
}>(), {
    type: 'movie'
})

function imgSrc(): string {
    if (prop.type == 'person')
        return tmdbImage(prop.imgPath, TmdbProfileSizes.og)
    else
        return tmdbImage(prop.imgPath, TmdbPosterSizes.md)
}

const externalLinks = ref<ExternalLink[]>([]);

if (prop.externalIds) {
    Object.entries(prop.externalIds).forEach(([key, value]) => {
        if (key.toLocaleLowerCase().includes('imdb') && value) {
            const externalLink: ExternalLink = {
                Link: value.includes('nm') ? 'https://www.imdb.com/name/' + value : 'https://www.imdb.com/title/' + value,
                IconName: 'bxl:imdb'
            }

            externalLinks.value.push(externalLink);
        }

        if (key.toLocaleLowerCase().includes('twitter') && value) {
            const externalLink: ExternalLink = {
                Link: 'https://twitter.com/' + value,
                IconName: 'bxl:twitter'
            }
            externalLinks.value.push(externalLink);
        }

        if (key.toLocaleLowerCase().includes('instagram') && value) {
            const externalLink: ExternalLink = {
                Link: 'https://www.instagram.com/' + value,
                IconName: 'bxl:instagram-alt'
            }

            externalLinks.value.push(externalLink);
        }

        if (key.toLocaleLowerCase().includes('homepage') && value) {
            const externalLink: ExternalLink = {
                Link: value,
                IconName: 'mdi:link-box-variant'
            }

            externalLinks.value.push(externalLink);
        }
    })
}
</script>

<template>
    <div class="hidden sm:flex sm:flex-col divide-y-4 divide-secondary dark:divide-primary">
        <NuxtImg alt="detailImage" class="h-96 w-full" :src="imgSrc()" :class="{ '-mt-16': type != 'person', 'rounded-t-xl': externalLinks.length > 0, 'rounded-xl': externalLinks.length == 0 }" />
        <ExternalLinks v-if="externalLinks.length > 0" :external-links="externalLinks" :type="type" />
    </div>
</template>
