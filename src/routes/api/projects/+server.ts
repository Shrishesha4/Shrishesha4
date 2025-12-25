import { json } from '@sveltejs/kit';
import { adminDb } from '$lib/server/firebase';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import type { Project } from '$lib/types';
import { uploadImageToCloudinary } from '$lib/server/uploadUtils';

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
        let description = '';
        let technologies: string[] = [];
        let image = '';
        let github = '';
        let url = '';
        let id = crypto.randomUUID();

        const contentType = request.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            const data = await request.json();
            title = data.title;
            description = data.description;
            technologies = Array.isArray(data.technologies) ? data.technologies : [data.technologies];
            image = data.image || '';
            github = data.github || '';
            url = data.url || '';
            if (data.id) id = data.id;

        } else if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            
            title = formData.get('title') as string;
            description = formData.get('description') as string;
            github = (formData.get('github') as string) || '';
            url = (formData.get('url') as string) || '';
            if (formData.get('id')) id = formData.get('id') as string;

            // Handle technologies
            const techEntry = formData.get('technologies');
            if (techEntry) {
                try {
                    // Try parsing as JSON string
                    technologies = JSON.parse(techEntry as string);
                } catch {
                    // Fallback: comma separated string
                    technologies = (techEntry as string).split(',').map(t => t.trim());
                }
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
        if (!title || !description || !technologies) {
            return json({ error: 'Missing required fields: title, description, technologies' }, { status: 400 });
        }

        const newProject: Project = {
            id,
            title,
            description,
            image,
            technologies,
            github,
            url
        };

        const projectsRef = adminDb.collection('projects');
        const snapshot = await projectsRef.limit(1).get();

        if (snapshot.empty) {
             if (env.ADMIN_UID) {
                 await projectsRef.doc(env.ADMIN_UID).set({ projects: [newProject] });
                 return json({ message: 'Project created (new document)', project: newProject });
            }
            return json({ error: 'No existing projects document found and ADMIN_UID not set' }, { status: 404 });
        }

        const doc = snapshot.docs[0];
        const currentProjects = doc.data().projects || [];
        
        currentProjects.push(newProject);
        
        await doc.ref.update({ projects: currentProjects });

        return json({ message: 'Project added successfully', project: newProject });

    } catch (error) {
        console.error('API Error:', error);
        return json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
    }
};