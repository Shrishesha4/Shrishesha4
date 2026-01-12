export async function GET({ url }: { url: URL }) {
    const feedUrl = url.searchParams.get('url');

    if (!feedUrl) {
        return new Response(JSON.stringify({ error: 'URL parameter is required' }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
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
            return new Response(JSON.stringify({ error: `Failed to fetch feed: ${response.statusText}` }), { 
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const text = await response.text();
        
        // Parse the RSS/Atom feed
        const items = parseRSSFeed(text);

        return new Response(JSON.stringify({ items }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch or parse RSS feed' }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
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
