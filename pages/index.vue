<script setup lang="ts">
const headline: string = "Embark on a Cinematic Journey"
const subhead: string = "Start Exploring Now"

</script>
<template>
    <div>
        <HeroSection :headline="headline" :subhead="subhead" />
        <Section v-for="si in queryList.trending" :key="si.path" :title="si.title" :query-item="si" />
    </div>
</template>