<script lang="ts">
    import '../app.postcss';
    import Navbar from '$lib/components/navbar.svelte';
    import Toast from '$lib/components/Toast.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    let { children } = $props();
</script>

<div class="min-h-screen bg-white dark:bg-primary-dark transition-colors duration-200">
    <Navbar/>
    <main class="pt-8 md:pt-28 px-4">
        {@render children()}
    </main>
    <Toast />
    <LoadingSpinner />
</div>