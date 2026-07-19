<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { profile } from '$lib/stores/profile';
    import { loading } from '$lib/stores/loading';
    import type { Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();

    let showName = $state(true);
    let showContent = $state(false);
    let zoomPhase = $state('start');
    let audio: HTMLAudioElement;
    let isProfileLoaded = $state(false);

    async function startAnimation() {
        try {
            await profile.load();
            isProfileLoaded = true;
            
            // Initialize audio after profile is loaded
            audio = new Audio('/sounds/cinematic-whoosh.mp3');
            audio.volume = 0.4;
            audio.preload = 'auto';

            // Start animation sequence
            setTimeout(() => {
                audio?.play().catch(() => {/* ignore audio errors */});
                zoomPhase = 'zooming';
                setTimeout(() => {
                    zoomPhase = 'end';
                    setTimeout(() => {
                        showName = false;
                        showContent = true;
                    }, 800);
                }, 2000);
            }, 800);
        } catch (error) {
            console.error('Error loading profile:', error);
            // Fallback to show content if profile loading fails
            showName = false;
            showContent = true;
        }
    }

    onMount(() => {
        loading.show();
        startAnimation().finally(() => {
            loading.hide();
        });

        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    });
</script>

{#if showName && isProfileLoaded}
    <div 
        class="fixed inset-0 bg-neutral-900 dark:bg-black z-[100] flex items-center justify-center overflow-hidden"
        transition:fade={{ duration: 2500 }}
    >
        <h1 
            class="text-4xl md:text-6xl lg:text-8xl font-bold text-white transition-all duration-[2500ms] ease-out"
            class:zoom-start={zoomPhase === 'start'}
            class:zoom-animate={zoomPhase === 'zooming'}
            class:zoom-end={zoomPhase === 'end'}
        >
            {$profile.name || 'Shrishesha'}
        </h1>
    </div>
{/if}

{#if showContent}
    <div 
        class="relative w-full h-full"
        transition:fade={{ duration: 1500, delay: 300 }}
    >
        {@render children()}
    </div>
{/if}

<style>
    .zoom-start {
        transform: scale(20);
        opacity: 0;
        filter: blur(4px);
        will-change: transform, opacity, filter;
    }

    .zoom-animate {
        transform: scale(1);
        opacity: 1;
        filter: blur(0px);
    }

    .zoom-end {
        transform: scale(0.5);
        opacity: 0;
        filter: blur(2px);
    }

    h1 {
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
</style>