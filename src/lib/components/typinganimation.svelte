<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Typed from 'typed.js';
    import { profile } from '$lib/stores/profile';

    let typed: Typed;
    let element: HTMLElement;
    let defaultStrings = ['a Web Developer.', 'a Software Engineer.', 'a Problem Solver.'];

    function initTyped(strings: string[]) {
        if (!element) return;
        if (typed) typed.destroy();
        
        typed = new Typed(element, {
            strings: strings.length > 0 ? strings : defaultStrings,
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            cursorChar: '|'
        });
    }

    onMount(async () => {
        await profile.load();
        if (element && $profile.typingStrings) {
            initTyped($profile.typingStrings);
        }
    });

    onDestroy(() => {
        if (typed) typed.destroy();
        profile.cleanup();
    });

    $effect(() => {
        if (element && $profile.typingStrings && $profile.typingStrings.length > 0) {
            initTyped($profile.typingStrings);
        }
    });
</script>

<span bind:this={element}></span>
