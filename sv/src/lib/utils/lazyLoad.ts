export function lazyLoad(node: HTMLElement, options = {}) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                node.dispatchEvent(new CustomEvent('visible'));
                observer.unobserve(node);
            }
        });
    }, options);

    observer.observe(node);

    return {
        destroy() {
            observer.unobserve(node);
        }
    };
}