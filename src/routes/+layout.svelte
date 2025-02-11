<script lang="ts">
    import { theme } from '$lib/stores/theme';
    import { blogs } from '$lib/stores/blogs';
    import { projects } from '$lib/stores/projects';
    import { profile } from '$lib/stores/profile';
    import { contact } from '$lib/stores/contact';
    import '../app.postcss';
    import Navbar from '$lib/components/navbar.svelte';
    import Toast from '$lib/components/Toast.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import { browser } from '$app/environment';
    import { onDestroy, onMount } from 'svelte';
    import { dev } from '$app/environment';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';

    let lightVideo: HTMLVideoElement;
    let darkVideo: HTMLVideoElement;

    interface LayoutData {
        children: any;
    }
        // svelte-ignore export_let_unused
        export let data: LayoutData;

    if (!dev) {
        injectSpeedInsights();
        injectAnalytics();
    }

    onMount(async () => {
        theme.init();
        await profile.load();
        
        if (browser && typeof window !== 'undefined' && 
            'updateFavicon' in window && $profile.favicon) {
            (window as any).updateFavicon($profile.favicon);
        }

        const lightVideo = document.querySelector('.video-bg.light') as HTMLVideoElement;
        const darkVideo = document.querySelector('.video-bg.dark') as HTMLVideoElement;

        if (lightVideo) lightVideo.playbackRate = 1;
        if (darkVideo) darkVideo.playbackRate = 0.7;
    });

    $: if (browser && typeof window !== 'undefined' && 
        'updateFavicon' in window && $profile.favicon) {
        (window as any).updateFavicon($profile.favicon);
    }

    onDestroy(() => {
        blogs.cleanup();
        projects.cleanup();
        profile.cleanup();
        contact.cleanup();
    });
</script>

<div class="min-h-screen relative">
    
    <div class="absolute inset-0 bg-background/50 -z-10"></div>
    <video
        bind:this={lightVideo}
        class="video-bg light"
        autoplay
        loop
        muted
        playsinline
        poster="/light-poster.jpg"
    >
        <source src="/videos/light-bg.mp4" type="video/mp4">
    </video>

    <video
        bind:this={darkVideo}
        class="video-bg dark"
        autoplay
        loop
        muted
        playsinline
        poster="/dark-poster.jpg"
    >
        <source src="/videos/dark-bg.mp4" type="video/mp4">
    </video>

    <div class="video-overlay"></div>
    <Navbar/>
    <main class="pt-8 md:pt-28 px-4">
        <slot />
    </main>
    <Toast />
    <LoadingSpinner />
    <footer class="w-full py-3 px-4 mt-16 border-t border-neutral-200 dark:border-neutral-700 relative z-10">
        <div class="container mx-auto flex justify-center items-center">
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
                © {new Date().getFullYear()} . Shrishesha
            </p>
        </div>
    </footer>
</div>