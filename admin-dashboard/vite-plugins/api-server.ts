import type { Plugin } from 'vite';
import { GoogleGenerativeAI } from '@google/generative-ai';

export function apiServerPlugin(): Plugin {
  let apiKey: string | undefined;
  
  return {
    name: 'api-server',
    configResolved(config) {
      // Access environment variables from Vite config
      apiKey = config.env.VITE_GEMINI_API_KEY || config.env.GEMINI_API_KEY;
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // RSS Proxy endpoint
        if (req.url?.startsWith('/api/rss-proxy') && req.method === 'GET') {
          try {
            const urlParams = new URL(req.url, 'http://localhost');
            const feedUrl = urlParams.searchParams.get('url');
            
            if (!feedUrl) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'URL parameter is required' }));
              return;
            }
            
            // Validate URL
            try {
              new URL(feedUrl);
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid URL format' }));
              return;
            }
            
            // Fetch the RSS feed
            const response = await fetch(feedUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; RSSReader/1.0)',
                'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml'
              }
            });
            
            if (!response.ok) {
              res.statusCode = response.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: `Failed to fetch feed: ${response.statusText}` }));
              return;
            }
            
            const text = await response.text();
            const items = parseRSSFeed(text);
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ items }));
          } catch (error: any) {
            console.error('Error fetching RSS feed:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to fetch or parse RSS feed' }));
          }
          return;
        }
        
        // Generate blog from RSS endpoint
        if (req.url === '/api/generate-blog-from-rss' && req.method === 'POST') {
          let body = '';
          
          req.on('data', chunk => {
            body += chunk.toString();
          });
          
          req.on('end', async () => {
            try {
              const { title, description, sourceUrl, sourceTitle, content } = JSON.parse(body);
              
              if (!apiKey) {
                console.error('Gemini API key not configured');
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Gemini API key not configured' }));
                return;
              }
              
              const genAI = new GoogleGenerativeAI(apiKey);
              const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
              
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
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ content: cleanedContent }));
            } catch (error: any) {
              console.error('Error generating blog from RSS:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                error: 'Failed to generate blog content from RSS item', 
                details: error.message 
              }));
            }
          });
          return;
        }
        
        if (req.url === '/api/generate-summary' && req.method === 'POST') {
          let body = '';
          
          req.on('data', chunk => {
            body += chunk.toString();
          });
          
          req.on('end', async () => {
            try {
              const { title, description, technologies } = JSON.parse(body);
              
              if (!apiKey) {
                console.error('Gemini API key not configured. Make sure VITE_GEMINI_API_KEY is set in .env file');
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Gemini API key not configured' }));
                return;
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
                const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
                summary = JSON.parse(cleanText);
              } catch (e) {
                summary = text.split('\n').filter(line => line.trim().length > 0).map(line => line.replace(/^[•-]\s*/, ''));
              }
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ summary }));
            } catch (error: any) {
              console.error('Error generating summary:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                error: 'Failed to generate summary', 
                details: error.message 
              }));
            }
          });
        } else if (req.url === '/api/generate-blog' && req.method === 'POST') {
          let body = '';
          
          req.on('data', chunk => {
            body += chunk.toString();
          });
          
          req.on('end', async () => {
            try {
              const { title, description, style, content, generateOnly } = JSON.parse(body);
              
              if (!apiKey) {
                console.error('Gemini API key not configured');
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Gemini API key not configured' }));
                return;
              }
              
              const genAI = new GoogleGenerativeAI(apiKey);
              const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
              
              let prompt: string;
              let responseData: any = {};

              // Handle specific field regeneration
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
                // Generate full blog with tags
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
                
                // Extract tags if present
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
                
                // Clean up markdown code blocks if present
                cleanContent = cleanContent.replace(/```html/g, '').replace(/```/g, '').trim();

                responseData.content = cleanContent;
                responseData.tags = tags.length > 0 ? tags : ['technology', 'blog', 'article'];
              }
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(responseData));
            } catch (error: any) {
              console.error('Error generating blog:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                error: 'Failed to generate blog content', 
                details: error.message 
              }));
            }
          });
        } else if (req.url === '/api/enhance-resume-summary' && req.method === 'POST') {
          let body = '';
          
          req.on('data', chunk => {
            body += chunk.toString();
          });
          
          req.on('end', async () => {
            try {
              const { bio, skills, experience, projects, education, blogs } = JSON.parse(body);
              
              if (!apiKey) {
                console.error('Gemini API key not configured');
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Gemini API key not configured' }));
                return;
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
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ summary: text.trim() }));
            } catch (error: any) {
              console.error('Error enhancing resume summary:', error);
              
              // Handle rate limit errors
              if (error.status === 429) {
                const retryMatch = error.message?.match(/retry in (\d+)/i);
                const retrySeconds = retryMatch ? retryMatch[1] : '60';
                res.statusCode = 429;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 
                  error: `Rate limit exceeded. Please wait ${retrySeconds} seconds.`,
                  retryAfter: parseInt(retrySeconds)
                }));
                return;
              }
              
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                error: 'Failed to enhance summary', 
                details: error.message 
              }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

