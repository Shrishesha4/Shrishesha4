import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const path = event.url.pathname;
    
    if (path.includes('wp-admin') || 
        path.includes('wordpress') || 
        path.endsWith('.php')) {
        return new Response('Not Found', { status: 404 });
    }

    return await resolve(event);
};