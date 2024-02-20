export default defineEventHandler(async (event) => {
    let tmdbPath: string = '';
    const tmdb = new TmdbAPI()

    if (event.context.params?.path) tmdbPath = event.context.params.path
    else throw createError({
        statusCode: 404,
        statusMessage: `Not Found: API route: "${event.path}" was not found`
    })

    try {
        return await tmdb.api<PageResult<Media & Person>>(tmdbPath, {
            method: 'GET',
        })
    }
    catch (e: any) {
        const status = e?.response?.status || 500
        setResponseStatus(event, status)
        return {
            error: e,
        }
    }
})