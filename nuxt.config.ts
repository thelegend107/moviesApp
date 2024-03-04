// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        imports: {
            dirs: ['server', 'server/middleware/**', 'server/types/**'],
        }
    },
    imports: {
        dirs: ["stores", "types", "components/**"],
        global: true
    },
    css: ["~/assets/main.scss"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    typescript: {
        typeCheck: true,
        strict: true,
        shim: false
    },
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    modules: ["@nuxtjs/color-mode", '@pinia/nuxt', 'nuxt-icon', '@nuxt/image'],
    image: {
        format: ['webp']
    },
    colorMode: {
        preference: 'dark', // default value of $colorMode.preference
        fallback: 'dark', // fallback value if not system preference found
        hid: 'nuxt-color-mode-script',
        globalName: '__NUXT_COLOR_MODE__',
        componentName: 'ColorScheme',
        classPrefix: '',
        classSuffix: '',
        storageKey: 'nuxt-color-mode'
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    runtimeConfig: {
        internalApiKey: process.env.VITE_INTERNAL_API_KEY,
        tmdbAccessToken: process.env.TMDB_ACCESS_TOKEN,
        public: {
            tmdbBase: process.env.TMDB_BASE,
            tmdbImgBase: process.env.TMDB_IMG_BASE,
            youtubeVideoBase: process.env.YOUTUBE_VIDEO_BASE
        }
    },
});