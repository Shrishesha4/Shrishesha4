<script lang="ts">
    import { theme } from '$lib/stores/theme';
    
    let showMenu = $state(false);
    
    function handleToggle() {
        theme.toggle();
    }
    
    function setSystem() {
        theme.setSystemPreference();
        showMenu = false;
    }
    
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.closest('.theme-toggle-container')) {
            showMenu = false;
        }
    }
</script>

<svelte:window onclick={handleClickOutside} />

<div class="fixed top-6 right-8 z-[101] theme-toggle-container">
    <button
        onclick={handleToggle}
        oncontextmenu={(e) => { e.preventDefault(); showMenu = !showMenu; }}
        class="p-2 px-4 mt-1 rounded-full bg-white/80 dark:bg-neutral-900/20 backdrop-blur-md border border-neutral-300 dark:border-neutral-700/30 shadow-lg hover:bg-white dark:hover:bg-neutral-800/30 transition-all duration-300 group"
        aria-label="Toggle theme"
        title="Click to toggle, right-click for options"
    >
        <i class="fas {$theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-xl text-neutral-800 dark:text-white/90 group-hover:scale-110 transition-transform"></i>
    </button>
    
    {#if showMenu}
        <div class="absolute top-full right-0 mt-2 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden min-w-[140px]">
            <button
                onclick={() => { theme.toggle(); showMenu = false; }}
                class="w-full px-4 py-2 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
            >
                <i class="fas {$theme === 'dark' ? 'fa-sun' : 'fa-moon'} w-4"></i>
                {$theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button
                onclick={setSystem}
                class="w-full px-4 py-2 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
            >
                <i class="fas fa-desktop w-4"></i>
                Use System
            </button>
        </div>
    {/if}
</div>
