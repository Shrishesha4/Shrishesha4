import { json } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
    try {
        const { title, description, technologies } = await request.json();
        
        const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return json({ error: 'Gemini API key not configured' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `Create a concise resume summary for a software project with the following details:
        Title: ${title}
        Description: ${description}
        Technologies: ${technologies.join(', ')}

        Requirements:
        1. Generate exactly 2-3 bullet points.
        2. Each bullet point must be MAXIMUM 120 characters (one short sentence).
        3. Focus on ONE key technical achievement or impact per bullet point.
        4. Use strong action verbs ("Engineered", "Implemented", "Optimized", "Developed").
        5. Be extremely concise - cut all unnecessary words.
        6. Return ONLY the bullet points as a JSON array of strings. Do not include markdown formatting or "json" tags.`;

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

        return json({ summary });
    } catch (error) {
        console.error('Error generating summary:', error);
        return json({ error: 'Failed to generate summary' }, { status: 500 });
    }
}
