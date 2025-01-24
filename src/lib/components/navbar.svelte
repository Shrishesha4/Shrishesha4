<script lang="ts">
    import '../../app.postcss';
    import { onMount } from 'svelte';
    import { theme } from '$lib/stores/theme';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';

    onMount(() => {
        theme.init();
    });
</script>

<Navbar class="bg-gray-100 dark:bg-neutral-800 border-gray-200 dark:border-neutral-700">
    <NavBrand href="/">
        <img src="/favicon.png" class="me-3 h-6 sm:h-9" alt="Portfolio Logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-neutral-100">Shrishesha</span>
    </NavBrand>
    <div class="flex md:order-2 gap-2">
        <Button size="sm" class="bg-neutral-700 dark:bg-neutral-600 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white">
            Get started
        </Button>
        <NavHamburger />
    </div>
    <NavUl class="order-1">
        <NavLi href="/" activeClass="active"><i class="fas fa-home me-2"></i>Home</NavLi>
        <NavLi href="/aboutme"><i class="fas fa-user me-2"></i>About</NavLi>
        <NavLi href="/projects"><i class="fas fa-code me-2"></i>Projects</NavLi>
        <NavLi href="/contact"><i class="fas fa-envelope me-2"></i>Contact</NavLi>
    </NavUl>
</Navbar>