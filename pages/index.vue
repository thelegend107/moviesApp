<script setup lang="ts">
import type { Interval } from '#imports';

const headline: string = "Embark on a Cinematic Journey"
const subhead: string = "Start Exploring Now"

const trendingList = ref<QueryItem[]>([])
queryList.trending.forEach((q) => {
    trendingList.value.push(q)
})

function handleSectionIntervalChange(detail: { sectionId: number, interval: Interval }) {
    const index = trendingList.value.findIndex(x => x.id == detail.sectionId)
    if (index != -1)
        trendingList.value[index].interval = detail.interval
}
</script>
<template>
    <div @section-interval-change="(e: CustomEvent) => { handleSectionIntervalChange(e.detail) }">
        <HeroSection :headline="headline" :subhead="subhead" />
        <MainList v-for="si in trendingList" :key="si.path + si.interval" :section-id="si.id" :query-item="si" />
    </div>
</template>