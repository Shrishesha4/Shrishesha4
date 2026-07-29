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
    import ThemeToggle from '$lib/components/ThemeToggle.svelte';
    import WarpPageTransition from '$lib/components/warp/WarpPageTransition.svelte';
    import type { WarpTransitionKeyframe } from '$lib/components/warp/WarpPageTransition.svelte';
    import { browser } from '$app/environment';
    import { onDestroy, onMount } from 'svelte';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import { page } from '$app/stores';
    import { onNavigate } from '$app/navigation';
    import { showNavbar } from '$lib/stores/ui';
    import type { Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();
    
    let isStargaze = $derived($page.url.pathname.startsWith('/stargaze'));
    let isResume = $derived($page.url.pathname.startsWith('/resume'));
    let isBlogPost = $derived($page.url.pathname.match(/^\/blogs\/[^/]+$/));
    let isHome = $derived($page.url.pathname === '/');

    let warpActive = $state(false);
    let coverNavigation: (() => void) | null = null;
    let coverPromise: Promise<() => void> | null = null;
    const speed = 0.55;
    const density = 280;
    const trail = 1.8;
    const transitionBoost = 3;
    const transitionDuration = 900;
    const transitionKeyframes = $derived.by<readonly WarpTransitionKeyframe[]>(() => {
        const peakTrail = Math.min(5, trail * 2.5 + 0.5);

        return [
            {
                offset: 0,
                speed,
                trail,
                opacity: 0.45,
                brightness: 6,
                glowIntensity: 4,
                flareIntensity: 0,
                easing: 'ease-in-cubic'
            },
            {
                offset: 0.22,
                speed: speed * (1 + (transitionBoost - 1) * 0.32),
                trail: trail + (peakTrail - trail) * 0.32,
                opacity: 0.78,
                brightness: 10,
                glowIntensity: 7,
                flareIntensity: 0.6,
                easing: 'ease-in-out-cubic'
            },
            {
                offset: 0.68,
                speed: speed * (1 + (transitionBoost - 1) * 0.78),
                trail: trail + (peakTrail - trail) * 0.78,
                opacity: 1,
                brightness: 14,
                glowIntensity: 10,
                flareIntensity: 1.1,
                easing: 'ease-out-cubic'
            },
            {
                offset: 1,
                speed: speed * transitionBoost,
                trail: peakTrail,
                opacity: 1,
                brightness: 16,
                glowIntensity: 12,
                flareIntensity: 1.4
            }
        ];
    });

    // Only inject analytics once - in browser environment
    if (browser) {
        injectAnalytics();
        injectSpeedInsights();
    }

    onNavigate(({ from, to, willUnload }) => {
        const fromStargaze = from?.url.pathname.startsWith('/stargaze') ?? false;
        const toStargaze = to?.url.pathname.startsWith('/stargaze') ?? false;

        if (
            willUnload ||
            !from ||
            !to ||
            to.route.id === null ||
            fromStargaze === toStargaze ||
            from.url.href === to.url.href
        ) {
            return;
        }

        if (coverPromise) return coverPromise;

        warpActive = true;
        coverPromise = new Promise<() => void>((resolve) => {
            let cleanedUp = false;

            coverNavigation = () => {
                if (!coverNavigation) return;
                coverNavigation = null;

                resolve(() => {
                    if (cleanedUp) return;
                    cleanedUp = true;
                    warpActive = false;
                    coverPromise = null;
                });
            };
        });

        return coverPromise;
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
        theme.cleanup();
    });
</script>

<div class={['min-h-screen relative', warpActive && 'transitioning']}>
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

    <div class="route-stage" style:--transition-duration={`${transitionDuration}ms`}>
        {#key $page.url.href}
            <div class="route-page" style:--arrival-duration={`${transitionDuration}ms`}>
                <main class="{isResume ? '' : isBlogPost ? '' : 'pt-8 md:pt-28 px-4'}">
                    {@render children()}

                {#if isHome}
                    <ThemeToggle />
                {/if}

                </main>
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
        {/key}
    </div>
    <Toast />
    <LoadingSpinner />
</div>

<WarpPageTransition
    active={warpActive}
    variant="flare"
    background="#141516"
    colorShift={2}
    {density}
    duration={transitionDuration}
    keyframes={transitionKeyframes}
    oncovered={() => coverNavigation?.()}
/>

<style>
    .route-stage {
        min-width: 0;
        perspective: 75rem;
        perspective-origin: 50% 46%;
        transform-origin: 50% 46%;
        backface-visibility: hidden;
    }

    .transitioning .route-stage {
        animation: route-warp-depart var(--transition-duration, 900ms)
            cubic-bezier(0.55, 0.02, 0.88, 0.32) both;
    }

    @keyframes route-warp-depart {
        0% {
            opacity: 1;
            filter: blur(0) saturate(1);
            transform: perspective(75rem) translateZ(0) scale(1) skew(0);
        }

        34% {
            opacity: 0.96;
            filter: blur(0.08rem) saturate(1.12);
            transform: perspective(75rem) translateZ(3rem) scale(1.045, 0.97) skewX(-0.8deg);
        }

        72% {
            opacity: 0.68;
            filter: blur(0.28rem) saturate(1.38) hue-rotate(8deg);
            transform: perspective(75rem) translateZ(13rem) scale(1.28, 0.84) skewX(2.5deg);
        }

        100% {
            opacity: 0.08;
            filter: blur(0.9rem) saturate(1.8) hue-rotate(-12deg);
            transform: perspective(75rem) translateZ(34rem) scale(2.15, 0.58) skewX(-5deg);
        }
    }

    .route-page {
        position: relative;
        transform-origin: 50% 46%;
        backface-visibility: hidden;
        animation: route-hyperdrive-arrival var(--arrival-duration, 900ms)
            cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    @keyframes route-hyperdrive-arrival {
        0% {
            opacity: 0.08;
            filter: blur(0.75rem) saturate(0.72);
            transform: perspective(75rem) translateZ(-28rem) scale(0.72, 1.14) skewX(-5deg);
            will-change: transform, opacity, filter;
        }

        38% {
            opacity: 0.86;
            filter: blur(0.2rem) saturate(0.9);
            transform: perspective(75rem) translateZ(-5rem) scale(0.94, 1.025) skewX(1.2deg);
            will-change: transform, opacity, filter;
        }

        68% {
            opacity: 1;
            filter: blur(0) saturate(1.035);
            transform: perspective(75rem) translateZ(1.25rem) scale(1.035, 0.985) skewX(-0.35deg);
            will-change: transform, opacity, filter;
        }

        92% {
            opacity: 1;
            filter: blur(0) saturate(1);
            transform: perspective(75rem) translateZ(0) scale(1);
            will-change: transform, opacity, filter;
        }

        100% {
            opacity: 1;
            filter: none;
            transform: none;
            will-change: auto;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .route-page,
        .transitioning .route-stage {
            animation: none;
            opacity: 1;
            filter: none;
            transform: none;
            will-change: auto;
        }
    }
</style>
