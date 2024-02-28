<template>
    <div>
        <MainList v-for="si in queryList.movies" :key="si.path" :query-item="si" />
    </div>
</template>