import { json } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
    try {
        const { title, description, style } = await request.json();
        
        const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return json({ error: 'Gemini API key not configured' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Use gemini-flash-latest which is widely available
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `Write a detailed blog post titled "${title}". 
        Summary context: ${description || 'No summary provided'}. 
        Style: ${style || 'clear and engaging'}. 
        
        Requirements:
        1. Include headings (H2, H3).
        2. Include an introduction and a conclusion.
        3. Format the output as clean HTML suitable for a WYSIWYG editor (do not include <html>, <head>, or <body> tags, just the content).
        4. Do not include markdown code blocks (like \`\`\`html).`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean up markdown code blocks if present
        const cleanContent = text.replace(/```html/g, '').replace(/```/g, '').trim();

        return json({ content: cleanContent });
    } catch (error) {
        console.error('Error generating blog:', error);
        return json({ error: 'Failed to generate blog content' }, { status: 500 });
    }
}