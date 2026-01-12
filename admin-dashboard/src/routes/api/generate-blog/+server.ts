import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST({ request }: { request: Request }) {
    try {
        const { title, description, style } = await request.json();
        
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            console.error('Gemini API key not configured');
            return new Response(JSON.stringify({ error: 'Gemini API key not configured' }), { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `Write a detailed blog post titled "${title}". 
        Summary context: ${description || 'No summary provided'}. 
        Style: ${style || 'clear and engaging'}. 
        
        Requirements:
        1. Include headings (H2, H3).
        2. Include an introduction and a conclusion.
        3. Format the output as clean HTML suitable for a WYSIWYG editor (do not include <html>, <head>, or <body> tags, just the content).
        4. Do not include markdown code blocks.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean up markdown code blocks if present
        const cleanContent = text.replace(/```html/g, '').replace(/```/g, '').trim();

        return new Response(JSON.stringify({ content: cleanContent }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error('Error generating blog:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to generate blog content', 
            details: error.message 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
