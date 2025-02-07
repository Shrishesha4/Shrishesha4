<script lang="ts">
    import LoadingSpinner from './LoadingSpinner.svelte';
    import { profile } from '$lib/stores/profile';
    import { auth } from '$lib/firebase/config';
    import { toast } from '$lib/stores/toast';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
    import ImageUpload from './ImageUpload.svelte';

    const db = getFirestore();
    let currentProfile = { ...$profile };
    let loading = true;
    let error = '';
    let savingStates = {
        profile: false,
        education: false,
        typing: false
    };

    async function loadProfileData() {
        try {
            if (!auth.currentUser) {
                goto('/admin/login');
                return;
            }
    
            const defaultProfileDoc = await getDoc(doc(db, 'profiles', 'default'));
            let profileData = defaultProfileDoc.exists() ? defaultProfileDoc.data() : {};
    
            const userProfileDoc = await getDoc(doc(db, 'profiles', auth.currentUser.uid));
            if (userProfileDoc.exists()) {
                const userData = userProfileDoc.data();
                profileData = { ...profileData, ...userData };
            }
    
            currentProfile = {
                name: profileData.name || '',
                title: profileData.title || '',
                bio: profileData.bio || '',
                skills: profileData.skills || [],
                experience: profileData.experience || [],
                education: profileData.education || [],
                typingStrings: profileData.typingStrings || '',
                favicon:profileData.favicon || '',
                profileImage:profileData.profileImage || ''
            };
    
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

            savingStates.profile = true;
            await setDoc(doc(db, 'profiles', auth.currentUser.uid), currentProfile);
            
            await profile.set(currentProfile);
            
            toast.show('Profile updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.show('Failed to update profile', 'error');
        } finally {
            savingStates.profile = false;
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
<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_label_has_associated_control -->
{#if loading}
    <LoadingSpinner />
{:else if error}
    <div class="text-red-500 text-center p-4">{error}</div>
{:else}
    <div class="min-h-screen p-4">
        <div class="max-w-2xl mx-auto bg-neutral-200 dark:bg-neutral-800 px-4 py-4 rounded-xl">
            <!-- <h1 class="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">Edit Profile</h1> -->
            <form class="space-y-6" on:submit|preventDefault={updateProfile}>
                <div class="relative">
                    

                    {#if savingStates.profile}
                        <div class="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-xl flex items-center justify-center backdrop-blur-sm z-10">
                            <LoadingSpinner />
                        </div>
                    {/if}
                    <div class="mb-6">
                        <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Profile Image</label>
                        <div class="max-w-auto">
                            <ImageUpload
                                currentImage={currentProfile.profileImage}
                                onImageUploaded={(url) => currentProfile.profileImage = url}
                            />
                        </div>
                        <p class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                            Recommended size: 256x256 pixels (Square format)
                        </p>
                    </div>

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
                </div>
                <div>
                    <div class="relative">
                        {#if savingStates.education}
                            <div class="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-xl flex items-center justify-center backdrop-blur-sm z-10">
                                <LoadingSpinner />
                            </div>
                        {/if}
                        <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Education</label>
                        {#each currentProfile.education as edu, i}
                            <div class="flex flex-col sm:flex-row items-center gap-2 mb-4">
                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                                    
                                    <input
                                        type="text" 
                                        bind:value={edu.year} 
                                        placeholder="Year"
                                        class="w-[calc(100%-2rem)] p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                    <div class="relative flex items-center">
                                        <input 
                                            type="text" 
                                            bind:value={edu.degree} 
                                            placeholder="Degree"
                                            class="w-[calc(100%-2rem)] p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                    <input 
                                        type="text" 
                                        bind:value={edu.institution} 
                                        placeholder="Institution"
                                        class="w-[calc(100%-2rem)] p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                    
                                </div>
                                <button 
                                    type="button"
                                    on:click={() => {
                                        currentProfile.education = currentProfile.education.filter((_, index) => index !== i);
                                    }}
                                    class="absolute right-0 py-2 sm:mt-0 mt-14 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                >
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        {/each}
                        <button 
                            type="button"
                            on:click={() => currentProfile.education = [...currentProfile.education, { year: '', degree: '', institution: '' }]}
                            class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mt-2 border-black dark:border-white"
                        >
                            + Add Education
                        </button>   
                    </div>
                </div>
                <div>
                    <div class="relative">
                        {#if savingStates.typing}
                            <div class="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-xl flex items-center justify-center backdrop-blur-sm z-10">
                                <LoadingSpinner />
                            </div>
                        {/if}
                        <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Typing Animation Strings</label>
                        <div class="space-y-2">
                            {#each currentProfile.typingStrings as string, i}
                                <div class="flex gap-2 w-min">
                                    <input 
                                        type="text" 
                                        bind:value={currentProfile.typingStrings[i]}
                                        class="flex-1 p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                    <button 
                                        type="button"
                                        on:click={() => {
                                            currentProfile.typingStrings = currentProfile.typingStrings.filter((_, index) => index !== i);
                                        }}
                                        class="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            {/each}
                            <button 
                                type="button"
                                on:click={() => {
                                    currentProfile.typingStrings = [...currentProfile.typingStrings, ''];
                                }}
                                class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                            >
                                + Add String
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-center mt-6">
                        <button 
                            type="submit" 
                            class="border border-neutral-300 dark:border-neutral-600 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-primary-800 dark:text-white px-4 py-2 rounded transition-colors duration-200"
                            disabled={Object.values(savingStates).some(state => state)}
                        >
                            {Object.values(savingStates).some(state => state) ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
{/if}