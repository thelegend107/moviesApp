export class TmdbAPI {
    api;

    constructor() {
        const config = useRuntimeConfig();
        this.api = $fetch.create({
            baseURL: config.public.tmdbBase,
            headers: {
                Authorization: 'bearer ' + config.tmdbAccessToken,
                Accept: 'application/json',
            },
            retry: 3,
            retryDelay: 500,
            params: {
                page: 1,
                region: 'US',
                language: 'en-US'
            }
        })
    }
}