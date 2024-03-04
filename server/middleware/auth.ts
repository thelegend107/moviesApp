export default defineEventHandler(async (event) => {
    const clientIP = event.headers.get("x-forwarded-for");
    if (clientIP) console.log(clientIP)
})