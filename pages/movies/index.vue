<template>
    <div>
        <MainList v-for="si in queryList.movies" :key="si.path" :title="si.title" :query-item="si" />
    </div>
</template>