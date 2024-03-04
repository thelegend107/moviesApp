export default defineEventHandler(async (event) => {
    try {
        const clientIP = event.headers.get("x-forwarded-for");
        console.log(clientIP)
        if (clientIP != '127.0.0.1') {
            const host = await $fetch<IpInfo>('http://ipinfo.io/json');
            if (host.ip != clientIP) throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized access to API',
            })
        }
    }
    catch (error) {
        console.log(error);
    }
})