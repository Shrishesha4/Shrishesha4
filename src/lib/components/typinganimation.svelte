<script lang="ts">
    import { onMount } from 'svelte';
    import Typed from 'typed.js';
    import { profile } from '$lib/stores/profile';

    let typed: Typed;

    onMount(() => {
        typed = new Typed('.typing', {
            strings: $profile.typingStrings,
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            cursorChar: '|'
        });

        return () => {
            typed.destroy();
        };
    });

    $: if (typed && $profile.typingStrings) {
        typed.destroy();
        typed = new Typed('.typing', {
            strings: $profile.typingStrings,
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            cursorChar: '|'
        });
    }
</script>

<span class="typing"></span>
