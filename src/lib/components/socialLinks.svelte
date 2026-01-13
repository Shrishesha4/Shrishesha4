<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { socialLinks } from '$lib/stores/socialLinks';

    onMount(() => {
        // Load social links
        socialLinks.load();

        // Create container first
        const container = document.createElement('div');
        container.className = 'bmc-btn-container';
        document.body.appendChild(container);

        // Then load the script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js';
        script.setAttribute('data-name', 'bmc-button');
        script.setAttribute('data-slug', 'shrishesha4');
        script.setAttribute('data-color', '#FF5F5F');
        script.setAttribute('data-emoji', '');
        script.setAttribute('data-font', 'Lato');
        script.setAttribute('data-text', 'Buy me a coffee');
        script.setAttribute('data-outline-color', '#000000');
        script.setAttribute('data-font-color', '#ffffff');
        script.setAttribute('data-coffee-color', '#FFDD00');

        document.addEventListener('DOMContentLoaded', () => {
            document.head.appendChild(script);
        });
        
        script.onload = () => {
            setTimeout(() => {
                // @ts-ignore
                if (window.BmcButton) {
                    // @ts-ignore
                    window.BmcButton.init();
                }
            }, 100);
        };


        return () => {
            // Cleanup on component unmount
            container?.remove();
            script?.remove();
        };
    });

    onDestroy(() => {
        socialLinks.cleanup();
    });
</script>

<div>
    <!-- Mobile view social links -->
    <div class="mb-3 flex justify-center gap-8 md:hidden">
        {#each $socialLinks.links as link (link.id)}
            <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
                {#if link.icon.startsWith('http://') || link.icon.startsWith('https://')}
                    <img src="{link.icon}" alt="{link.label}" class="w-8 h-8" />
                {:else}
                    <i class="{link.icon} text-2xl"></i>
                {/if}
                <span class="sr-only">{link.label}</span>
            </a>
        {/each}
    </div>
</div>