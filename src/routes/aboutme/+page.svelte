<script lang="ts">
    import { profile } from '$lib/stores/profile';
    import { onMount } from 'svelte';

    let loading = true;
    let error = '';

    onMount(async () => {
        try {
            await profile.load();
        } catch (err) {
            console.error('Error loading profile:', err);
            error = 'Failed to load profile data';
        } finally {
            loading = false;
        }
    });
</script>

{#if loading}
    <div class="flex justify-center items-center min-h-screen">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div>
    </div>
{:else if error}
    <div class="text-red-500 text-center p-4">{error}</div>
{:else}
    <div class="min-h-screen p-4">
        <div class="max-w-4xl mx-auto">
            <!-- <h1 class="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-6">About Me</h1> -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Profile Image Section -->
                <div class="flex flex-col items-center md:items-start">
                    <!-- svelte-ignore a11y_img_redundant_alt -->
                    <img 
                        src="me.png" 
                        alt="Profile Picture" 
                        class="w-48 h-48 rounded-full object-cover shadow-lg mb-4"
                    />
                    <div class="text-center md:text-left">
                        <h2 class="text-2xl font-semibold text-gray-900 dark:text-neutral-100">{$profile.name}</h2>
                        <p class="text-gray-600 dark:text-neutral-400">{$profile.title}</p>
                    </div>
                </div>

                <!-- Bio Section -->
                <div class="space-y-6">
                    <div class="prose dark:prose-invert">
                        <p class="text-gray-700 dark:text-neutral-300">
                            {$profile.bio}
                        </p>
                        
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-neutral-100 mt-6">Skills</h3>
                        <div class="flex flex-wrap gap-2 mt-2">
                            {#each $profile.skills as skill}
                                <span class="px-3 py-1 bg-gray-200 dark:bg-neutral-700 rounded-full text-sm">{skill}</span>
                            {/each}
                        </div>

                        <h3 class="text-xl font-semibold text-gray-900 dark:text-neutral-100 mt-6">Experience</h3>
                        <ul class="list-disc pl-5 text-gray-700 dark:text-neutral-300">
                            {#each $profile.experience as exp}
                                <li>{exp}</li>
                            {/each}
                        </ul>
                    </div>    
                </div>

                <!-- Education Timeline Section -->
                <div class="mt-8 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4 px-4">Education Timeline</h3>
                    <div class="relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-neutral-600">
                        <div class="flex gap-8 p-4 min-w-max">
                            {#each $profile.education as edu}
                                <div class="flex flex-col items-center w-64">
                                    <div class="w-full h-2 bg-gray-200 dark:bg-neutral-700 rounded-full mb-4"></div>
                                    <div class="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg w-full">
                                        <h4 class="font-semibold text-gray-900 dark:text-neutral-100">{edu.year}</h4>
                                        <p class="text-gray-700 dark:text-neutral-300 font-medium">{edu.degree}</p>
                                        <p class="text-gray-600 dark:text-neutral-400 text-sm">{edu.institution}</p>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}