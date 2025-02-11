<script>
    import Typinganimation from "./typinganimation.svelte";
    import { profile } from '$lib/stores/profile';
    import { loading } from '$lib/stores/loading';
    import { onMount, onDestroy } from 'svelte';

    onMount(async () => {
        loading.show();
        await profile.load();
        loading.hide();
    });

    onDestroy(() => {
        profile.cleanup();
    });
</script>

<div>
    <h1 class="mb-6 font-bold text-neutral-900 dark:text-neutral-100 flex flex-col">
        <span class="text-3xl mb-2">Hi, I'm</span>
        <span class="text-6xl">{$profile.name || ''}</span>
    </h1>
    <div class="mb-8 text-3xl text-neutral-700 dark:text-neutral-300">
        I'm <span class="font-comic text-red-600 dark:text-red-400"><Typinganimation /></span>
    </div>
    <p class="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
        {$profile.bio || ''}
    </p>
    <div class="flex gap-4">
        <a
            href="/aboutme"
            class="glass-card-hover inline-flex items-center rounded-lg bg-neutral-900 px-6 py-3 text-white transition hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
            Know Me
        </a>
        <a
            href="/contact"
            class="glass-card-hover inline-flex items-center rounded-lg border border-neutral-300 px-6 py-3 text-neutral-700 transition dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
            Contact Me
        </a>
    </div>
</div>