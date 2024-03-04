<template>
    <div class="flex flex-col h-screen w-full duration-0">
        <header>
            <slot name="header" />
        </header>
        <main>
            <slot name="main" />
        </main>
        <footer class="mt-auto">
            <slot name="footer" />
        </footer>
    </div>
</template>