<script lang="ts">
    import { profile } from '$lib/stores/profile';
</script>

<section class="mb-6">
    <div class="flex justify-between items-baseline border-b border-gray-300 mb-3 pb-1">
        <h3 class="text-lg font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
            Summary
        </h3>
    </div>
    
    <p class="text-gray-700 leading-relaxed text-sm text-justify">
        {$profile.resumeBio || $profile.bio}
    </p>
</section>