<script>
    import Typinganimation from "./typinganimation.svelte";

</script>

<div>
    <h1 class="mb-6 text-6xl font-bold text-neutral-900 dark:text-neutral-100">
        Hi, I'm Shrishesha
    </h1>
    <div class="mb-8 text-5xl text-neutral-700 dark:text-neutral-300">
        I'm <span class="font-comic text-red-600 dark:text-red-400"><Typinganimation /></span>
    </div>
    <p class="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
        I craft intuitive user experiences and build innovative solutions.
    </p>
    <div class="flex gap-4">
        <a
            href="/aboutme"
            class="inline-flex items-center rounded-lg bg-neutral-900 px-6 py-3 text-white transition hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
            Know Me
        </a>
        <a
            href="/contact"
            class="inline-flex items-center rounded-lg border border-neutral-300 px-6 py-3 text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
            Contact Me
        </a>
    </div>
</div>