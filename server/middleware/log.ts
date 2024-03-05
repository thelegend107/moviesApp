export default defineEventHandler(async (event) => {
    const clientIP = event.headers.get("x-forwarded-for")

    if (!event.path.includes('search') && clientIP)
        console.log(clientIP + ', ' + event)
})