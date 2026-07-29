import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAdminDb } from '$lib/server/firebase';
import { isAllowedSpreadsheetUrl } from '$lib/utils/safeUrl';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const MAX_FIELD_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 200;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
	return (
		request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
		request.headers.get('x-real-ip') ||
		'unknown'
	);
}

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const entry = rateLimitMap.get(ip);

	if (!entry || now > entry.resetAt) {
		rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
		return false;
	}

	entry.count += 1;
	return entry.count > RATE_LIMIT_MAX;
}

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: RequestHandler = async ({ request }) => {
	const ip = getClientIp(request);
	if (isRateLimited(ip)) {
		error(429, 'Too many requests. Please try again later.');
	}

	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		error(400, 'Invalid JSON body');
	}

	// Honeypot: bots fill hidden fields; silently succeed
	if (typeof body.website === 'string' && body.website.trim() !== '') {
		return json({ success: true });
	}

	const name = typeof body.name === 'string' ? body.name.trim() : '';
	const email = typeof body.email === 'string' ? body.email.trim() : '';
	const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
	const message = typeof body.message === 'string' ? body.message.trim() : '';

	if (!name || !email || !subject || !message) {
		error(400, 'All fields are required');
	}
	if (name.length > MAX_NAME_LENGTH || email.length > MAX_EMAIL_LENGTH) {
		error(400, 'Name or email is too long');
	}
	if (subject.length > MAX_SUBJECT_LENGTH || message.length > MAX_FIELD_LENGTH) {
		error(400, 'Subject or message is too long');
	}
	if (!isValidEmail(email)) {
		error(400, 'Invalid email address');
	}

	const payload = {
		name,
		email,
		subject,
		message,
		timestamp: new Date(),
		read: false,
		ip
	};

	try {
		await getAdminDb().collection('messages').add(payload);
	} catch (err) {
		console.error('Failed to store contact message:', err);
		error(500, 'Failed to send message');
	}

	// Optional spreadsheet mirror — only allowlisted Google Apps Script URLs
	const spreadsheetUrl =
		typeof body.spreadsheetUrl === 'string' ? body.spreadsheetUrl.trim() : '';
	if (spreadsheetUrl && isAllowedSpreadsheetUrl(spreadsheetUrl)) {
		try {
			await fetch(spreadsheetUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({
					name,
					email,
					subject,
					message,
					timestamp: new Date().toISOString()
				}).toString()
			});
		} catch (err) {
			console.warn('Spreadsheet submission failed:', err);
		}
	}

	return json({ success: true });
};
