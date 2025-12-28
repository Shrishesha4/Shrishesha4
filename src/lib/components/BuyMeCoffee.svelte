<script lang="ts">
    export let mode: 'icon' | 'button' | 'minimal' = 'icon';
</script>

<!-- class="glass-button inline-flex items-center gap-2 px-4 py-2 bg-[#FFA500]/20 hover:bg-[#FFA500]/30 text-[#FFA500] rounded-full transition-all duration-300 backdrop-blur-md hover:scale-105" -->
<!-- svelte-ignore a11y_consider_explicit_label -->
{#if mode === 'icon'}
    <div>
        <a 
            href="https://www.buymeacoffee.com/shrishesha4" 
            target="_blank"
            rel="noopener noreferrer"
        >
            <i class="fas fa-coffee text-xl text-[#ffa500]"></i>
            <span class="font-medium">Buy me a coffee</span>
        </a>
    </div>
{:else if mode === 'button'}
    <div class="relative group">
        <a 
            href="https://www.buymeacoffee.com/shrishesha4" 
            target="_blank"
            rel="noopener noreferrer"
            class="glass-button inline-flex items-center gap-2 px-4 py-2 bg-[#FFA500]/20 hover:bg-[#FFA500]/30 text-[#FFA500] rounded-full transition-all duration-300 backdrop-blur-md hover:scale-105"
        >
            <i class="fas fa-coffee text-m text-[#ffa500]"></i>
        </a>
        <div class="absolute hidden group-hover:block bg-black text-white text-sm px-2 py-1 rounded -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            Buy me a coffee!
            <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
        </div>
    </div>
{:else}
    <div class="mt-12 hover:scale-120 transition-all duration-200">
        <a 
            href="https://www.buymeacoffee.com/shrishesha4" 
            target="_blank"
            rel="noopener noreferrer"
            class="glass-card glass-card-hover p-6 backdrop-blur-lg hover:bg-[#FFA500]/70 dark:hover:bg-[#FFA500]/80 bg-[#FFA700] dark:bg-[#FFA700] dark:text-black  hover:text-black dark:hover:text-white "    
        >
            <i class="fas fa-coffee text-lg "></i>
            <span class="text-lg">Buy Me A Coffee</span>
        </a>
    </div>
{/if}