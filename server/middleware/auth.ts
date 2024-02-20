export default defineEventHandler(async (event) => {
    try {
        const host = await $fetch<IpInfo>('http://ipinfo.io/json');
        const clientIP = event.headers.get("x-forwarded-for");

        if (clientIP != '127.0.0.1' && host.ip != clientIP) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized access to API',
            })
        }
    }
    catch (error) {
        console.log(error);
    }
})