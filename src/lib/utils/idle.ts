export function onIdleFor(timeout: number, callback: () => void) {
    let idleTimer: number;

    const resetTimer = () => {
        clearTimeout(idleTimer);
        idleTimer = window.setTimeout(callback, timeout);
    };

    const setupIdleDetection = () => {
        // Reset timer on user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, resetTimer, { passive: true });
        });

        // Initial timer setup
        resetTimer();
    };

    // Setup when window is available
    if (typeof window !== 'undefined') {
        setupIdleDetection();
    }

    // Cleanup function
    return () => {
        if (typeof window !== 'undefined') {
            clearTimeout(idleTimer);
            const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
            events.forEach(event => {
                document.removeEventListener(event, resetTimer);
            });
        }
    };
}