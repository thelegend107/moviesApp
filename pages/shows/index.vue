<script lang="ts" setup>
import type { Interval } from '#imports';

const showsList = ref<QueryItem[]>([])
queryList.tv.forEach((q) => {
    showsList.value.push(q)
})

function handleSectionIntervalChange(detail: { sectionId: number, interval: Interval }) {
    console.log(detail)
    console.log(showsList.value)
    const index = showsList.value.findIndex(x => x.id == detail.sectionId)
    if (index != -1)
        showsList.value[index].interval = detail.interval
}
</script>
<template>
    <div @section-interval-change="(e: CustomEvent) => { handleSectionIntervalChange(e.detail) }">
        <MainList v-for="si in showsList" :key="si.path + si.interval" :query-item="si" :section-id="si.id" />
    </div>
</template>