<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { profile } from '$lib/stores/profile';

    let showName = true;
    let showContent = false;
    let zoomPhase = 'start';

    onMount(() => {
        setTimeout(() => {
            zoomPhase = 'zooming';
            setTimeout(() => {
                zoomPhase = 'end';
                setTimeout(() => {
                    showName = false;
                    showContent = true;
                }, 800);
            }, 2000);
        }, 800);
    });
</script>

{#if showName}
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
        <slot />
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