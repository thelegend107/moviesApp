import CryptoJS from 'crypto-js';

export default defineEventHandler((event) => {
    let key: string
    if (event.context.params?.key) key = event.context.params.key
    else throw createError({
        statusCode: 404,
        statusMessage: `Not Found: API route: "${event.path}" was not found`
    })

    const config = useRuntimeConfig()
    return CryptoJS.AES.encrypt(key, config.encryptionKey).toString()
})