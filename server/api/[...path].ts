import axios from "axios"

export default defineEventHandler(async (event) => {
    let tmdbPath: string = ''
    const query = getQuery(event)

    //const tmdb = new TmdbAPI((query.credits === 'true'), (query.videos === 'true'), (query.images === 'true'), (query.aggregate_credits === 'true'))
    if (event.context.params?.path) tmdbPath = event.context.params.path
    else throw createError({
        statusCode: 404,
        statusMessage: `Not Found: API route: "${event.path}" was not found`
    })

    const config = useRuntimeConfig();
    const appendToResponse = 'combined_credits,content_ratings,external_ids,release_dates'

    const { data } = await axios.get(config.public.tmdbBase + tmdbPath, {
        headers: {
            Authorization: 'bearer ' + config.tmdbAccessToken,
        },
        params: {
            page: 1,
            region: 'US',
            language: 'en',
            append_to_response: appendToResponse
        }
    }).catch((error) => {
        throw createError(error)
    })

    return data
})

// export default defineEventHandler(async (event) => {
//     let tmdbPath: string = ''
//     const query = getQuery(event)


//     else throw createError({
//         statusCode: 404,
//         statusMessage: `Not Found: API route: "${event.path}" was not found`
//     })

//     try {
//         return await tmdb.api(tmdbPath, {
//             method: 'GET',
//         })
//     }
//     catch (e: any) {
//         const status = e?.response?.status || 500
//         setResponseStatus(event, status)
//         return {
//             error: e,
//         }
//     }
// })