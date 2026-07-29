<script lang="ts">
    import { onMount } from 'svelte';
    import { SvelteSet } from 'svelte/reactivity';
    import { fade } from 'svelte/transition';
    import { profile } from '$lib/stores/profile';

    interface Props {
        oncomplete?: () => void;
    }

    let { oncomplete = () => {} }: Props = $props();

    let visible = $state(true);
    let zoomPhase = $state('start');
    let audio: HTMLAudioElement | null = null;
    const timers = new SvelteSet<ReturnType<typeof setTimeout>>();

    function schedule(callback: () => void, delay: number) {
        const timer = setTimeout(() => {
            timers.delete(timer);
            callback();
        }, delay);
        timers.add(timer);
    }

    function finish() {
        visible = false;
        schedule(oncomplete, 500);
    }

    function startAnimation() {
        audio = new Audio('/sounds/cinematic-whoosh.mp3');
        audio.volume = 0.4;
        audio.preload = 'auto';

        schedule(() => {
            void audio?.play().catch(() => {
                // Browsers may block autoplay; the visual intro still continues.
            });
            zoomPhase = 'zooming';
            schedule(() => {
                zoomPhase = 'end';
                schedule(finish, 800);
            }, 2000);
        }, 800);
    }

    function cleanup() {
        for (const timer of timers) clearTimeout(timer);
        timers.clear();

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            audio.src = '';
            audio = null;
        }
    }

    onMount(() => {
        startAnimation();
        return cleanup;
    });
</script>

{#if visible}
    <div 
        class="fixed inset-0 bg-neutral-900 dark:bg-black z-[100] flex items-center justify-center overflow-hidden"
        transition:fade={{ duration: 500 }}
        aria-hidden="true"
    >
        <h1 
            class={[
                'text-4xl md:text-6xl lg:text-8xl font-bold text-white transition-all duration-[2500ms] ease-out',
                zoomPhase === 'start' && 'zoom-start',
                zoomPhase === 'zooming' && 'zoom-animate',
                zoomPhase === 'end' && 'zoom-end'
            ]}
        >
            {$profile.name || 'Shrishesha'}
        </h1>
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