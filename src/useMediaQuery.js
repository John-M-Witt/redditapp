import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(() => {
        // Safeguard against window.matchMedia being undefined
        return typeof window !== 'undefined' ? window.matchMedia(query).matches : false;
    });

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const documentChangeHandler = () => setMatches(mediaQueryList.matches);

        mediaQueryList.addEventListener ? mediaQueryList.addEventListener('change', documentChangeHandler) : mediaQueryList.addListener('change', documentChangeHandler);

        return () => {
           mediaQueryList.removeEventListener ? mediaQueryList.removeEventListener('change', documentChangeHandler) :  mediaQueryList.removeListener('change', documentChangeHandler);
        };
    }, [query]);

    return matches;
};
