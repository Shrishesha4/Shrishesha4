<script lang="ts">
    import '../app.postcss';
    import { onMount } from 'svelte';
    import { theme } from '$lib/stores/theme';
	import Navbar from '$lib/components/navbar.svelte';
    let { children } = $props();

    onMount(() => {
        theme.init();
    });
</script>

<div class="min-h-screen bg-white dark:bg-primary-dark transition-colors duration-200">
    <Navbar/>
    <main>
        {@render children()}
    </main>
</div>