import { json } from '@sveltejs/kit';
import { adminDb } from '$lib/server/firebase';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import type { Blog } from '$lib/types';
import { uploadImageToCloudinary, fetchContentFromUrl } from '$lib/server/uploadUtils';

export const POST: RequestHandler = async ({ request }) => {
    const apiKey = request.headers.get('x-api-key');
    if (!env.API_SECRET || apiKey !== env.API_SECRET) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!adminDb) {
        return json({ error: 'Server misconfiguration: Firebase Admin not initialized' }, { status: 500 });
    }

    try {
        let title = '';
        let content = '';
        let description = '';
        let image = '';
        let date = new Date().toISOString();
        let tags: string[] = [];
        let slug = '';
        let id = crypto.randomUUID();

        const contentType = request.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            const data = await request.json();
            title = data.title;
            content = data.content;
            description = data.description || '';
            image = data.image || '';
            date = data.date || date;
            tags = data.tags || [];
            slug = data.slug || '';
            if (data.id) id = data.id;

            // Handle URL for content if provided in JSON
            if (!content && data.mdUrl) {
                content = await fetchContentFromUrl(data.mdUrl);
            }
        } else if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            
            title = formData.get('title') as string;
            description = (formData.get('description') as string) || '';
            date = (formData.get('date') as string) || date;
            slug = (formData.get('slug') as string) || '';
            if (formData.get('id')) id = formData.get('id') as string;

            // Handle tags
            const tagsEntry = formData.get('tags');
            if (tagsEntry) {
                try {
                    // Try parsing as JSON string
                    tags = JSON.parse(tagsEntry as string);
                } catch {
                    // Fallback: comma separated string
                    tags = (tagsEntry as string).split(',').map(t => t.trim());
                }
            }

            // Handle Content
            const contentEntry = formData.get('content');
            const mdFile = formData.get('mdFile');
            const mdUrl = formData.get('mdUrl');

            if (contentEntry) {
                content = contentEntry as string;
            } else if (mdFile instanceof File) {
                content = await mdFile.text();
            } else if (mdUrl) {
                content = await fetchContentFromUrl(mdUrl as string);
            }

            // Handle Image
            const imageEntry = formData.get('image');
            const imageUrl = formData.get('imageUrl');

            if (imageEntry instanceof File) {
                image = await uploadImageToCloudinary(imageEntry);
            } else if (imageEntry && typeof imageEntry === 'string') {
                image = imageEntry;
            } else if (imageUrl) {
                image = imageUrl as string;
            }
        } else {
             return json({ error: 'Unsupported Content-Type' }, { status: 400 });
        }

        // Validation
        if (!title) {
             return json({ error: 'Missing required field: title' }, { status: 400 });
        }
        if (!content) {
             return json({ error: 'Missing required field: content (or mdFile/mdUrl)' }, { status: 400 });
        }

        if (!slug) {
            slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        const newBlog: Blog = {
            id,
            title,
            content,
            description,
            image,
            date,
            tags,
            slug
        };

        const blogsRef = adminDb.collection('blogs');
        const snapshot = await blogsRef.limit(1).get();

        if (snapshot.empty) {
            if (env.ADMIN_UID) {
                 await blogsRef.doc(env.ADMIN_UID).set({ blogs: [newBlog] });
                 return json({ message: 'Blog created (new document)', blog: newBlog });
            }
            return json({ error: 'No existing blog document found and ADMIN_UID not set' }, { status: 404 });
        }

        const doc = snapshot.docs[0];
        const currentBlogs = doc.data().blogs || [];
        
        currentBlogs.push(newBlog);
        
        await doc.ref.update({ blogs: currentBlogs });

        return json({ message: 'Blog added successfully', blog: newBlog });

    } catch (error) {
        console.error('API Error:', error);
        return json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
    }
};