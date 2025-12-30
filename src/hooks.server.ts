import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const path = event.url.pathname;
    
    // Security headers
    if (path.includes('wp-admin') || 
        path.includes('wordpress') || 
        path.endsWith('.php')) {
        return new Response('Not Found', { status: 404 });
    }

    // CORS for API routes
    if (path.startsWith('/api')) {
        if (event.request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*'
                }
            });
        }
    }

    const response = await resolve(event);

    if (path.startsWith('/api')) {
        response.headers.append('Access-Control-Allow-Origin', '*');
    }

    return response;
};