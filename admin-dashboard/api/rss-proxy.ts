import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const feedUrl = req.query.url as string;

    if (!feedUrl) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        // Validate URL
        new URL(feedUrl);

        // Fetch the RSS feed
        const response = await fetch(feedUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; RSSReader/1.0)',
                'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: `Failed to fetch feed: ${response.statusText}` });
        }

        const text = await response.text();
        const items = parseRSSFeed(text);

        return res.status(200).json({ items });
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return res.status(500).json({ error: 'Failed to fetch or parse RSS feed' });
    }
}

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

    const isAtom = xml.includes('<feed') && xml.includes('xmlns="http://www.w3.org/2005/Atom"');

    if (isAtom) {
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

    return items.slice(0, 30);
}

function extractTag(xml: string, tagName: string): string {
    const cdataRegex = new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tagName}>`, 'i');
    const cdataMatch = xml.match(cdataRegex);
    if (cdataMatch) {
        return cdataMatch[1].trim();
    }

    const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
    const match = xml.match(regex);
    return match ? match[1].trim() : '';
}

function extractAtomLink(xml: string): string {
    const alternateMatch = xml.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i);
    if (alternateMatch) {
        return alternateMatch[1];
    }
    
    const hrefMatch = xml.match(/<link[^>]*href=["']([^"']+)["']/i);
    return hrefMatch ? hrefMatch[1] : '';
}

function extractGuid(xml: string): string {
    const match = xml.match(/<guid[^>]*>([^<]+)<\/guid>/i);
    return match ? match[1].trim() : '';
}

function extractMediaImage(xml: string): string {
    const thumbnailMatch = xml.match(/<media:thumbnail[^>]*url=["']([^"']+)["']/i);
    if (thumbnailMatch) {
        return thumbnailMatch[1];
    }

    const mediaMatch = xml.match(/<media:content[^>]*url=["']([^"']+)["'][^>]*type=["']image/i);
    if (mediaMatch) {
        return mediaMatch[1];
    }

    const enclosureMatch = xml.match(/<enclosure[^>]*type=["']image[^"']*["'][^>]*url=["']([^"']+)["']/i);
    if (enclosureMatch) {
        return enclosureMatch[1];
    }

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
