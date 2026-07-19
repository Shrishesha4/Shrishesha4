<script lang="ts">
    import { profile } from '$lib/stores/profile';
</script>

{#if $profile.experience && $profile.experience.length > 0}
    <section class="mb-6">
        <h3 class="text-lg font-bold text-gray-800 border-b border-gray-300 mb-3 pb-1 uppercase tracking-wider">
            Experience
        </h3>
        <ul class="list-disc list-outside ml-4 space-y-2">
            {#each $profile.experience as exp}
                <li class="text-gray-700 text-sm leading-relaxed break-inside-avoid">
                    {exp}
                </li>
            {/each}
        </ul>
    </section>
{/if}