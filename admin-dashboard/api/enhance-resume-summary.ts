import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { bio, skills, experience, projects, education, blogs } = req.body;
        
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('Gemini API key not configured');
            return res.status(500).json({ error: 'Gemini API key not configured' });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
5. Write in third person as appropriate for a standard resume (e.g., "Software Engineer with 5+ years of experience...").`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return res.status(200).json({ summary: text.trim() });
    } catch (error: any) {
        console.error('Error enhancing resume summary:', error);
        
        if (error.status === 429) {
            const retryMatch = error.message?.match(/retry in (\d+)/i);
            const retrySeconds = retryMatch ? retryMatch[1] : '60';
            return res.status(429).json({ 
                error: `Rate limit exceeded. Please wait ${retrySeconds} seconds.`,
                retryAfter: parseInt(retrySeconds)
            });
        }
        
        return res.status(500).json({ 
            error: 'Failed to enhance summary', 
            details: error.message 
        });
    }
}
