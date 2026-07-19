<script lang="ts">
    import { profile } from '$lib/stores/profile';
</script>

{#if $profile.education && $profile.education.length > 0}
    <section class="mb-6">
        <h3 class="text-lg font-bold text-gray-800 border-b border-gray-300 mb-3 pb-1 uppercase tracking-wider">
            Education
        </h3>
        <div class="space-y-4">
            {#each $profile.education as edu}
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                        <h4 class="font-bold text-gray-800 text-sm">{edu.institution}</h4>
                        <p class="text-gray-700 text-sm">{edu.degree}</p>
                    </div>
                    <span class="text-gray-600 text-xs font-medium bg-gray-50 px-2 py-1 rounded mt-1 sm:mt-0 print:bg-transparent print:p-0">
                        {edu.year}
                    </span>
                </div>
            {/each}
        </div>
    </section>
{/if}