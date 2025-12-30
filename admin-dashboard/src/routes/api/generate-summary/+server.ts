import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST({ request }: { request: Request }) {
    try {
        const { title, description, technologies } = await request.json();
        
        // Get API key from environment variables
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('Gemini API key not configured');
            return new Response(JSON.stringify({ error: 'Gemini API key not configured' }), { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `Create a concise resume summary for a software project with the following details:
        Title: ${title}
        Description: ${description}
        Technologies: ${technologies.join(', ')}

        Requirements:
        1. Generate exactly 2 bullet points (each under 80 characters).
        2. Focus on technical achievements, impact, and specific technologies used.
        3. Keep it professional and action-oriented (e.g., "Developed...", "Implemented...", "Optimized...").
        4. Return ONLY the bullet points as a JSON array of strings. Do not include markdown formatting or "json" tags.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        let summary: string[];
        try {
            // Clean up any potential markdown code blocks
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            summary = JSON.parse(cleanText);
        } catch (e) {
            // Fallback parsing if JSON is malformed
            summary = text.split('\n').filter(line => line.trim().length > 0).map(line => line.replace(/^[•-]\s*/, ''));
        }

        return new Response(JSON.stringify({ summary }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error('Error generating summary:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to generate summary', 
            details: error.message 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
