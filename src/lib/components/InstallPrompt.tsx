"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
}

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showInstall, setShowInstall] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            const promptEvent = e as BeforeInstallPromptEvent;
            promptEvent.preventDefault();
            setDeferredPrompt(promptEvent);
            setShowInstall(true);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            setShowInstall(false);
        }

        setDeferredPrompt(null);
    };

    if (!showInstall) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center z-50 shadow-lg">
            <p className="text-sm">Install DotWraps for better experience 🚀</p>

            <button
                onClick={handleInstallClick}
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold"
            >
                Install
            </button>
        </div>
    );
}
