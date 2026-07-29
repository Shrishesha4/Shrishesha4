<script lang="ts">
    import { onMount } from 'svelte';
    import type { Attachment } from 'svelte/attachments';
    import { fade, fly } from 'svelte/transition';
    import ConstellationMap from "$lib/components/ConstellationMap.svelte";

    let showGuide = $state(false);
    let wrapper: HTMLDivElement | null = null;

    const captureWrapper: Attachment<HTMLDivElement> = (node) => {
        wrapper = node;
        return () => {
            if (wrapper === node) wrapper = null;
        };
    };

    // Auto-hide guide after a short delay, but keep it dismissible
    const GUIDE_DURATION = 7500; // ms
    const GUIDE_DISMISSED_KEY = 'shrishesha:stargaze-guide-dismissed';

    onMount(() => {
        let shouldShowGuide = true;

        try {
            shouldShowGuide = localStorage.getItem(GUIDE_DISMISSED_KEY) === null;
        } catch {
            // Storage may be unavailable; keep the guide usable for this visit.
        }

        if (!shouldShowGuide) return;

        showGuide = true;

        // focus wrapper so Escape key can close the guide
        if (wrapper) wrapper.focus();
        const timeoutId = setTimeout(() => (showGuide = false), GUIDE_DURATION);
        return () => clearTimeout(timeoutId);
    });

    function closeGuide() {
        showGuide = false;
    }

    function acknowledgeGuide() {
        try {
            localStorage.setItem(GUIDE_DISMISSED_KEY, 'true');
        } catch {
            // Closing the guide should still work when storage is unavailable.
        }

        closeGuide();
    }

    function onKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') closeGuide();
    }

    function stopPropagation(e: MouseEvent) {
        e.stopPropagation();
    }
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="min-h-screen relative" {@attach captureWrapper} tabindex="0" onkeydown={onKeydown} role="application" aria-label="Interactive constellation map">
    <ConstellationMap />

    {#if showGuide}
        <!-- Overlay - use inert instead of aria-hidden to properly handle focus -->
        <div 
            class="stargaze-guide-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onclick={closeGuide}
            role="presentation"
            transition:fade
        >
            <div class="stargaze-guide-dialog max-w-md w-[90%] bg-white/10 dark:bg-neutral-900/40 backdrop-blur-lg rounded-xl p-6 mx-4 shadow-lg border border-white/5 text-center" onclick={stopPropagation} onkeydown={onKeydown} transition:fly={{ y: 8, duration: 300 }} role="dialog" aria-modal="true" aria-label="Stargaze guide" tabindex="-1">
                <h2 class="stargaze-guide-heading text-xl font-bold text-white mb-2">Welcome to Stargaze ✨</h2>
                <p class="stargaze-guide-copy text-sm text-neutral-300 mb-4">Quick tips to get started — this will disappear in a few seconds.</p>

                <ul class="stargaze-guide-copy text-left text-sm text-neutral-200 space-y-2 mb-4">
                    <li class="flex items-start gap-3"><span class="stargaze-guide-icon w-6 text-primary-400"><i class="fas fa-hand-pointer"></i></span>Click a star to target it</li>
                    <li class="flex items-start gap-3"><span class="stargaze-guide-icon w-6 text-primary-400"><i class="fas fa-mouse-pointer"></i></span>Double-click the same star to zoom into its system</li>
                    <li class="flex items-start gap-3"><span class="stargaze-guide-icon w-6 text-primary-400"><i class="fas fa-arrows-alt-v"></i></span>Scroll to zoom, drag to rotate</li>
                    <li class="flex items-start gap-3"><span class="stargaze-guide-icon w-6 text-primary-400"><i class="fas fa-esc"></i></span>Press <span class="font-semibold mx-1">Esc</span> or click anywhere to close</li>
                </ul>

                <div class="flex justify-center">
                    <button class="stargaze-guide-button px-4 py-2 rounded-md bg-primary-500 text-white font-semibold hover:opacity-95" onclick={acknowledgeGuide}>Got it</button>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    @supports (color: color(display-p3 1 1 1)) {
        @media (dynamic-range: high) {
            .stargaze-guide-backdrop {
                background-color: color(display-p3 0.005 0.006 0.008 / 0.48);
            }

            .stargaze-guide-dialog {
                background-color: color(display-p3 0.035 0.04 0.055 / 0.72);
                border-color: color(display-p3 0.78 0.84 1.08 / 0.28);
                box-shadow:
                    0 1.5rem 4rem color(display-p3 0 0 0 / 0.72),
                    0 0 2rem color(display-p3 0.45 0.62 1.1 / 0.2);
            }

            .stargaze-guide-heading {
                color: color(display-p3 1.18 1.18 1.22);
                text-shadow: 0 0 1rem color(display-p3 0.72 0.82 1.15 / 0.36);
            }

            .stargaze-guide-copy {
                color: color(display-p3 0.88 0.89 0.94);
            }

            .stargaze-guide-icon {
                color: color(display-p3 0.58 0.76 1.15);
                filter: drop-shadow(0 0 0.45rem color(display-p3 0.48 0.68 1.1 / 0.48));
            }

            .stargaze-guide-button {
                color: color(display-p3 1.12 1.12 1.16);
                background-color: color(display-p3 0.2 0.48 1.08);
                box-shadow: 0 0 1.25rem color(display-p3 0.32 0.58 1.12 / 0.48);
            }
        }
    }

    @supports (dynamic-range-limit: no-limit) {
        @media (dynamic-range: high) {
            .stargaze-guide-backdrop,
            .stargaze-guide-dialog,
            .stargaze-guide-heading,
            .stargaze-guide-copy,
            .stargaze-guide-icon,
            .stargaze-guide-button {
                dynamic-range-limit: no-limit;
            }
        }
    }
</style>
