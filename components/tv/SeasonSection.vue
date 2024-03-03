<script lang="ts" setup>
defineProps<{
    showId: number
    seasons: Season[]
}>()
</script>
<template>
    <Section title="Seasons">
        <template #cards>
            <Cards>
                <Card v-for="s in seasons.filter(x => x.season_number)" :id="showId" :key="s.id" :season-number="s.season_number" :image-path="s.poster_path" :name="s.name" :type="'tv'">
                    <template #additionalInfo>
                        <div class="font-extralight">
                            <p> {{ s.episode_count }} Epsiodes </p>
                        </div>
                    </template>
                </Card>
            </cards>
        </template>
    </Section>
</template>