<script lang="ts" setup>
const mode = useColorMode()
</script>

<template>
    <div class="flex flex-col md:flex-row gap-4 justify-between p-8">
        <div class="flex flex-col gap-4 md:gap-1">
            <div class="flex gap-1 items-center">
                <p>Made with: </p>
                <a target="_blank" href="https://vercel.com">
                    <Icon :name="mode.value == 'dark' ? 'vscode-icons:file-type-vercel' : 'vscode-icons:file-type-light-vercel'" size="30" />
                </a>
                <a target="_blank" href="https://nuxt.com">
                    <Icon name="vscode-icons:file-type-nuxt" size="35" />
                </a>
                <a target="_blank" href="https://tailwindcss.com">
                    <Icon name="vscode-icons:file-type-tailwind" size="35" />
                </a>
                <a target="_blank" href="https://typescriptlang.org">
                    <Icon name="vscode-icons:file-type-typescript-official" size="30" />
                </a>
            </div>
            <p>This project uses the TMDB API but is not endorsed or certified by TMDB</p>
        </div>
        <div class="flex flex-col gap-1">
            <h3>Moe Ayoub</h3>
            <ul class="flex gap-2">
                <li>
                    <a target="_blank" href="https://www.linkedin.com/in/mhayoub/">
                        <Icon name="mdi:linkedin" />
                    </a>
                </li>
                <li>
                    <a target="_blank" href="https://github.com/thelegend107/moviesApp">
                        <Icon name="mdi:github" />
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>