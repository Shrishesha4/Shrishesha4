<script lang="ts">
    export let mode: 'icon' | 'button' | 'minimal' = 'icon';
</script>

{#if mode === 'icon'}
    <div>
        <a 
            href="https://www.buymeacoffee.com/shrishesha4" 
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 bg-[#FFA500] hover:bg-[#FFA500]/90 text-black rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
        >
            <i class="fas fa-coffee text-xl"></i>
            <span class="font-medium">Buy me a coffee</span>
        </a>
    </div>
{:else if mode === 'button'}
    <div class="shadow-xl rounded-full">
        <a 
            href="https://www.buymeacoffee.com/shrishesha4" 
            target="_blank"
            class="inline-flex items-center px-3 py-3 bg-[#FFA500] hover:bg-[#FFA500]/50 text-white rounded-full transition-colors duration-200"
        >
            <i class="fas fa-coffee text-m text-black"></i>
            <!-- <span class="text-m text-black">Buy Me A Coffee</span> -->
        </a>
    </div>
{:else}
<div class="rounded-full hover:bg-neutral-700">
    <a 
        href="https://www.buymeacoffee.com/shrishesha4" 
        target="_blank"
        class="inline-flex items-center gap-3 px-8 py-3bg-neutral-800  text-white rounded-full transition-colors duration-200"
    >
        <i class="fas fa-coffee text-lg text-[#FFA500]"></i>
        <span class="text-lg text-[#FFA500]">Buy Me A Coffee</span>
    </a>
</div>
{/if}