<script setup lang="ts">
const headline: string = "Embark on a Cinematic Journey"
const subhead: string = "Start Exploring Now"

</script>
<template>
    <div>
        <HeroSection :headline="headline" :subhead="subhead" />
        <MainList v-for="si in queryList.trending" :key="si.path" :query-item="si" />
    </div>
</template>