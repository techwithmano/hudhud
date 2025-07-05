'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';

// Import scenes
import GardenScene from '@/components/game/scenes/GardenScene';
import TrailScene from '@/components/game/scenes/TrailScene';
import SkyScene from '@/components/game/scenes/SkyScene';
import FinalScene from '@/components/game/FinalScene';
import ConnectScene from './scenes/ConnectScene';

type Scene = 'intro' | 'garden' | 'trail' | 'connect' | 'sky' | 'final';

export default function Game() {
  const [scene, setScene] = useState<Scene>('intro');
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio on the client
    audioRef.current = new Audio('/aeao.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const audio = audioRef.current;
    const handleError = () => {
      console.error("Failed to load background music. Make sure 'aeao.mp3' is in the 'public' folder.");
    };
    audio.addEventListener('error', handleError);

    return () => {
      audio?.pause();
      audio?.removeEventListener('error', handleError);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(prevMuted => {
      const newMuted = !prevMuted;
      if (audioRef.current) {
        if (newMuted) {
          audioRef.current.pause();
        } else {
           if(scene !== 'intro') {
             audioRef.current.play().catch(e => console.error("Audio play failed:", e));
           }
        }
      }
      return newMuted;
    });
  };

  const handleStart = () => {
    if (audioRef.current) {
        // This is the crucial part for mobile browser autoplay policies
        audioRef.current.play().then(() => {
            setIsMuted(false);
        }).catch(error => {
            console.error("Audio play failed on start:", error);
            // If autoplay fails, we keep it muted. The user can unmute manually.
            setIsMuted(true);
        });
    }
    setScene('garden');
  };

  const renderScene = () => {
    switch (scene) {
      case 'intro':
        return <Intro onStart={handleStart} />;
      case 'garden':
        return <GardenScene onComplete={() => setScene('trail')} />;
      case 'trail':
        return <TrailScene onComplete={() => setScene('connect')} />;
      case 'connect':
        return <ConnectScene onComplete={() => setScene('sky')} />;
      case 'sky':
        return <SkyScene onComplete={() => setScene('final')} />;
      case 'final':
        return <FinalScene onRestart={() => setScene('intro')} />;
      default:
        return <Intro onStart={handleStart} />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-secondary/40 to-background font-body">
       <button 
        onClick={toggleMute} 
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
  const [sparklesData, setSparklesData] = useState<Array<{ id: number; top: string; left: string; size: number }>>([]);

  useEffect(() => {
    // Generate random values only on the client, after the component has mounted.
    const newSparkles = [...Array(7)].map((_, i) => ({
      id: i,
      top: `${10 + Math.random() * 80}%`,
      left: `${10 + Math.random() * 80}%`,
      size: 12 + Math.random() * 20,
    }));
    setSparklesData(newSparkles);
  }, []); // Empty dependency array ensures this runs only once on the client.


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const sparkleVariants = {
    initial: { scale: 0, opacity: 0, y: 0 },
    animate: (i: number) => ({
      scale: [0, 1, 0.5, 1],
      opacity: [0, 1, 1, 0],
      y: [0, -20, 0],
      transition: {
        delay: i * 0.3 + 0.5,
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 2,
      },
    }),
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        className="text-center flex flex-col items-center max-w-2xl relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sparklesData.map((sparkle, i) => (
          <motion.div
            key={sparkle.id}
            custom={i}
            variants={sparkleVariants}
            initial="initial"
            animate="animate"
            style={{
              position: 'absolute',
              top: sparkle.top,
              left: sparkle.left,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Sparkles className="text-primary/60" size={sparkle.size} style={{ filter: 'blur(1px)' }}/>
          </motion.div>
        ))}

        <motion.h1
          variants={itemVariants}
          className="font-headline text-5xl md:text-7xl font-bold text-primary mb-4 drop-shadow-lg"
        >
          For My One and Only Nooni
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-foreground/80 max-w-lg mb-8"
        >
          I made a tiny world for you, filled with our inside jokes. It's just a small way to show you how much color you bring to my life.
        </motion.p>
        
        <motion.p
          variants={itemVariants}
          className="text-md md:text-lg text-foreground/70 mb-10"
        >
          This place is made of our laughs, our secrets, and a whole lot of love. Are you ready?
        </motion.p>

        <motion.div 
          variants={itemVariants} 
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="font-bold text-lg px-10 py-6 shadow-xl shadow-primary/20"
          >
            Let's Start
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
