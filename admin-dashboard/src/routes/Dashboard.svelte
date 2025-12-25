<script lang="ts">
    import { isAuthenticated } from '$lib/stores/auth';
    import { onMount, onDestroy } from 'svelte';
    import { navigate } from '$lib/router';
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
        navigate(`/?tab=${tab}`, { replace: true });
    }

    onMount(async () => {
        if (!$isAuthenticated) {
            navigate('/login');
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        if (tab && ['profile', 'projects', 'blogs', 'contact'].includes(tab)) {
            activeTab = tab;
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
    });

    $: if (activeTab !== 'blogs') {
        editingBlog = null;
    }
</script>

{#if $isAuthenticated}
    <div class="h-screen w-screen overflow-hidden flex flex-col-reverse md:flex-row p-4 gap-4 bg-neutral-100 dark:bg-neutral-950 transition-colors duration-500">
        
        <!-- OS Dock (Navigation) -->
        <nav class="md:h-full md:w-24 w-full h-20 glass-card flex md:flex-col justify-between items-center py-2 md:py-6 px-4 md:px-2 z-50 shrink-0 border-neutral-200 dark:border-white/5 shadow-2xl md:shadow-none">
            <!-- App Icon / OS Indicator -->
            <div class="hidden md:flex w-12 h-12 rounded-2xl bg-neutral-900 dark:bg-white items-center justify-center text-white dark:text-black font-black text-xl mb-8 shadow-2xl">
                A
            </div>

            <!-- Dock Items -->
            <div class="flex-1 md:flex-none flex md:flex-col gap-6 items-center justify-around md:justify-center w-full">
                <button
                    class="dock-item group {activeTab === 'profile' ? 'active' : ''}"
                    on:click={() => setActiveTab('profile')}
                >
                    <div class="icon-container"><i class="fas fa-user"></i></div>
                </button>
                <button
                    class="dock-item group {activeTab === 'projects' ? 'active' : ''}"
                    on:click={() => setActiveTab('projects')}
                >
                    <div class="icon-container"><i class="fas fa-cubes"></i></div>
                </button>
                <button
                    class="dock-item group {activeTab === 'blogs' ? 'active' : ''}"
                    on:click={() => setActiveTab('blogs')}
                >
                    <div class="icon-container"><i class="fas fa-edit"></i></div>
                </button>
                <button
                    class="dock-item group {activeTab === 'contact' ? 'active' : ''}"
                    on:click={() => setActiveTab('contact')}
                >
                    <div class="icon-container"><i class="fas fa-address-book"></i></div>
                </button>
                <button
                    on:click={handleLogout}
                    class="dock-item group"
                >
                    <div class="icon-container bg-red-500/5 dark:bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300">
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
            <!-- Window Title Bar -->
            <div class="h-14 border-b border-neutral-200/50 dark:border-white/5 flex items-center justify-between px-6 bg-white/20 dark:bg-white/5 backdrop-blur-xl shrink-0">
                <div class="flex items-center gap-3">
                    <h2 class="text-sm font-semibold text-neutral-800 dark:text-white/90">
                        {#if activeTab === 'profile'}Manage Profile
                        {:else if activeTab === 'projects'}Project Portfolio
                        {:else if activeTab === 'blogs'}Editorial Studio
                        {:else if activeTab === 'contact'}Communication Hub
                        {/if}
                    </h2>
                </div>
            </div>

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