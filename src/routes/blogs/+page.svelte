<script lang="ts">
	import BlogViewer from '$lib/components/BlogViewer.svelte';
	import BuyMeCoffee from '$lib/components/BuyMeCoffee.svelte';
</script>

<div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-4xl font-bold">Posts</h1>
            <BuyMeCoffee mode="button"/>
        </div>
        <BlogViewer/>
    </div>
</div>