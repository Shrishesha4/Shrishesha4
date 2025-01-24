<script lang="ts">
    import LoadingSpinner from './LoadingSpinner.svelte';
    import { profile } from '$lib/stores/profile';
    import { auth } from '$lib/firebase/config';
    import { toast } from '$lib/stores/toast';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

    const db = getFirestore();
    let currentProfile = { ...$profile };
    let loading = true;
    let error = '';

    async function loadProfileData() {
        try {
            if (!auth.currentUser) {
                goto('/admin/login');
                return;
            }
    
            // First get the default profile
            const defaultProfileDoc = await getDoc(doc(db, 'profiles', 'default'));
            let profileData = defaultProfileDoc.exists() ? defaultProfileDoc.data() : {};
    
            // Then get user-specific profile and merge with default
            const userProfileDoc = await getDoc(doc(db, 'profiles', auth.currentUser.uid));
            if (userProfileDoc.exists()) {
                const userData = userProfileDoc.data();
                profileData = { ...profileData, ...userData };
            }
    
            // Set the current profile with merged data
            currentProfile = {
                name: profileData.name || '',
                title: profileData.title || '',
                bio: profileData.bio || '',
                skills: profileData.skills || [],
                experience: profileData.experience || [],
                education: profileData.education || []
            };
    
            // Update the store
            await profile.set(currentProfile);
            
            loading = false;
        } catch (err) {
            console.error('Error loading profile:', err);
            error = 'Failed to load profile data';
            loading = false;
        }
    }

    async function updateProfile() {
        try {
            if (!auth.currentUser) {
                throw new Error('Not authenticated');
            }

            // Update Firestore
            await setDoc(doc(db, 'profiles', auth.currentUser.uid), currentProfile);
            
            // Update local store
            await profile.set(currentProfile);
            
            toast.show('Profile updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.show('Failed to update profile', 'error');
        }
    }

    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                loadProfileData();
            }
        });

        return () => {
            unsubscribe();
        };
    });
</script>

{#if loading}
    <LoadingSpinner />
{:else if error}
    <div class="text-red-500 text-center p-4">{error}</div>
{:else}
    <div class="min-h-screen p-4 bg-neutral-50 dark:bg-neutral-900">
        <div class="max-w-2xl mx-auto">
            <h1 class="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">Edit Profile</h1>
            
            <form class="space-y-6" on:submit|preventDefault={updateProfile}>
                <div>
                    <!-- svelte-ignore a11y_label_has_associated_control -->
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