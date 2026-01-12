import { json, type RequestEvent } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '$env/dynamic/private';

export async function POST({ request }: RequestEvent) {
    try {
        const { title, description, sourceUrl, sourceTitle, content } = await request.json();
        
        const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('Gemini API key not found');
            return json({ error: 'Gemini API key not configured' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Use gemini-1.5-flash which is widely available
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Clean up description/content from HTML
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

Write the blog post now:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean up markdown code blocks if present
        let cleanedContent = text.replace(/```html/g, '').replace(/```/g, '').trim();
        
        // Add source attribution at the end
        cleanedContent += `
<hr class="my-8 border-neutral-200 dark:border-neutral-700" />
<p class="text-sm text-neutral-500 dark:text-neutral-400 italic">
  This post was inspired by an article from <strong>${sourceTitle}</strong>. 
  <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" class="text-orange-500 hover:underline">Read the original article →</a>
</p>`;

        return json({ content: cleanedContent });
    } catch (error) {
        console.error('Error generating blog from RSS:', error);
        return json({ error: 'Failed to generate blog content from RSS item' }, { status: 500 });
    }
}
