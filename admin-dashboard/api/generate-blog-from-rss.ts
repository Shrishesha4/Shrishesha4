import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { title, description, sourceUrl, sourceTitle, content } = req.body;
        
        const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('Gemini API key not configured');
            return res.status(500).json({ error: 'Gemini API key not configured' });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const cleanDescription = (description || '').replace(/<[^>]*>/g, '').trim();
        const cleanContent = (content || '').replace(/<[^>]*>/g, '').trim();

        const prompt = `You are a skilled blog writer. Based on the following news article information, write an original, insightful blog post that:

1. Takes inspiration from the source material but adds your own perspective and analysis
2. Is NOT a direct copy or paraphrase of the original article
3. Provides valuable insights, context, or commentary
4. Is written in an engaging, conversational style
5. Is formatted as clean HTML suitable for a blog post (no <html>, <head>, or <body> tags)

SOURCE ARTICLE INFORMATION:
Title: ${title}
Source: ${sourceTitle}
${cleanDescription ? `Summary: ${cleanDescription}` : ''}
${cleanContent ? `Content excerpt: ${cleanContent.slice(0, 1500)}` : ''}

REQUIREMENTS:
- Create an original blog post inspired by this topic
- Include relevant headings (H2, H3)
- Add an engaging introduction that hooks the reader
- Provide analysis, context, or your unique take on the topic
- Include a thoughtful conclusion
- Format as clean HTML (no markdown code blocks)
- Do NOT include source attribution in the content (that will be added separately)
- Make it approximately 800-1200 words

After the HTML content, on a new line add a JSON array of 3-5 relevant tags in this exact format:
TAGS: ["tag1", "tag2", "tag3"]

Write the blog post now:`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        
        const tagsMatch = text.match(/TAGS:\s*(\[[\s\S]*?\])/);
        let tags: string[] = [];
        let cleanedContent = text;
        
        if (tagsMatch) {
            try {
                tags = JSON.parse(tagsMatch[1]);
                cleanedContent = text.replace(/TAGS:\s*\[[\s\S]*?\]/, '').trim();
            } catch {
                // Ignore parse error
            }
        }
        
        cleanedContent = cleanedContent.replace(/```html/g, '').replace(/```/g, '').trim();
        
        cleanedContent += `
<hr class="my-8 border-neutral-200 dark:border-neutral-700" />
<p class="text-sm text-neutral-500 dark:text-neutral-400 italic">
  This post was inspired by an article from <strong>${sourceTitle}</strong>. 
  <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" class="text-orange-500 hover:underline">Read the original article →</a>
</p>`;

        return res.status(200).json({ 
            content: cleanedContent,
            tags: tags.length > 0 ? tags : ['news', 'technology', 'article']
        });
    } catch (error: any) {
        console.error('Error generating blog from RSS:', error);
        return res.status(500).json({ 
            error: 'Failed to generate blog content from RSS item', 
            details: error.message 
        });
    }
}
