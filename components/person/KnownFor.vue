<script lang="ts" setup>
const prop = defineProps<{
    knownForDepartment?: string
    combinedCredits: CombinedCredits
}>()

const nonActorRoles = ref<{ media: Media, jobs: string[] }[]>([]);
if (prop.combinedCredits && prop.combinedCredits && prop.combinedCredits.crew) {
    prop.combinedCredits.crew.forEach(m => {
        if (m.job) {
            const existingRoleIndex = nonActorRoles.value.findIndex(x => x.media.id == m.id)
            if (existingRoleIndex == -1)
                nonActorRoles.value.push({ media: m, jobs: [m.job] })
            else {
                nonActorRoles.value[existingRoleIndex].jobs.push(m.job)
            }
        }
    })
} 
</script>
<template>
    <div :class="knownForDepartment && knownForDepartment != 'Acting' ? 'flex flex-col-reverse' : 'flex flex-col'">
        <Section v-if="(combinedCredits.cast && combinedCredits.cast.length > 0)" :title="knownForDepartment == 'Acting' ? 'Known For' : 'Known For (Cast)'">
            <template #cards>
                <Cards>
                    <Card v-for="c in combinedCredits.cast" :id="c.id" :key="c.id + 1" :image-path="c.poster_path" :name="c.name || c.title" :type="c.media_type">
                        <template #additionalInfo>
                            <p class="font-extralight">
                                {{ c.character }}
                            </p>
                        </template>
                    </Card>
                </cards>
            </template>
        </Section>
        <Section v-if="nonActorRoles.length > 0" :title="knownForDepartment != 'Acting' ? 'Known For' : 'Known For (Crew)'">
            <template #cards>
                <Cards>
                    <Card v-for="c in nonActorRoles" :id="c.media.id" :key="c.media.id" :image-path="c.media.poster_path" :name="c.media.name || c.media.title" :type="c.media.media_type">
                        <template #additionalInfo>
                            <p class="font-extralight">
                                {{ c.jobs.join(', ') }}
                            </p>
                        </template>
                    </Card>
                </cards>
            </template>
        </Section>
    </div>
</template>