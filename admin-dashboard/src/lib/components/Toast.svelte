<script lang="ts">
    import { toast } from '$lib/stores/toast';
    import { fly } from 'svelte/transition';
</script>

{#if $toast}
    <div 
        class="fixed top-6 left-6 z-[200]"
        transition:fly={{ y: -50, duration: 200 }}
    >
        <div class={`px-4 py-2 rounded-lg shadow-lg ${
            $toast.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
        }`}>
            {$toast.message}
        </div>
    </div>
{/if}