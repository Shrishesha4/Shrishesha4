<script lang="ts">
  import Dashboard from './routes/Dashboard.svelte';
  import Login from './routes/Login.svelte';
  import Debug from './routes/Debug.svelte';
  import ProjectFormPage from './routes/ProjectFormPage.svelte';
  import BlogFormPage from './routes/BlogFormPage.svelte';
  import { onMount } from 'svelte';

  let currentRoute = window.location.pathname;

  onMount(() => {
    const onPopState = () => {
      currentRoute = window.location.pathname;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  });

  // Simple route matching helper
  function match(pattern: string) {
    if (pattern === currentRoute) return true;
    if (pattern.endsWith('/*') && currentRoute.startsWith(pattern.slice(0, -2))) return true;
    return false;
  }
</script>

<div>
  {#if currentRoute === '/login'}
    <Login />
  {:else if currentRoute === '/debug'}
    <Debug />
  {:else if currentRoute === '/projects/new' || currentRoute.startsWith('/projects/edit/')}
    <ProjectFormPage />
  {:else if currentRoute === '/blogs/new' || currentRoute.startsWith('/blogs/edit/')}
    <BlogFormPage />
  {:else}
    <Dashboard />
  {/if}
</div>
