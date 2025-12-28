<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import Toast from '$lib/components/Toast.svelte';
	import { toast } from '$lib/stores/toast';

	let { children } = $props();

	onMount(() => {
		console.log('Admin layout mounted');

		// Ensure a Toast is mounted directly into document.body to avoid any stacking context issues
		try {
			const existing = document.getElementById('toast-portal');
			if (!existing) {
				const portal = document.createElement('div');
				portal.id = 'toast-portal';
				document.body.appendChild(portal);
				const ToastCtor = (Toast as any);
				const instance = new ToastCtor({ target: portal });
				// expose for debugging
				(window as any).__toastInstance = instance;
				console.log('Programmatically mounted Toast to body');
			}
		} catch (err) {
			console.error('Failed to programmatically mount Toast:', err);
		}
	});

	// Debug helper to trigger a test toast from the layout console
	// call window.triggerTestToast() in console
	(window as any).triggerTestToast = () => toast.show('Layout test toast', 'success');
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

<Toast/>