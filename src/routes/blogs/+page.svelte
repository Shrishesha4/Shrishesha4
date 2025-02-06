<script lang="ts">
	import BlogViewer from '$lib/components/BlogViewer.svelte';
</script>

<div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-4xl font-bold">Posts</h1>
            <div class="shadow-xl rounded-full">
                <a 
                    href="https://www.buymeacoffee.com/shrishesha4" 
                    target="_blank"
                    class="inline-flex items-center px-3 py-3 bg-[#FFA500] hover:bg-neutral-900 text-white rounded-full transition-colors duration-200"
                >
                    <i class="fas fa-coffee text-m text-black"></i>
                    <!-- <span class="text-m text-black">Buy Me A Coffee</span> -->
                </a>
            </div>
        </div>
        <BlogViewer/>
    </div>
</div>