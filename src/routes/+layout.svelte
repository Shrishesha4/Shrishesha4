<script lang="ts">
	import '../app.css';
	// import 'flowbite/dist/flowbite.css';
	let { children } = $props();

// @ts-nocheck
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
</script>
  
<Navbar>
    <NavBrand href="/" class="w-auto md:w-[67vw]">
        <img src="/favicon.png" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Shrishesha</span>
    </NavBrand>
    <div class="flex md:order-2">
        <Button size="sm">Get started</Button>
        <NavHamburger />
    </div>
    <NavUl class="order-1">
        <NavLi href="/" activeClass="active">Home</NavLi>
        <NavLi href="/aboutme">About</NavLi>
        <NavLi href="/projects">Projects</NavLi>
        <NavLi href="/contact">Contact</NavLi>
    </NavUl>
</Navbar>

{@render children()}