<template>
    <div class="flex flex-col h-screen justify-between">
        <header class="flex flex-col w-full sticky inset-0">
            <slot name="header" />
        </header>
        <main>
            <slot name="main" />
        </main>
        <footer class="mt-auto p-4 flex justify-end">
            <slot name="footer" />
        </footer>
    </div>
</template>