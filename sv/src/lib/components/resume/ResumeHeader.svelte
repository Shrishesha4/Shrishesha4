<script lang="ts">
    import { profile } from '$lib/stores/profile';
    import { contact } from '$lib/stores/contact';
    import { socialLinks } from '$lib/stores/socialLinks';
    import { onMount } from 'svelte';

    onMount(() => {
        socialLinks.load();
    });

    // Helper to clean URL for display (remove protocol)
    function getHostname(url: string) {
        try {
            return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
        } catch {
            return url;
        }
    }
</script>

<header class="border-b-2 border-gray-800 pb-6 mb-6">
    <div class="flex justify-between items-start">
        <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide">{$profile.name}</h1>
            <!-- <h2 class="text-xl text-gray-700 font-medium mb-4">{$profile.title}</h2> -->
            
            <div class="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-600">
                {#if $contact.email}
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-envelope"></i>
                        <a href="mailto:{$contact.email}" class="hover:underline">{$contact.email}</a>
                    </div>
                {/if}
                
                {#if $profile.location || $contact.location}
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>{$profile.location || $contact.location}</span>
                    </div>
                {/if}

                {#if $contact.phone}
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-phone"></i>
                        <span>{$contact.phone}</span>
                    </div>
                {/if}
            </div>

            <!-- Social Links -->
                         <div class="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-gray-600">
                {#each $socialLinks.links.filter(l => l.enabled && !l.url.startsWith('mailto:')) as link (link.id)}
                    <div class="flex items-center gap-2">
                        {#if link.icon.startsWith('http://') || link.icon.startsWith('https://')}
                            <img src="{link.icon}" alt="{link.label}" class="w-4 h-4 inline-block brightness-0" />
                        {:else}
                            <i class="{link.icon}"></i>
                        {/if}
                        <a href={link.url} target="_blank" class="hover:underline">{getHostname(link.url)}</a>
                    </div>
                {/each}
            </div>
        </div>
        
        <!-- Optional: Profile Image -->
        {#if $profile.profileImage}
            <img 
                src={$profile.profileImage} 
                alt={$profile.name}
                class="w-24 h-24 rounded-full object-cover border-2 border-gray-200 hidden sm:block print:block"
            />
        {/if}
    </div>
</header>