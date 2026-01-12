<script lang="ts">
    import { onMount } from 'svelte';
    import { toast } from '$lib/stores/toast';
    import { fly } from 'svelte/transition';

    onMount(() => {
        console.log('Toast component mounted');
    });

    $effect(() => {
        // Use $inspect for debugging state without triggering the console.log warning
        $inspect($toast);
    });
</script>

<!-- Always visible debug marker to confirm component renders -->
<div class="fixed top-2 right-2 z-[9999] bg-blue-500 text-white px-2 py-1 text-xs rounded">
    Toast Component Loaded
</div>

{#if $toast}
    <div 
        class="fixed top-6 left-6 z-[9999]"
        transition:fly={{ y: -50, duration: 200 }}
        role="status"
        aria-live="polite"
    >
        <div class={`px-4 py-2 rounded-lg shadow-lg border-2 ${
            $toast.type === 'success' 
                ? 'bg-green-500 text-white border-green-700' 
                : 'bg-red-500 text-white border-red-700'
        }`}>
            <div class="font-semibold">{$toast.type.toUpperCase()}</div>
            <div>{$toast.message}</div>
            <div class="text-[10px] opacity-70 mt-1">(debug: toast visible)</div>
        </div>
    </div>
{/if}