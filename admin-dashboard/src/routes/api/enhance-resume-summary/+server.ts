import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST({ request }: { request: Request }) {
    try {
        const { bio, skills, experience, projects, education, blogs } = await request.json();
        
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
        const response = await result.response;
        const text = response.text();

        return new Response(JSON.stringify({ summary: text.trim() }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error('Error enhancing resume summary:', error);
        
        // Handle rate limit errors
        if (error.status === 429) {
            const retryMatch = error.message?.match(/retry in (\d+)/i);
            const retrySeconds = retryMatch ? retryMatch[1] : '60';
            return new Response(JSON.stringify({ 
                error: `Rate limit exceeded. Please wait ${retrySeconds} seconds.`,
                retryAfter: parseInt(retrySeconds)
            }), { 
                status: 429,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        return new Response(JSON.stringify({ 
            error: 'Failed to enhance summary', 
            details: error.message 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
