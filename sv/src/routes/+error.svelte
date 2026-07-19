<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
</script>

<div class="min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full text-center space-y-8">
        <div class="space-y-4">
            <h1 class="text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
            <h2 class="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                Page Not Found
            </h2>
            <p class="text-neutral-600 dark:text-neutral-400">
                {$page.error?.message || "The page you're looking for doesn't exist or has been moved."}
            </p>
        </div>

        <div class="flex justify-center gap-4">
            <button 
                class="px-6 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white rounded-lg transition-colors duration-200"
                on:click={() => goto('/')}
            >
                Go Home
            </button>
            <button 
                class="px-6 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-200"
                on:click={() => history.back()}
            >
                Go Back
            </button>
        </div>
    </div>
</div>