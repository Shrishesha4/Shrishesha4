import { json } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
    console.log('Received enhancement request');
    try {
        const body = await request.json();
        console.log('Request body parsed');
        const { bio, skills, experience, projects, education, blogs } = body;
        
        const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        console.log('API Key present:', !!apiKey);

        if (!apiKey) {
            console.error('Gemini API key is missing');
            return json({ error: 'Gemini API key not configured on server' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        console.log('Model initialized');

        const prompt = `You are a professional resume writer.
        Based on the following profile data, write a compelling, professional resume summary (bio).
        
        Current Bio: ${bio || 'N/A'}
        Skills: ${skills ? skills.join(', ') : 'N/A'}
        Experience: ${experience ? experience.join('; ') : 'N/A'}
        Education: ${education ? JSON.stringify(education) : 'N/A'}
        Projects: ${projects ? projects.map((p: any) => p.title + ': ' + p.description).join('; ') : 'N/A'}
        Recent Blog Topics: ${blogs ? blogs.map((b: any) => b.title).join(', ') : 'N/A'}

        Instructions:
        1. Write a single, cohesive paragraph (3-5 sentences).
        2. Highlight key skills, major achievements, and professional identity.
        3. Keep it professional, impactful, and suitable for a resume header.
        4. Do not include markdown formatting.
        5. Write in the first person (implied) or third person as appropriate for a standard resume (e.g., "Software Engineer with 5+ years of experience...").`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return json({ summary: text.trim() });
    } catch (error: any) {
        console.error('Error enhancing resume summary:', error);
        return json({ error: `Failed to enhance summary: ${error.message || error}` }, { status: 500 });
    }
}