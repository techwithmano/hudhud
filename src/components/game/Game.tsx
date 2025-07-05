'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Volume2, VolumeX } from 'lucide-react';

// Import scenes
import GardenScene from '@/components/game/scenes/GardenScene';
import TrailScene from '@/components/game/scenes/TrailScene';
import SkyScene from '@/components/game/scenes/SkyScene';
import FinalScene from '@/components/game/FinalScene';

type Scene = 'intro' | 'garden' | 'trail' | 'sky' | 'final';

export default function Game() {
  const [scene, setScene] = useState<Scene>('intro');
  const [isMuted, setIsMuted] = useState(true);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const playSound = useCallback((soundFile: string, volume: number = 0.5) => {
    if (isMuted) return;
    const sound = new Audio(`/${soundFile}`);
    sound.volume = volume;
    sound.play().catch(error => console.error(`Failed to play sound: ${soundFile}`, error));
  }, [isMuted]);


  useEffect(() => {
    // Lazy load audio only on the client
    const bgMusic = new Audio('/aeao.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setAudio(bgMusic);

    return () => {
      bgMusic.pause();
    };
  }, []);

  useEffect(() => {
    if (audio) {
      if (!isMuted && scene !== 'intro') {
        audio.play().catch(error => console.error("Audio play failed:", error));
      } else {
        audio.pause();
      }
    }
  }, [isMuted, scene, audio]);

  const renderScene = () => {
    switch (scene) {
      case 'intro':
        return (
          <Intro onStart={() => {
            playSound('click.mp3');
            setScene('garden');
          }} />
        );
      case 'garden':
        return <GardenScene onComplete={() => setScene('trail')} playSound={playSound} />;
      case 'trail':
        return <TrailScene onComplete={() => setScene('sky')} playSound={playSound} />;
      case 'sky':
        return <SkyScene onComplete={() => setScene('final')} playSound={playSound} />;
      case 'final':
        return <FinalScene onRestart={() => setScene('intro')} />;
      default:
        return <Intro onStart={() => setScene('garden')} />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-100 to-background font-body">
       <button 
        onClick={() => setIsMuted(!isMuted)} 
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/30 backdrop-blur-sm text-primary hover:bg-white/50 transition-colors"
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
     <div className="w-full h-full flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
            <Card className="max-w-lg text-center shadow-2xl bg-white/50 backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-4xl text-primary">For My One and Only Nooni</CardTitle>
                    <CardDescription className="text-foreground/80">I've woven a tiny universe from starlight and inside jokes, just for you. It's a small reflection of the endless color you paint into my world.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-6">This place is built from our shared laughter, whispered secrets, and so, so much love. Ready to step inside?</p>
                    <Button onClick={onStart} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                        Let's Begin
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    </div>
  )
}
