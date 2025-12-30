<script lang="ts">
    import { profile } from '$lib/stores/profile';
    import { projects } from '$lib/stores/projects';
    import { blogs } from '$lib/stores/blogs';
    import { toast } from '$lib/stores/toast';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let isEnhancing = false;
    // Simple hash function for client-side change detection
    const cyrb53 = (str: string, seed = 0) => {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    };

    $: currentDataHash = cyrb53(JSON.stringify({
        bio: $profile.bio,
        skills: $profile.skills,
        experience: $profile.experience,
        education: $profile.education,
        projects: $projects.map(p => ({ t: p.title, d: p.description })).slice(0, 5), // Simplified project data for hash
        blogs: $blogs.map(b => b.title).slice(0, 5) // Simplified blog data for hash
    })).toString();

    // Check for updates when data changes or on mount
    $: if (currentDataHash && $profile.resumeDataHash !== currentDataHash && !isEnhancing && $page.url.pathname.includes('/resume')) {
        enhanceSummary(currentDataHash);
    }

    async function enhanceSummary(hashToSave: string) {
        isEnhancing = true;
        try {
            const response = await fetch('/api/enhance-resume-summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bio: $profile.bio,
                    skills: $profile.skills,
                    experience: $profile.experience,
                    education: $profile.education,
                    projects: $projects.slice(0, 5),
                    blogs: $blogs.slice(0, 5)
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Enhancement failed');
            }

            const data = await response.json();
            if (data.summary) {
                // Save to resumeBio AND new hash
                await profile.set({ 
                    ...$profile, 
                    resumeBio: data.summary,
                    resumeDataHash: hashToSave
                });
                toast.show('Resume summary automatically updated!', 'success');
            }
        } catch (error: any) {
            console.error(error);
            // Don't show toast for auto-update errors to avoid spamming the user if API is down
        } finally {
            isEnhancing = false;
        }
    }
</script>

<section class="mb-6">
    <div class="flex justify-between items-baseline border-b border-gray-300 mb-3 pb-1">
        <h3 class="text-lg font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
            Summary
            {#if isEnhancing}
                <span class="text-[10px] text-blue-500 font-normal normal-case flex items-center gap-1 print:hidden">
                    <i class="fas fa-sync fa-spin"></i> Updating...
                </span>
            {/if}
        </h3>
    </div>
    
    <p class="text-gray-700 leading-relaxed text-sm text-justify">
        {$profile.resumeBio || $profile.bio}
    </p>
</section>