// RSS Feed parsing helper functions
function parseRSSFeed(xml: string): Array<{
    title: string;
    link: string;
    description: string;
    pubDate: string;
    content?: string;
    image?: string;
}> {
    const items: Array<{
        title: string;
        link: string;
        description: string;
        pubDate: string;
        content?: string;
        image?: string;
    }> = [];

    // Try to detect if it's Atom or RSS
    const isAtom = xml.includes('<feed') && xml.includes('xmlns="http://www.w3.org/2005/Atom"');

    if (isAtom) {
        // Parse Atom feed
        const entryMatches = xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
        
        for (const entry of entryMatches) {
            const title = extractTag(entry, 'title');
            const link = extractAtomLink(entry);
            const description = extractTag(entry, 'summary') || extractTag(entry, 'content');
            const pubDate = extractTag(entry, 'published') || extractTag(entry, 'updated');
            const content = extractTag(entry, 'content');
            const image = extractMediaImage(entry);

            items.push({
                title: decodeHtmlEntities(title),
                link,
                description: decodeHtmlEntities(description),
                pubDate,
                content: decodeHtmlEntities(content),
                image
            });
        }
    } else {
        // Parse RSS feed
        const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
        
        for (const item of itemMatches) {
            const title = extractTag(item, 'title');
            const link = extractTag(item, 'link') || extractGuid(item);
            const description = extractTag(item, 'description');
            const pubDate = extractTag(item, 'pubDate') || extractTag(item, 'dc:date');
            const content = extractTag(item, 'content:encoded') || extractTag(item, 'content');
            const image = extractMediaImage(item) || extractEnclosure(item);

            items.push({
                title: decodeHtmlEntities(title),
                link,
                description: decodeHtmlEntities(description),
                pubDate,
                content: decodeHtmlEntities(content),
                image
            });
        }
    }

    return items.slice(0, 30); // Limit to 30 items per feed
}

function extractTag(xml: string, tagName: string): string {
    // Handle CDATA sections
    const cdataRegex = new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tagName}>`, 'i');
    const cdataMatch = xml.match(cdataRegex);
    if (cdataMatch) {
        return cdataMatch[1].trim();
    }

    // Handle regular tags
    const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
    const match = xml.match(regex);
    return match ? match[1].trim() : '';
}

function extractAtomLink(xml: string): string {
    // Try to find alternate link first
    const alternateMatch = xml.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i);
    if (alternateMatch) {
        return alternateMatch[1];
    }
    
    // Try to find href in link tag
    const hrefMatch = xml.match(/<link[^>]*href=["']([^"']+)["']/i);
    return hrefMatch ? hrefMatch[1] : '';
}

function extractGuid(xml: string): string {
    const match = xml.match(/<guid[^>]*>([^<]+)<\/guid>/i);
    return match ? match[1].trim() : '';
}

function extractMediaImage(xml: string): string {
    // Try media:thumbnail
    const thumbnailMatch = xml.match(/<media:thumbnail[^>]*url=["']([^"']+)["']/i);
    if (thumbnailMatch) {
        return thumbnailMatch[1];
    }

    // Try media:content with image type
    const mediaMatch = xml.match(/<media:content[^>]*url=["']([^"']+)["'][^>]*type=["']image/i);
    if (mediaMatch) {
        return mediaMatch[1];
    }

    // Try enclosure with image type
    const enclosureMatch = xml.match(/<enclosure[^>]*type=["']image[^"']*["'][^>]*url=["']([^"']+)["']/i);
    if (enclosureMatch) {
        return enclosureMatch[1];
    }

    // Try img tag in description/content
    const imgMatch = xml.match(/<img[^>]*src=["']([^"']+)["']/i);
    if (imgMatch) {
        return imgMatch[1];
    }

    return '';
}

function extractEnclosure(xml: string): string {
    const match = xml.match(/<enclosure[^>]*url=["']([^"']+)["'][^>]*type=["']image/i);
    return match ? match[1] : '';
}

function decodeHtmlEntities(text: string): string {
    if (!text) return '';
    
    return text
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}
