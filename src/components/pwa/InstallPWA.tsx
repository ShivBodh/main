
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DownloadCloud, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

export function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Detect if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsAppInstalled(true);
      return;
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      if(isIOS) {
          setShowIOSInstructions(true);
      }
      return;
    }
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsAppInstalled(true);
    }
    setInstallPrompt(null);
  };
  
  if (isAppInstalled) {
      return (
        <Alert variant="default" className="max-w-md mx-auto bg-green-50 border-green-200">
            <AlertTitle className="text-green-800">App Installed</AlertTitle>
            <AlertDescription className="text-green-700">
                You have successfully added the Sanatana Peethams Portal to your device.
            </AlertDescription>
        </Alert>
      );
  }

  return (
    <>
      <Button onClick={handleInstallClick} size="lg">
        <DownloadCloud className="mr-2 h-5 w-5" />
        Install App on Device
      </Button>
      {showIOSInstructions && (
          <Alert className="text-left mt-4 max-w-md mx-auto">
              <AlertTitle>To install the app on your iOS device:</AlertTitle>
              <AlertDescription>
                  <ol className="list-decimal list-inside space-y-1 mt-2">
                    <li>Tap the 'Share' button in your Safari browser.</li>
                    <li>Scroll down and tap 'Add to Home Screen'.</li>
                    <li>Confirm by tapping 'Add'.</li>
                  </ol>
              </AlertDescription>
          </Alert>
      )}
    </>
  );
}
