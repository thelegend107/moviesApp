export default defineNuxtPlugin(async () => {
    let auth = ''
    const config = useRuntimeConfig()

    const { data, error } = await useFetch<string>('/api/encrypt/' + config.public.internalApiKey)
    if (!error.value && data.value) auth = data.value

    const api = $fetch.create({
        baseURL: '/api/tmdb/',
        headers: {
            Authorization: auth
        }
    })

    return {
        provide: {
            tmdbAPI: api
        }
    }
})