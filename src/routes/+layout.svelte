<script lang="ts">
    import { theme } from '$lib/stores/theme';
    import { blogs } from '$lib/stores/blogs';
    import { projects } from '$lib/stores/projects';
    import { profile } from '$lib/stores/profile';
    import { contact } from '$lib/stores/contact';
    import { socialLinks } from '$lib/stores/socialLinks';
    import ParticlesBackground from '$lib/components/ParticlesBackground.svelte';
    import '../app.postcss';
    import Navbar from '$lib/components/navbar.svelte';
    import Toast from '$lib/components/Toast.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import { browser } from '$app/environment';
    import { onDestroy, onMount } from 'svelte';
    import { dev } from '$app/environment';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import { page } from '$app/stores';
    import { beforeNavigate, afterNavigate } from '$app/navigation';
    import { showNavbar } from '$lib/stores/ui';
    import type { Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();
    
    let isStargaze = $derived($page.url.pathname.startsWith('/stargaze'));
    let isResume = $derived($page.url.pathname.startsWith('/resume'));
    let isBlogPost = $derived($page.url.pathname.match(/^\/blogs\/[^/]+$/));
    
    let showWarpTransition = $state(false);
    let warpDirection: 'in' | 'out' = $state('in');
    let contentZoom = $state('');

    if (browser) {
        injectAnalytics();
        injectSpeedInsights();
    }
    
    if (!dev) {
        injectSpeedInsights();
        injectAnalytics();
    }

    beforeNavigate(({ to, from }) => {
        const toStargaze = to?.url.pathname.startsWith('/stargaze');
        const fromStargaze = from?.url.pathname.startsWith('/stargaze');
        
        if (toStargaze && !fromStargaze) {
            // Entering stargaze
            warpDirection = 'in';
            contentZoom = 'zoom-out';
            showWarpTransition = true;
        } else if (!toStargaze && fromStargaze) {
            // Exiting stargaze
            warpDirection = 'out';
            contentZoom = 'zoom-in';
            showWarpTransition = true;
        }
    });

    afterNavigate(() => {
        if (showWarpTransition) {
            setTimeout(() => {
                showWarpTransition = false;
                contentZoom = '';
            }, 1800);
        }
    });

    onMount(async () => {
        theme.init();
        await profile.load();
        
        if (browser && typeof window !== 'undefined' && 
            'updateFavicon' in window && $profile.favicon) {
            (window as any).updateFavicon($profile.favicon);
        }
    });

    $effect(() => {
        if (browser && typeof window !== 'undefined' && 
            'updateFavicon' in window && $profile.favicon) {
            (window as any).updateFavicon($profile.favicon);
        }
    });

    onDestroy(() => {
        blogs.cleanup();
        projects.cleanup();
        profile.cleanup();
        contact.cleanup();
        socialLinks.cleanup();
    });
</script>

<div class="min-h-screen relative {contentZoom}">
    {#if !isResume && !isBlogPost}
        {#if isStargaze}
            <ParticlesBackground
                quantity={$profile.particlesQuantity/3}
                staticity={2000}
                ease={500}  
            />
        {:else}
            <ParticlesBackground
                quantity={$profile.particlesQuantity}
                staticity={20}
                ease={10}  
            />
        {/if}

        {#if $showNavbar}
            <Navbar/>
        {/if}
    {:else if !isResume}
        {#if $showNavbar}
            <Navbar/>
        {/if}
    {/if}

    <main class="{isResume ? '' : isBlogPost ? '' : 'pt-8 md:pt-28 px-4'}">
        {@render children()}
    </main>
    <Toast />
    <LoadingSpinner />
    {#if !isResume}
    <footer class="w-full py-3 px-4 mt-16 border-t border-neutral-200 dark:border-neutral-700 relative z-10">
        <div class="container mx-auto flex justify-center items-center">
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
                © {new Date().getFullYear()} . Shrishesha
            </p>
        </div>
    </footer>
    {/if}
</div>

<!-- Warp Speed Transition -->
{#if showWarpTransition}
    <div class="fixed inset-0 z-[9999] pointer-events-none overflow-hidden bg-black warp-container {warpDirection}">
        <div class="warp-speed">
            {#each Array(250) as _, i}
                {@const angle = (i / 250) * Math.PI * 2 + (Math.random() * 0.1)}
                {@const delay = Math.random() * 0.15}
                {@const duration = 0.6 + Math.random() * 12}
                {@const brightness = 0.7 + Math.random() * 1.3}
                {@const length = 80 + Math.random() * 240}
                <div 
                    class="star-streak"
                    style="
                        left: 50%;
                        top: 50%;
                        animation-delay: {delay}s;
                        animation-duration: {duration}s;
                        --brightness: {brightness};
                        --angle: {angle}rad;
                        --length: {length}vh;
                        transform: rotate({angle}rad);
                    "
                ></div>
            {/each}
        </div>
        <div class="center-flash"></div>
    </div>
{/if}

<style>
    .zoom-out {
        animation: pageZoomOut 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .zoom-in {
        animation: pageZoomIn 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes pageZoomOut {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    @keyframes pageZoomIn {
        0% {
            transform: scale(0.1);
            opacity: 0;
        }
        50% {
            transform: scale(0.5);
            opacity: 0.3;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    .warp-container {
        animation: containerFade 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .warp-container.out {
        animation: containerFadeReverse 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes containerFade {
        0% { opacity: 1; }
        85% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    @keyframes containerFadeReverse {
        0% { opacity: 1; }
        80% { opacity: 1; }
        100% { opacity: 0; }
    }

    .warp-speed {
        position: absolute;
        inset: 0;
    }

    .center-flash {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 60px 30px rgba(255, 255, 255, 0.8),
                    0 0 100px 60px rgba(255, 255, 255, 0.4);
        animation: flashPulse 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .out .center-flash {
        animation: flashPulseReverse 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes flashPulse {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        30% { opacity: 1; transform: translate(-50%, -50%) scale(3); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    }
    
    @keyframes flashPulseReverse {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.1); }
        30% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
        70% { opacity: 1; transform: translate(-50%, -50%) scale(3); }
        100% { opacity: 1; transform: translate(-50%, -50%) scale(5); }
    }

    .star-streak {
        position: absolute;
        width: 1.5px;
        height: 0;
        transform-origin: center top;
        background: linear-gradient(to bottom, 
            rgba(255, 255, 255, 1) 0%,
            rgba(200, 220, 255, 0.8) 30%,
            rgba(150, 180, 255, 0.4) 70%,
            rgba(100, 150, 255, 0) 100%
        );
        opacity: var(--brightness);
    }

    .warp-container.in .star-streak {
        animation: streakOut 1.5s cubic-bezier(0.4, 0, 0.8, 1) forwards;
    }

    .warp-container.out .star-streak {
        animation: streakIn 1.2s cubic-bezier(0.8, 0, 0.4, 1) forwards;
    }

    @keyframes streakOut {
        0% {
            height: 0;
            opacity: 0;
        }
        15% {
            opacity: var(--brightness);
        }
        100% {
            height: var(--length);
            opacity: 0;
        }
    }

    @keyframes streakIn {
        0% {
            height: var(--length);
            opacity: 0;
        }
        25% {
            opacity: var(--brightness);
        }
        100% {
            height: 0;
            opacity: 1;
        }
    }
</style>
