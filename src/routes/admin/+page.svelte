<script lang="ts">
    import { isAuthenticated } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { signOut } from 'firebase/auth';
    import { auth } from '$lib/firebase/config';
    import ProjectEditor from '$lib/components/ProjectEditor.svelte';
    import ProfileEditor from '$lib/components/ProfileEditor.svelte';
    import BlogEditor from '$lib/components/BlogEditor.svelte';
    import { blogs } from '$lib/stores/blogs';

    let activeTab = 'profile';
    let editingBlog: typeof $blogs[0] | null = null;

    async function handleLogout() {
        try {
            await signOut(auth);
            goto('/');
        } catch (err) {
            console.error('Error signing out:', err);
        }
    }

    onMount(() => {
        if (!$isAuthenticated) {
            goto('/admin/login');
        }
    });

    $: if (activeTab !== 'blogs') {
        editingBlog = null;
    }
</script>

{#if $isAuthenticated}
    <div class="min-h-screen p-4 pb-32 md:pb-4">
        <div class="max-w-4xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold">Admin Dashboard</h1>
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button
                    on:click={handleLogout}
                    class="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                    title="Logout"
                >
                    <i class="fas fa-sign-out-alt text-xl"></i>
                </button>
            </div>
            
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
                        <button
                            class="py-2 px-1 {activeTab === 'blogs' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}"
                            on:click={() => activeTab = 'blogs'}
                        >
                            <i class="fas fa-blog me-2"></i>Blogs
                        </button>
                    </nav>
                </div>
            </div>

            {#if activeTab === 'profile'}
                <ProfileEditor />
            {:else if activeTab === 'projects'}
                <ProjectEditor />
            {:else if activeTab === 'blogs'}
                <BlogEditor bind:editingBlog />
            {/if}
        </div>
    </div>
{/if}