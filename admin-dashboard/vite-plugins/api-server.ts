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
              2. Focus on technical achievements, impact, and specific technologies used.
              3. Keep it professional and action-oriented (e.g., "Developed...", "Implemented...", "Optimized...").
              4. Return ONLY the bullet points as a JSON array of strings. Do not include markdown formatting or "json" tags.`;
              
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
              const { title, description, style } = JSON.parse(body);
              
              if (!apiKey) {
                console.error('Gemini API key not configured');
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Gemini API key not configured' }));
                return;
              }
              
              const genAI = new GoogleGenerativeAI(apiKey);
              const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
              
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
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ content: cleanContent }));
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
