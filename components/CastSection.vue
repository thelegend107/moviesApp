<script setup lang="ts">
withDefaults(defineProps<{
    title?: string
    cast: Person[]
}>(), {
    title: "Top Cast"
})
</script>

<template>
    <Section v-if="cast.length > 0" :title="title">
        <template #cards>
            <Cards>
                <Card v-for="c in cast" :id="c.id" :key="c.id" :image-path="c.profile_path" :name="c.name" :type="'person'">
                    <template #additionalInfo>
                        <p class="font-extralight">
                            {{ c.character }}
                        </p>
                    </template>
                </Card>
            </cards>
        </template>
    </Section>
</template>
