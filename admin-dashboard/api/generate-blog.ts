import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { title, description, style, content, generateOnly } = req.body;
        
        const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('Gemini API key not configured');
            return res.status(500).json({ error: 'Gemini API key not configured' });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        let prompt: string;
        let responseData: any = {};

        if (generateOnly === 'title') {
            prompt = `Based on this blog content, generate a compelling, SEO-friendly title (just the title text, nothing else):
            
Current title: ${title || 'None'}
Summary: ${description || 'None'}
Content preview: ${content ? content.replace(/<[^>]*>/g, '').slice(0, 500) : 'None'}

Return ONLY the title text, no quotes, no explanations.`;

            const result = await model.generateContent(prompt);
            const generatedTitle = result.response.text().trim().replace(/^["']|["']$/g, '');
            responseData.title = generatedTitle;

        } else if (generateOnly === 'summary') {
            prompt = `Based on this blog, write a compelling 1-2 sentence summary (just the summary text, nothing else):
            
Title: ${title || 'None'}
Current summary: ${description || 'None'}
Content preview: ${content ? content.replace(/<[^>]*>/g, '').slice(0, 800) : 'None'}

Return ONLY the summary text, no quotes, no explanations.`;

            const result = await model.generateContent(prompt);
            const generatedSummary = result.response.text().trim().replace(/^["']|["']$/g, '');
            responseData.summary = generatedSummary;

        } else if (generateOnly === 'tags') {
            prompt = `Based on this blog, generate 3-5 relevant tags as a JSON array (just the array, nothing else):
            
Title: ${title || 'None'}
Summary: ${description || 'None'}
Content preview: ${content ? content.replace(/<[^>]*>/g, '').slice(0, 500) : 'None'}

Return ONLY a JSON array like ["tag1", "tag2", "tag3"], no explanations.`;

            const result = await model.generateContent(prompt);
            const tagsText = result.response.text().trim();
            try {
                const tags = JSON.parse(tagsText);
                responseData.tags = Array.isArray(tags) ? tags : [];
            } catch {
                const matches = tagsText.match(/["']([^"']+)["']/g);
                responseData.tags = matches ? matches.map((m: string) => m.replace(/["']/g, '')) : [];
            }

        } else if (generateOnly === 'content') {
            prompt = `Regenerate the blog post content based on this context:
            
Title: ${title}
Summary: ${description || 'No summary provided'}
Current content context: ${content ? content.replace(/<[^>]*>/g, '').slice(0, 300) : 'None'}
Style: ${style || 'clear and engaging'}

Requirements:
1. Include headings (H2, H3).
2. Include an introduction and a conclusion.
3. Format the output as clean HTML suitable for a WYSIWYG editor (do not include <html>, <head>, or <body> tags, just the content).
4. Do not include markdown code blocks.`;

            const result = await model.generateContent(prompt);
            const text = result.response.text();
            const cleanContent = text.replace(/```html/g, '').replace(/```/g, '').trim();
            responseData.content = cleanContent;

        } else {
            prompt = `Write a detailed blog post titled "${title}". 
Summary context: ${description || 'No summary provided'}. 
Style: ${style || 'clear and engaging'}. 

Requirements:
1. Include headings (H2, H3).
2. Include an introduction and a conclusion.
3. Format the output as clean HTML suitable for a WYSIWYG editor (do not include <html>, <head>, or <body> tags, just the content).
4. Do not include markdown code blocks.

After the HTML content, on a new line add a JSON array of 3-5 relevant tags in this exact format:
TAGS: ["tag1", "tag2", "tag3"]`;

            const result = await model.generateContent(prompt);
            const text = result.response.text();
            
            const tagsMatch = text.match(/TAGS:\s*(\[[\s\S]*?\])/);
            let tags: string[] = [];
            let cleanContent = text;
            
            if (tagsMatch) {
                try {
                    tags = JSON.parse(tagsMatch[1]);
                    cleanContent = text.replace(/TAGS:\s*\[[\s\S]*?\]/, '').trim();
                } catch {
                    // Ignore parse error
                }
            }
            
            cleanContent = cleanContent.replace(/```html/g, '').replace(/```/g, '').trim();

            responseData.content = cleanContent;
            responseData.tags = tags.length > 0 ? tags : ['technology', 'blog', 'article'];
        }

        return res.status(200).json(responseData);
    } catch (error: any) {
        console.error('Error generating blog:', error);
        return res.status(500).json({ 
            error: 'Failed to generate blog content', 
            details: error.message 
        });
    }
}
