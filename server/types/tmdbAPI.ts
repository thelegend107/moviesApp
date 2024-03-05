import axios from "axios";

export class TmdbAPI {
    api;

    constructor(credits: boolean = false, videos: boolean = false, images: boolean = false, aggregate_credits: boolean = false, query: string | undefined = undefined) {
        const config = useRuntimeConfig();
        let appendToResponse = 'combined_credits,content_ratings,external_ids,release_dates'

        if (videos)
            appendToResponse += ',videos'

        if (images)
            appendToResponse += ',images'

        if (credits)
            appendToResponse += ',credits'

        if (aggregate_credits)
            appendToResponse += ',aggregate_credits'


        this.api = axios.create({
            baseURL: config.public.tmdbBase,
            headers: {
                Authorization: 'bearer ' + config.tmdbAccessToken,
                Accept: 'application/json',
            },
            params: {
                page: 1,
                query: query ? query : undefined,
                region: 'US',
                language: 'en',
                append_to_response: appendToResponse
            }
        })
    }
}