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
            params: {
                page: 1,
                regions: 'US',
                language: 'en-US'
            }
        })
    }
}