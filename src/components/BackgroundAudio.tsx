"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundAudio() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const userInteractedRef = useRef(false);

    useEffect(() => {
        // Attempt to autoplay on mount
        const tryPlay = async () => {
            if (audioRef.current && !userInteractedRef.current) {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                    userInteractedRef.current = true;
                } catch (error) {
                    // Autoplay blocked, wait for user interaction
                }
            }
        };

        tryPlay();

        // Play on the very first document interaction if autoplay was blocked
        const handleInteraction = async () => {
            if (!userInteractedRef.current && audioRef.current) {
                userInteractedRef.current = true; // Mark as interacted so we never auto-replay again on click
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        document.addEventListener("click", handleInteraction, { once: true });

        return () => {
            document.removeEventListener("click", handleInteraction);
        };
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation(); // prevent triggering the document click listener
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(console.error);
                userInteractedRef.current = true;
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <audio ref={audioRef} src="/bgm.mp3" loop autoPlay />
            <button
                onClick={togglePlay}
                className="fixed bottom-6 right-6 z-50 p-4 bg-white/60 backdrop-blur-md border border-white/40 text-black/80 rounded-full shadow-lg hover:bg-white/80 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                aria-label={isPlaying ? "Mute background music" : "Play background music"}
            >
                {isPlaying ? (
                    <Volume2 className="w-5 h-5 animate-pulse" />
                ) : (
                    <VolumeX className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                )}
            </button>
        </>
    );
}
