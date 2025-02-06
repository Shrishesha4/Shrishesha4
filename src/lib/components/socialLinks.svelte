<script lang="ts">
    import { onMount } from 'svelte';

    onMount(() => {
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
        
        document.head.appendChild(script);
    });
</script>

<div>
    <div class="fixed bottom-8 left-8 hidden flex-col gap-8 md:flex">
        <a
            href="https://github.com/shrishesha4"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
        >
            <i class="fa-brands fa-github text-2xl"></i>
            <span class="sr-only">GitHub</span>
        </a>
        <a
            href="https://linkedin.com/in/shrishesha"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
        >
            <i class="fa-brands fa-linkedin text-2xl"></i>
            <span class="sr-only">LinkedIn</span>
        </a>
        <a
            href="https://x.com/Shrishesha4"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
        >
            <i class="fa-brands fa-x-twitter text-2xl"></i>
            <span class="sr-only">Twitter</span>
        </a>
        <a
            href="mailto:shrisheshanarmatesshvara@gmail.com"
            target="_blank"
            class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
        >
            <i class="fa-regular fa-envelope text-2xl"></i>
            <span class="sr-only">Email</span>
        </a>
    </div>

    <!-- Add mobile view social links -->
    <div class="mb-3 flex justify-center gap-8 md:hidden">
        <!-- Same social links as above -->
        <a
            href="https://github.com/shrishesha4"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
        >
            <i class="fa-brands fa-github text-2xl"></i>
            <span class="sr-only">GitHub</span>
        </a>
        <a
            href="https://linkedin.com/in/shrishesha"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
        >
            <i class="fa-brands fa-linkedin text-2xl"></i>
            <span class="sr-only">LinkedIn</span>
        </a>
        <a
            href="https://x.com/Shrishesha4"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
        >
            <i class="fa-brands fa-x-twitter text-2xl"></i>
            <span class="sr-only">Twitter</span>
        </a>
        <a
            href="mailto:shrisheshanarmatesshvara@gmail.com"
            target="_blank"
            class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
        >
            <i class="fa-regular fa-envelope text-2xl"></i>
            <span class="sr-only">Email</span>
        </a>
        <a 
            href="https://www.buymeacoffee.com/shrishesha4" 
            target="_blank"
            class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
        >
            <i class="fa fa-coffee text-2xl text-[#FFA500]"></i>
            <span class="sr-only">Buy me a coffee</span>
        </a>
    </div>
</div>