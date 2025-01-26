<script lang="ts">
    import '../../app.postcss';
    import { onMount } from 'svelte';
    import { theme } from '$lib/stores/theme';
    import { page } from '$app/stores';

    onMount(() => {
        theme.init();
    });

    let isMobile = false;

    onMount(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    });

    function checkMobile() {
        isMobile = window.innerWidth < 768;
    }
</script>

<nav class="fixed {isMobile ? 'bottom-6' : 'top-6'} left-1/2 transform -translate-x-1/2 z-[100] w-auto">
    <div class="bg-neutral-900/80 backdrop-blur-lg px-8 py-3 rounded-full flex items-center gap-8 shadow-lg">
        <a 
            href="/" 
            class="flex items-center gap-2 {$page.url.pathname === '/' ? 'text-white' : 'text-neutral-400'} hover:text-white transition-colors"
        >
            <i class="fas fa-home text-xl"></i>
            {#if !isMobile}<span>Home</span>{/if}
        </a>
        <a 
            href="/aboutme" 
            class="flex items-center gap-2 {$page.url.pathname === '/aboutme' ? 'text-white' : 'text-neutral-400'} hover:text-white transition-colors"
        >
            <i class="fas fa-user text-xl"></i>
            {#if !isMobile}<span>About</span>{/if}
        </a>
        <a 
            href="/projects" 
            class="flex items-center gap-2 {$page.url.pathname === '/projects' ? 'text-white' : 'text-neutral-400'} hover:text-white transition-colors"
        >
            <i class="fas fa-code text-xl"></i>
            {#if !isMobile}<span>Projects</span>{/if}
        </a>
        <a 
            href="/contact" 
            class="flex items-center gap-2 {$page.url.pathname === '/contact' ? 'text-white' : 'text-neutral-400'} hover:text-white transition-colors"
        >
            <i class="fas fa-envelope text-xl"></i>
            {#if !isMobile}<span>Contact</span>{/if}
        </a>
    </div>
</nav>