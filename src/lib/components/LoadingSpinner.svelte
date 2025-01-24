<script lang="ts">
    import { loading } from '$lib/stores/loading';
</script>

{#if $loading}
    <div class="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-white/30 dark:bg-neutral-900/30 z-50">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div>
    </div>
{/if}