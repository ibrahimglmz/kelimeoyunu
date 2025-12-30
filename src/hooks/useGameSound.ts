import { useEffect, useRef, useState } from 'react';

export const useGameSound = (soundFile: string, isGameActive: boolean, volume: number = 1.0) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    useEffect(() => {
        // Create audio element
        const audio = new Audio(soundFile);
        audio.loop = true;
        audio.volume = Math.max(0, Math.min(1, volume)); // Clamp between 0 and 1
        audioRef.current = audio;

        // Handle user interaction requirement for auto-play
        const handleInteraction = () => {
            setHasUserInteracted(true);
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);

        return () => {
            audio.pause();
            audio.src = '';
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, [soundFile]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const playAudio = async () => {
            try {
                if (isGameActive && hasUserInteracted) {
                    await audio.play();
                } else {
                    audio.pause();
                    if (!isGameActive) {
                        audio.currentTime = 0;
                    }
                }
            } catch (error) {
                console.warn('Audio play failed:', error);
            }
        };

        playAudio();
    }, [isGameActive, hasUserInteracted]);

    return {
        // Expose control to toggle sound manually if needed
        toggleSound: () => {
            if (audioRef.current?.paused) {
                audioRef.current.play().catch(console.error);
            } else {
                audioRef.current?.pause();
            }
        }
    };
};
