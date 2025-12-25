export function navigate(path: string, options?: { replace?: boolean }) {
    if (options?.replace) {
        window.history.replaceState({}, '', path);
    } else {
        window.history.pushState({}, '', path);
    }
    // Dispatch a popstate event so the App component updates
    window.dispatchEvent(new Event('popstate'));
}
