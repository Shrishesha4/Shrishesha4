<script lang="ts">
    import { isAuthenticated } from '$lib/stores/auth';
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    import { signOut } from 'firebase/auth';
    import { auth } from '$lib/firebase/config';
    import ProjectEditor from '$lib/components/ProjectEditor.svelte';
    import ProfileEditor from '$lib/components/ProfileEditor.svelte';
    import BlogEditor from '$lib/components/BlogEditor.svelte';
    import { blogs } from '$lib/stores/blogs';
    import { projects } from '$lib/stores/projects';
    import { profile } from '$lib/stores/profile';
    import { contact } from '$lib/stores/contact';
    import ContactEditor from '$lib/components/ContactEditor.svelte';

    let activeTab = 'profile';
    let editingBlog: typeof $blogs[0] | null = null;

    function setActiveTab(tab: string) {
        activeTab = tab;
        window.location.hash = tab;
    }

    onMount(async () => {
        if (!$isAuthenticated) {
            goto('/admin/login');
            return;
        }

        const hash = window.location.hash.replace('#', '');
        if (['profile', 'projects', 'blogs', 'contact'].includes(hash)) {
            activeTab = hash;
        }

        await Promise.all([
            blogs.load(),
            projects.load(),
            profile.load(),
            contact.load()
        ]);
    });

    async function handleLogout() {
        try {
            await signOut(auth);
            goto('/admin/login');
        } catch (err) {
            console.error('Error signing out:', err);
        }
    }

    onDestroy(() => {
        blogs.cleanup();
        projects.cleanup();
        profile.cleanup();
        contact.cleanup();
    });

    $: if (activeTab !== 'blogs') {
        editingBlog = null;
    }
</script>
<!-- svelte-ignore a11y_consider_explicit_label -->
{#if $isAuthenticated}
    <div class="min-h-screen p-4 pb-32 md:pb-4">
        <div class="max-w-4xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold">Admin Dashboard</h1>
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
                            on:click={() => setActiveTab('profile')}
                        >
                            <i class="fas fa-user me-2"></i>Edit Profile
                        </button>
                        <button
                            class="py-2 px-1 {activeTab === 'projects' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}"
                            on:click={() => setActiveTab('projects')}
                        >
                            <i class="fas fa-code me-2"></i>Manage Projects
                        </button>
                        <button
                            class="py-2 px-1 {activeTab === 'blogs' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}"
                            on:click={() => setActiveTab('blogs')}
                        >
                            <i class="fas fa-blog me-2"></i>Manage Blogs
                        </button>
                        <button
                            class="py-2 px-1 {activeTab === 'contact' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}"
                            on:click={() => setActiveTab('contact')}
                        >
                            <i class="fas fa-address-card me-2"></i>Contact Info
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
            {:else if activeTab === 'contact'}
                <ContactEditor />
            {/if}
            
        </div>
    </div>
{/if}