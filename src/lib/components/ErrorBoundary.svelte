<script lang="ts">
    import { onMount } from 'svelte';
    
    let error: Error | null = null;
    let errorDetails = '';
    
    onMount(() => {
        window.addEventListener('error', (e: ErrorEvent) => {
            error = e.error;
            errorDetails = e.error?.message || 'An unexpected error occurred';
            console.error('Caught error:', {
                message: e.error?.message,
                stack: e.error?.stack,
                name: e.error?.name
            });
        });

        return () => {
            window.removeEventListener('error', () => {});
        };
    });

    function handleRetry() {
        error = null;
        errorDetails = '';
        window.location.reload();
    }
</script>

{#if error}
    <div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
            Oops! Something went wrong
        </h3>
        <p class="text-red-600 dark:text-red-400 mb-4">
            {errorDetails}
        </p>
        <div class="flex gap-3">
            <button 
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                on:click={handleRetry}
            >
                Try Again
            </button>
            <button 
                class="px-4 py-2 border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm"
                on:click={() => window.history.back()}
            >
                Go Back
            </button>
        </div>
    </div>
{:else}
    <slot />
{/if}