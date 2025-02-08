import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const path = event.url.pathname;
    
    // Block WordPress and PHP related paths
    if (path.includes('wp-admin') || 
        path.includes('wordpress') || 
        path.endsWith('.php')) {
        return new Response('Not Found', { status: 404 });
    }

    return await resolve(event);
};