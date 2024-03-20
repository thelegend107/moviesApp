<script lang="ts" setup>
import type { Interval } from '#imports';

const moviesList = ref<QueryItem[]>([])
queryList.movies.forEach((q) => {
    moviesList.value.push(q)
})

function handleSectionIntervalChange(detail: { sectionId: number, interval: Interval }) {
    console.log(detail)
    console.log(moviesList.value)
    const index = moviesList.value.findIndex(x => x.id == detail.sectionId)
    if (index != -1)
        moviesList.value[index].interval = detail.interval
}
</script>
<template>
    <div @section-interval-change="(e: CustomEvent) => { handleSectionIntervalChange(e.detail) }">
        <MainList v-for="si in moviesList" :key="si.path + si.interval" :query-item="si" :section-id="si.id" />
    </div>
</template>