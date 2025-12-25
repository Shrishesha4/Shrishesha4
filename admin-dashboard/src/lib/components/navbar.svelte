<script lang="ts">
    import '../../app.css';
    import { onMount } from 'svelte';
    import { theme } from '$lib/stores/theme';
    // import { page } from '$app/stores';

    let isMobile = false;
    let lastScrollY = 0;
    let isVisible = true;
    let pathname = '/'; // Placeholder

    onMount(() => {
        pathname = window.location.pathname;
        theme.init();
        checkMobile();
        window.addEventListener('resize', checkMobile);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('scroll', handleScroll);
        };
    });

    function checkMobile() {
        isMobile = window.innerWidth < 768;
    }

    function handleScroll() {
        if (isMobile) {
            const currentScrollY = window.scrollY;
            isVisible = currentScrollY < lastScrollY || currentScrollY < 50;
            lastScrollY = currentScrollY;
        }
    }
</script>

<nav 
    class="fixed {isMobile ? 'bottom-6' : 'top-6'} left-1/2 transform -translate-x-1/2 z-[100] w-auto transition-transform duration-300"
    style={isMobile ? `transform: translate(-50%, ${isVisible ? '0' : '150%'})` : ''}
>
    <div class="bg-white/20 dark:bg-neutral-900/20 backdrop-blur-md border border-white/30 dark:border-neutral-700/30 px-8 py-3 rounded-full flex items-center gap-8 shadow-lg">
        <a 
            href="/" 
            class="flex items-center gap-2 {pathname === '/' ? 'text-black/90 dark:text-white' : 'text-black/60 dark:text-neutral-400'} hover:text-black dark:hover:text-white transition-colors"
        >
            <i class="fas fa-home text-xl"></i>
            {#if !isMobile}<span>Home</span>{/if}
        </a>
        <a 
            href="/aboutme" 
            class="flex items-center gap-2 {pathname === '/aboutme' ? 'text-black/90 dark:text-white' : 'text-black/60 dark:text-neutral-400'} hover:text-black dark:hover:text-white transition-colors"
        >
            <i class="fas fa-user text-xl"></i>
            {#if !isMobile}<span>About</span>{/if}
        </a>
        <a 
            href="/projects" 
            class="flex items-center gap-2 {pathname === '/projects' ? 'text-black/90 dark:text-white' : 'text-black/60 dark:text-neutral-400'} hover:text-black dark:hover:text-white transition-color"
        >
            <i class="fas fa-code text-xl"></i>
            {#if !isMobile}<span>Projects</span>{/if}
        </a>
        <a 
            href="/blogs" 
            class="flex items-center gap-2 {pathname === '/blogs' ? 'text-black/90 dark:text-white' : 'text-black/60 dark:text-neutral-400'} hover:text-black dark:hover:text-white transition-colors"
        >
            <i class="fas fa-blog text-xl"></i>
            {#if !isMobile}<span>Blog</span>{/if}
        </a>
        <a 
            href="/contact" 
            class="flex items-center gap-2 {pathname === '/contact' ? 'text-black/90 dark:text-white' : 'text-black/60 dark:text-neutral-400'} hover:text-black dark:hover:text-white transition-colors"
        >
            <i class="fas fa-envelope text-xl"></i>
            {#if !isMobile}<span>Contact</span>{/if}
        </a>
        <a 
            href="/stargaze" 
            class="flex items-center gap-2 {pathname === '/stargaze' ? 'text-black/90 dark:text-white' : 'text-black/60 dark:text-neutral-400'} hover:text-black dark:hover:text-white transition-colors"
        >
            <i class="fas fa-star"></i>
            {#if !isMobile}<span>Stargaze</span>{/if}
        </a>
    </div>
</nav>