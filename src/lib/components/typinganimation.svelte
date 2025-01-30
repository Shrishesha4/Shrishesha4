<script lang="ts">
    import { onMount } from 'svelte';
    import Typed from 'typed.js';
    import { profile } from '$lib/stores/profile';

    let typed: Typed;
    let defaultStrings = ['a Web Developer.', 'a Software Engineer.', 'a Problem Solver.']; // Fallback strings

    onMount(() => {
        // Initialize with default strings or profile strings if available
        typed = new Typed('.typing', {
            strings: $profile.typingStrings || defaultStrings,
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            cursorChar: '|'
        });

        return () => {
            if (typed) {
                typed.destroy();
            }
        };
    });

    // React to changes in profile.typingStrings
    $: if (typed && $profile.typingStrings && $profile.typingStrings.length > 0) {
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
