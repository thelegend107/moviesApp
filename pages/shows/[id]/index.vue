<script lang="tsx" setup>
const route = useRoute()

const id: number = Number.parseInt(route.params.id.toString())
</script>

<template>
    <div>
        <Details :id="id" type="tv" />
    </div>
</template>