<template>
    <div>
        <MainList v-for="si in queryList.tv" :key="si.path" :query-item="si" />
    </div>
</template>