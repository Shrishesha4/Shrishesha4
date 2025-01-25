<script lang="ts">
    import { projects } from '$lib/stores/projects';
    import { onMount } from 'svelte';
    import ProjectViewer from '$lib/components/projectviewer.svelte';

    onMount(async () => {
        await projects.load();
    });
</script>

<div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-neutral-100">Projects</h1>
        <ProjectViewer />
    </div>
</div>