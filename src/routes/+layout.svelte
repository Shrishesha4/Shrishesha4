<script lang="ts">
    import { blogs } from '$lib/stores/blogs';
    import { projects } from '$lib/stores/projects';
    import { profile } from '$lib/stores/profile';
    import { contact } from '$lib/stores/contact';
    import '../app.postcss';
    import Navbar from '$lib/components/navbar.svelte';
    import Toast from '$lib/components/Toast.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    let { children } = $props();
    import {onDestroy} from 'svelte';

    onDestroy(() => {
        blogs.cleanup();
        projects.cleanup();
        profile.cleanup();
        contact.cleanup();
    });
</script>

<div class="min-h-screen bg-white dark:bg-primary-dark transition-colors duration-200">
    <Navbar/>
    <main class="pt-8 md:pt-28 px-4">
        {@render children()}
    </main>
    <Toast />
    <LoadingSpinner />
    <footer class="w-full py-3 px-4 mt-16 border-t border-neutral-200 dark:border-neutral-700">
        <div class="container mx-auto flex justify-center items-center">
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
                © {new Date().getFullYear()} . Shrishesha
            </p>
        </div>
    </footer>
</div>