<script setup lang="ts">
const prop = defineProps<{
    crew?: Person[],
    creators?: Person[],
    type: MediaType
}>()

const showCreators = ref<Person[]>([]);
const directors = ref<Person[]>([]);
const writers = ref<Person[]>([]);

if (prop.type == 'movie' && prop.crew) {
    prop.crew.filter(x => x.job == 'Screenplay' || x.job == 'Story' || x.job == 'Writer').forEach(p => {
        if (writers.value.findIndex(x => x.id == p.id) == -1)
            writers.value.push(p);
    })

    prop.crew.filter(x => x.job == 'Director').forEach(p => {
        if (directors.value.findIndex(x => x.id == p.id) == -1)
            directors.value.push(p);
    })
}
else if (prop.type == 'tv' && prop.creators) {
    showCreators.value = prop.creators
}
</script>

<template>
    <div v-if="type == 'movie' && (directors.length > 0 || writers.length > 0)" class="flex flex-col gap-1">
        <CrewCategory title="Directors" :people="directors" />
        <CrewCategory title="Writers" :people="writers" />
    </div>
    <div v-else-if="type == 'tv' && showCreators.length > 0" class="flex flex-col gap-1">
        <CrewCategory title="Creators" :people="showCreators" />
    </div>
</template>
