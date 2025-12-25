export function onIdleFor(timeout: number, callback: () => void) {
    let idleTimer: number;

    const resetTimer = () => {
        clearTimeout(idleTimer);
        idleTimer = window.setTimeout(callback, timeout);
    };

    const setupIdleDetection = () => {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, resetTimer, { passive: true });
        });

        resetTimer();
    };

    if (typeof window !== 'undefined') {
        setupIdleDetection();
    }

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