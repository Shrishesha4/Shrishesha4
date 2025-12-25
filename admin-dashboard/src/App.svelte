<script lang="ts">
  import Dashboard from './routes/Dashboard.svelte';
  import Login from './routes/Login.svelte';
  import Debug from './routes/Debug.svelte';
  import ProjectFormPage from './routes/ProjectFormPage.svelte';
  import BlogFormPage from './routes/BlogFormPage.svelte';
  import { onMount } from 'svelte';
  import { isAuthenticated } from '$lib/stores/auth';
  import { navigate } from '$lib/router';

  let currentRoute = window.location.pathname;

  function handleRoute() {
    currentRoute = window.location.pathname;
    
    // Auth Protection
    if (currentRoute !== '/login' && !$isAuthenticated) {
      // Allow debug route without auth? probably not.
      // If we are not at login, and not authenticated, go to login.
      // But we need to allow the router to update to /login
      if (currentRoute !== '/login') {
         navigate('/login', { replace: true });
      }
    }
  }

  onMount(() => {
    window.addEventListener('popstate', handleRoute);
    
    // Initial check
    handleRoute();

    const unsubscribeAuth = isAuthenticated.subscribe(value => {
        if (!value && window.location.pathname !== '/login') {
            navigate('/login');
        }
    });

    return () => {
        window.removeEventListener('popstate', handleRoute);
        unsubscribeAuth();
    };
  });
</script>

<div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
  {#if currentRoute === '/login'}
    <Login />
  {:else if !$isAuthenticated}
    <!-- Loading / Redirecting state -->
    <div class="flex items-center justify-center h-screen">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div>
    </div>
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
