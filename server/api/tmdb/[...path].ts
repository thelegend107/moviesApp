import type { AxiosError } from "axios"
import CryptoJS from 'crypto-js';

export default defineEventHandler(async (event) => {
    // Check if path exists
    let tmdbPath: string = ''
    const config = useRuntimeConfig()
    const query = getQuery(event)

    if (event.context.params?.path) tmdbPath = event.context.params.path
    else throw createError({
        statusCode: 404,
        statusMessage: `Not Found: API route: "${event.path}" was not found`
    })

    // Check if Authorized
    let decryptedAuth = ''
    const auth = event.headers.get('Authorization')
    if (auth)
        decryptedAuth = CryptoJS.AES.decrypt(auth, config.encryptionKey).toString(CryptoJS.enc.Utf8);

    if (decryptedAuth != config.public.internalApiKey) throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized access to API',
    })

    try {
        const tmdb = new TmdbAPI((query.credits === 'true'), (query.videos === 'true'), (query.images === 'true'), (query.aggregate_credits === 'true'))
        const { data } = await tmdb.api(tmdbPath)
        return data
    }
    catch (e) {
        const error = e as AxiosError & Error
        throw createError({
            statusMessage: error.message
        })
    }
})