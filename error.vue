<script setup lang="ts">
import type { NuxtError } from '#app'

const prop = defineProps({
    error: Object as () => NuxtError
})

console.log(prop.error);
</script>

<template>
    <div class="h-screen w-screen flex flex-col items-center justify-center">
        <p class="text-8xl sm:text-10xl font-medium leading-tight">
            {{ error?.statusCode }}
        </p>
        <p class="text-2xl sm:text-3xl font-light leading-tight mb-5">
            {{ error?.message }}
        </p>
        <NuxtLink class="btn btn-primary" to="/" @click="$router.push('/')">
            <Icon name="ri:home-fill" size="24" />
            <p>Go back home</p>
        </NuxtLink>
    </div>
</template>
