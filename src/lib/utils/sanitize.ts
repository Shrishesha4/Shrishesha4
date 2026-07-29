import DOMPurify from 'isomorphic-dompurify';

const ALLOWED_TAGS = [
	'a',
	'abbr',
	'b',
	'blockquote',
	'br',
	'code',
	'em',
	'figcaption',
	'figure',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'hr',
	'i',
	'img',
	'li',
	'ol',
	'p',
	'pre',
	's',
	'strong',
	'sub',
	'sup',
	'table',
	'tbody',
	'td',
	'th',
	'thead',
	'tr',
	'ul',
	'span',
	'div'
];

const ALLOWED_ATTR = [
	'href',
	'title',
	'target',
	'rel',
	'src',
	'alt',
	'width',
	'height',
	'class',
	'id'
];

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
	if (node.tagName === 'A') {
		const href = node.getAttribute('href') || '';
		if (
			href.startsWith('javascript:') ||
			href.startsWith('data:') ||
			href.startsWith('vbscript:')
		) {
			node.removeAttribute('href');
		}
		if (node.getAttribute('target') === '_blank') {
			node.setAttribute('rel', 'noopener noreferrer');
		}
	}
	if (node.tagName === 'IMG') {
		const src = node.getAttribute('src') || '';
		if (!src.startsWith('https://') && !src.startsWith('/')) {
			node.removeAttribute('src');
		}
	}
});

/** Sanitize untrusted HTML (e.g. blog content from Firestore) before {@html}. */
export function sanitizeHtml(dirty: string | null | undefined): string {
	if (!dirty) return '';
	return DOMPurify.sanitize(dirty, {
		ALLOWED_TAGS,
		ALLOWED_ATTR,
		ALLOW_DATA_ATTR: false,
		FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form', 'input'],
		FORBID_ATTR: ['style', 'onerror', 'onload', 'onclick']
	});
}
