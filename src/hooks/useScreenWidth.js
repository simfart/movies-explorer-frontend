import { useState, useEffect } from 'react';

export default function useScreenWidth() {

    const [windowWidth, setWindowWidth] = useState(null);

    const isWindow = typeof window !== 'undefined';

    const getWidth = () => isWindow ? window.innerWidth : windowWidth;

    const resize = () => setWindowWidth(getWidth());

    useEffect(() => {
        if (isWindow) {
            setTimeout(function () {
                
                setWindowWidth(getWidth());

                window.addEventListener('resize', resize);

                return () => window.removeEventListener('resize', resize);

            }, 500);
        }
    }, [isWindow]);

    return windowWidth;
}