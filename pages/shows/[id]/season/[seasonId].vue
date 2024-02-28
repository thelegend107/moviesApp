<script lang="tsx" setup>
const route = useRoute()
interface RouteParams {
    id: number,
    seasonId: number
}

const params: RouteParams = {
    id: Number.parseInt(route.params.id as string),
    seasonId: Number.parseInt(route.params.seasonId as string)
}
</script>

<template>
    <div>
        {{ params.id }}
        SEASONS!
        {{ params.seasonId }}
    </div>
</template>