<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import ConstellationMap from "$lib/components/ConstellationMap.svelte";

    let showGuide = true;
    let wrapper: HTMLDivElement | null = null;

    // Auto-hide guide after a short delay, but keep it dismissible
    const GUIDE_DURATION = 7500; // ms

    onMount(() => {
        // focus wrapper so Escape key can close the guide
        if (wrapper) wrapper.focus();
        const t = setTimeout(() => (showGuide = false), GUIDE_DURATION);
        return () => clearTimeout(t);
    });

    function closeGuide() {
        showGuide = false;
    }

    function onKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') closeGuide();
    }
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="min-h-screen relative" bind:this={wrapper} tabindex="0" on:keydown={onKeydown} role="application" aria-label="Interactive constellation map">
    <ConstellationMap />

    {#if showGuide}
        <!-- Overlay - use inert instead of aria-hidden to properly handle focus -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div 
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" 
            on:click={closeGuide} 
            role="presentation"
            transition:fade
        >
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div class="max-w-md w-[90%] bg-white/10 dark:bg-neutral-900/40 backdrop-blur-lg rounded-xl p-6 mx-4 shadow-lg border border-white/5 text-center" on:click|stopPropagation transition:fly={{ y: 8, duration: 300 }} role="dialog" aria-modal="true" aria-label="Stargaze guide">
                <h2 class="text-xl font-bold text-white mb-2">Welcome to Stargaze ✨</h2>
                <p class="text-sm text-neutral-300 mb-4">Quick tips to get started — this will disappear in a few seconds.</p>

                <ul class="text-left text-sm text-neutral-200 space-y-2 mb-4">
                    <li class="flex items-start gap-3"><span class="w-6 text-primary-400"><i class="fas fa-hand-pointer"></i></span>Click a star to target it</li>
                    <li class="flex items-start gap-3"><span class="w-6 text-primary-400"><i class="fas fa-mouse-pointer"></i></span>Double-click the same star to zoom into its system</li>
                    <li class="flex items-start gap-3"><span class="w-6 text-primary-400"><i class="fas fa-arrows-alt-v"></i></span>Scroll to zoom, drag to rotate</li>
                    <li class="flex items-start gap-3"><span class="w-6 text-primary-400"><i class="fas fa-esc"></i></span>Press <span class="font-semibold mx-1">Esc</span> or click anywhere to close</li>
                </ul>

                <div class="flex justify-center">
                    <button class="px-4 py-2 rounded-md bg-primary-500 text-white font-semibold hover:opacity-95" on:click={closeGuide}>Got it</button>
                </div>
            </div>
        </div>
    {/if}
</div>
