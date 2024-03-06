import CryptoJS from 'crypto-js'
export default defineEventHandler(async (event) => {
    const clientIP = event.headers.get("x-forwarded-for")
    if (!event.path.includes('search') && clientIP)
        console.log(clientIP + ', ' + event)

    const config = useRuntimeConfig()
    const userToken = getCookie(event, 'user-token')

    if (userToken && CryptoJS.AES.decrypt(userToken, config.encryptionKey).toString(CryptoJS.enc.Utf8) != config.public.internalApiKey)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized access to API',
        })
})