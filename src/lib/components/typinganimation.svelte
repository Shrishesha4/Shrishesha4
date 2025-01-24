<script lang="ts">
	import { onMount } from 'svelte';
	import Typed from 'typed.js';

	export let strings: string[] = [
		'a Web Developer.',
		'a Graphic Designer.',
		'an App Developer.'
	];

	onMount(() => {
		const typed = new Typed('.typing', {
			strings: strings,
			typeSpeed: 100,
			backSpeed: 60,
			loop: true,
			cursorChar: '|'
		});

		return () => {
			typed.destroy();
		};
	});
</script>

<span class="typing"></span>
