<script lang="ts">
    import { profile } from '$lib/stores/profile';
    import { isAuthenticated } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import {onMount} from 'svelte'
    let currentProfile = { ...$profile };

    onMount(() => {
        if (!$isAuthenticated) {
            goto('/admin/login');
        }
    });

    function updateProfile() {
        try {
            profile.set(currentProfile);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    }
</script>
{#if $isAuthenticated}
    <div class="min-h-screen p-4 bg-neutral-50 dark:bg-neutral-900">
        <div class="max-w-2xl mx-auto">
            <h1 class="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">Edit Profile</h1>
            
            <form class="space-y-6" on:submit|preventDefault={updateProfile}>
                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Name</label>
                    <input 
                        type="text" 
                        bind:value={currentProfile.name} 
                        class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500" 
                    />
                </div>

                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Title</label>
                    <input 
                        type="text" 
                        bind:value={currentProfile.title} 
                        class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500" 
                    />
                </div>

                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Bio</label>
                    <textarea 
                        bind:value={currentProfile.bio} 
                        class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500" 
                        rows="4"
                    ></textarea>
                </div>

                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Skills (comma-separated)</label>
                    <input 
                        type="text" 
                        value={currentProfile.skills.join(', ')} 
                        on:input={(e) => {
                            if (e.target) {
                                currentProfile.skills = (e.target as HTMLInputElement).value.split(',').map(s => s.trim())
                            }
                        }}
                        class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500" 
                    />
                </div>

                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Experience (one per line)</label>
                    <textarea 
                        value={currentProfile.experience.join('\n')}
                        on:input={(e) => {
                            if (e.target && e.target instanceof HTMLTextAreaElement) {
                                currentProfile.experience = e.target.value.split('\n').filter(Boolean);
                            }
                        }}
                        class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500" 
                        rows="4"
                    ></textarea>
                </div>

                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Education</label>
                    {#each currentProfile.education as edu, i}
                        <div class="grid grid-cols-3 gap-2 mb-2">
                            <input 
                                type="text" 
                                bind:value={edu.year} 
                                placeholder="Year"
                                class="p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                            />
                            <input 
                                type="text" 
                                bind:value={edu.degree} 
                                placeholder="Degree"
                                class="p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                            />
                            <input 
                                type="text" 
                                bind:value={edu.institution} 
                                placeholder="Institution"
                                class="p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    {/each}
                    <button 
                        type="button"
                        on:click={() => currentProfile.education = [...currentProfile.education, { year: '', degree: '', institution: '' }]}
                        class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mt-2"
                    >
                        + Add Education
                    </button>
                </div>

                <button 
                    type="submit" 
                    class="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                    Save Changes
                </button>
            </form>
        </div>
    </div>
{/if}