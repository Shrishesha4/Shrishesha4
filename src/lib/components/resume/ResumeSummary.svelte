<script lang="ts">
    import { profile } from '$lib/stores/profile';
</script>

{#if $profile.bio}
    <section class="mb-6">
        <h3 class="text-lg font-bold text-gray-800 border-b border-gray-300 mb-3 pb-1 uppercase tracking-wider">
            Summary
        </h3>
        <p class="text-gray-700 leading-relaxed text-sm text-justify">
            {$profile.bio}
        </p>
    </section>
{/if}