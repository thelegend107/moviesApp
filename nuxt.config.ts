// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        preset: "azure",
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
        tmdbAccessToken: process.env.NUXT_TMDB_ACCESS_TOKEN,
        public: {
            tmdbBase: process.env.NUXT_TMDB_BASE,
            tmdbImgBase: process.env.NUXT_TMDB_IMG_BASE,
            youtubeVideoBase: process.env.NUXT_YOUTUBE_VIDEO_BASE
        }
    },
});