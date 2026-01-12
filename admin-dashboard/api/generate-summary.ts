import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { title, description, technologies } = req.body;
        
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('Gemini API key not configured');
            return res.status(500).json({ error: 'Gemini API key not configured' });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        const text = result.response.text();

        let summary: string[];
        try {
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            summary = JSON.parse(cleanText);
        } catch (e) {
            summary = text.split('\n').filter(line => line.trim().length > 0).map(line => line.replace(/^[•-]\s*/, ''));
        }

        return res.status(200).json({ summary });
    } catch (error: any) {
        console.error('Error generating summary:', error);
        return res.status(500).json({ 
            error: 'Failed to generate summary', 
            details: error.message 
        });
    }
}
