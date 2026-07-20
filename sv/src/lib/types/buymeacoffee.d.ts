declare global {
    interface Window {
        BmcButton?: {
            init: () => void;
        };
    }
}

export {};