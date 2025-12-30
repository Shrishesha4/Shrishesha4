<script lang="ts">
    import { profile } from '$lib/stores/profile';

    $: allSkills = Array.from(new Set([...$profile.skills, ...$profile.techStack]));
</script>

{#if allSkills.length > 0}
    <section class="mb-6">
        <h3 class="text-lg font-bold text-gray-800 border-b border-gray-300 mb-3 pb-1 uppercase tracking-wider">
            Technical Skills
        </h3>
        <div class="flex flex-wrap gap-2">
            {#each allSkills as skill}
                <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium border border-gray-200 print:border-gray-300 print:bg-white">
                    {skill}
                </span>
            {/each}
        </div>
    </section>
{/if}