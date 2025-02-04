import { redirect } from '@sveltejs/kit';

export function load() {
    throw redirect(307, 'https://visual-compiler-workflow.vercel.app/');
}