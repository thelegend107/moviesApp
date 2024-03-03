<script lang="ts" setup>
export interface ExternalLink {
    Link: string,
    IconName: string
}

const prop = defineProps<{
    externalLinks: ExternalLink[]
    type: MediaType | 'person'
}>()
</script>
<template>
    <div v-if="externalLinks.length > 0" class="flex p-2 gap-1 justify-center rounded-b-xl shadow-md shadow-neutral-400 dark:shadow-none bg-light dark:bg-neutral-950">
        <a v-for="ext in externalLinks" :key="ext.Link" :href="ext.Link" target="_blank">
            <Icon :name="ext.IconName" size="30" />
        </a>
    </div>
</template>