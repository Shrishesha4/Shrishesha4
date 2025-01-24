<script lang="ts">
    import { isAuthenticated } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import ProjectEditor from '$lib/components/ProjectEditor.svelte';
    import ProfileEditor from '$lib/components/ProfileEditor.svelte';

    let activeTab = 'profile';

    onMount(() => {
        if (!$isAuthenticated) {
            goto('/admin/login');
        }
    });
</script>

{#if $isAuthenticated}
    <div class="min-h-screen p-4">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
            
            <div class="mb-6">
                <div class="border-b border-gray-200">
                    <nav class="-mb-px flex space-x-8">
                        <button
                            class="py-2 px-1 {activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}"
                            on:click={() => activeTab = 'profile'}
                        >
                            <i class="fas fa-user me-2"></i>Profile
                        </button>
                        <button
                            class="py-2 px-1 {activeTab === 'projects' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}"
                            on:click={() => activeTab = 'projects'}
                        >
                            <i class="fas fa-code me-2"></i>Projects
                        </button>
                    </nav>
                </div>
            </div>

            {#if activeTab === 'profile'}
                <slot name="profile" />
                <ProfileEditor />
            {:else if activeTab === 'projects'}
                <ProjectEditor />
            {/if}
        </div>
    </div>
{/if}