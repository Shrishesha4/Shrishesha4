<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import TypingAnimation from '$lib/components/typinganimation.svelte';
</script>

<div class="min-h-screen p-4">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-6 text-6xl font-bold text-gray-900 dark:text-neutral-100">Hi, I'm Shrishesha</h1>
		<div class="text-5xl text-gray-700 dark:text-neutral-200">
			I'm <span class="text-red-600 dark:text-red-400 text-5xl font-comic"><TypingAnimation /></span>
		</div>
	</div>
</div>
