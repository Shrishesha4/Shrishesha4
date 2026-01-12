<script lang="ts">
    import { isAuthenticated } from '$lib/stores/auth';
    import { onMount, onDestroy } from 'svelte';
    import { navigate } from '$lib/router';
    import { signOut } from 'firebase/auth';
    import { auth } from '$lib/firebase/config';
    import ProjectEditor from '$lib/components/ProjectEditor.svelte';
    import ProfileEditor from '$lib/components/ProfileEditor.svelte';
    import BlogEditor from '$lib/components/BlogEditor.svelte';
    import FeaturedReposEditor from '$lib/components/FeaturedReposEditor.svelte';
    import { blogs } from '$lib/stores/blogs';
    import { projects } from '$lib/stores/projects';
    import { profile } from '$lib/stores/profile';
    import { contact } from '$lib/stores/contact';
    import { rssFeeds } from '$lib/stores/rssFeeds';
    import ContactEditor from '$lib/components/ContactEditor.svelte';

    let activeTab = $state('profile');
    let editingBlog: typeof $blogs[0] | null = $state(null);

    function setActiveTab(tab: string) {
        activeTab = tab;
        navigate(`/?tab=${tab}`, { replace: true });
    }

    onMount(async () => {
        if (!$isAuthenticated) {
            navigate('/login');
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        if (tab && ['profile', 'projects', 'blogs', 'contact', 'repos'].includes(tab)) {
            activeTab = tab;
        }

        await Promise.all([
            blogs.load(),
            projects.load(),
            profile.load(),
            contact.load(),
            rssFeeds.load()
        ]);
    });

    async function handleLogout() {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (err) {
            console.error('Error signing out:', err);
        }
    }

    onDestroy(() => {
        blogs.cleanup();
        projects.cleanup();
        profile.cleanup();
        contact.cleanup();
        rssFeeds.cleanup();
    });

    $effect(() => {
        if (activeTab !== 'blogs') {
            editingBlog = null;
        }
    });
</script>

{#if $isAuthenticated}
    <div class="h-screen w-screen overflow-hidden flex flex-col-reverse md:flex-row p-4 gap-4 bg-neutral-100 dark:bg-neutral-950 transition-colors duration-500">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <nav class="md:h-full md:w-24 w-full h-20 glass-card flex md:flex-col items-center py-2 md:py-6 px-3 sm:px-4 z-50 shrink-0 border-neutral-200 dark:border-white/5 shadow-2xl md:shadow-none overflow-x-auto no-scrollbar">
            <div class="flex-1 md:flex-none flex items-center justify-between md:flex-col gap-3 sm:gap-6 w-full md:w-auto px-3">
                <button
                    class="dock-item group {activeTab === 'profile' ? 'active' : ''}"
                    onclick={() => setActiveTab('profile')}
                >
                    <div class="icon-container w-12 h-12 sm:w-14 sm:h-14"><i class="fas fa-user"></i></div>
                </button>
                <button
                    class="dock-item group {activeTab === 'projects' ? 'active' : ''}"
                    onclick={() => setActiveTab('projects')}
                >
                    <div class="icon-container w-12 h-12 sm:w-14 sm:h-14"><i class="fas fa-cubes"></i></div>
                </button>
                <button
                    class="dock-item group {activeTab === 'blogs' ? 'active' : ''}"
                    onclick={() => setActiveTab('blogs')}
                >
                    <div class="icon-container w-12 h-12 sm:w-14 sm:h-14"><i class="fas fa-edit"></i></div>
                </button>
                <button
                    class="dock-item group {activeTab === 'contact' ? 'active' : ''}"
                    onclick={() => setActiveTab('contact')}
                >
                    <div class="icon-container w-12 h-12 sm:w-14 sm:h-14"><i class="fas fa-address-book"></i></div>
                </button>
                <button
                    class="dock-item group {activeTab === 'repos' ? 'active' : ''}"
                    onclick={() => setActiveTab('repos')}
                >
                    <div class="icon-container w-12 h-12 sm:w-14 sm:h-14"><i class="fab fa-github"></i></div>
                </button>
                <button
                    onclick={handleLogout}
                    class="dock-item group"
                >
                    <div class="icon-container w-12 h-12 sm:w-14 sm:h-14 bg-red-500/5 dark:bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300">
                        <i class="fas fa-power-off"></i>
                    </div>
                </button>
            </div>

            <!-- System Exit -->
            <!-- <div class="mt-auto flex md:flex-col gap-4">
                
            </div> -->
        </nav>

        <!-- Main Workspace Window -->
        <main class="flex-1 glass-card overflow-hidden flex flex-col border-neutral-200 dark:border-white/5">
            <!-- Content Area -->
            <div class="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                <div class="max-w-5xl mx-auto animate-workspace-in">
                    {#if activeTab === 'profile'}
                        <ProfileEditor />
                    {:else if activeTab === 'projects'}
                        <ProjectEditor />
                    {:else if activeTab === 'blogs'}
                        <BlogEditor bind:editingBlog />
                    {:else if activeTab === 'contact'}
                        <ContactEditor />
                    {:else if activeTab === 'repos'}
                        <FeaturedReposEditor />
                    {/if}
                </div>
            </div>
        </main>
    </div>
{/if}

<style>
    @keyframes workspace-in {
        from { opacity: 0; transform: scale(0.99) translateY(10px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .animate-workspace-in {
        animation: workspace-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }

    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.05);
        border-radius: 10px;
    }
    :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.05);
    }
</style>