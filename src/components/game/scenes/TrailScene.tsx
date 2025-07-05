
'use client';

import { useState, useEffect } from 'react';
import PlayerCharacter from '../PlayerCharacter';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type TrailSceneProps = {
  onComplete: () => void;
};

const platforms = [
  { id: 1, pos: { x: '50%', y: '90%' }, message: "Remember that time we laughed so hard we cried? That's a sparkle." },
  { id: 2, pos: { x: '25%', y: '70%' }, message: "Your kindness shines brighter than any star." },
  { id: 3, pos: { x: '75%', y: '50%' }, message: "For every silly joke and every shared secret." },
  { id: 4, pos: { x: '40%', y: '30%' }, message: "This one is for all the adventures we've yet to have!" },
  { id: 5, pos: { x: '60%', y: '10%' }, message: "You've reached the top! Your friendship means the world." },
];

export default function TrailScene({ onComplete }: TrailSceneProps) {
  const [currentPlatform, setCurrentPlatform] = useState(0);
  const [dialogContent, setDialogContent] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentPos = platforms[currentPlatform].pos;
  const playerPosition = { 
    x: parseFloat(currentPos.x), 
    y: parseFloat(currentPos.y) 
  };
  
  const handlePlatformClick = (platformId: number) => {
    if (platformId === currentPlatform + 1) {
      setCurrentPlatform(platformId);
      setDialogContent(platforms[platformId].message);
      if (platformId === platforms.length - 1) {
        setTimeout(() => setShowCompletion(true), 1500);
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-purple-100 to-background">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5, duration:1}}>
        <p className="absolute top-10 left-1/2 -translate-x-1/2 text-primary-foreground bg-primary/70 p-2 rounded-md shadow-lg text-lg text-center font-headline">The Trail of Laughs</p>
        <p className="absolute top-20 left-1/2 -translate-x-1/2 text-foreground/80 text-sm">Click the next platform to jump!</p>
      </motion.div>
      
      {isClient && <PlayerCharacter 
        position={{ 
          x: playerPosition.x / 100 * window.innerWidth, 
          y: playerPosition.y / 100 * window.innerHeight 
        }} 
      />}

      {platforms.map((p, index) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ 
            left: p.pos.x, 
            top: p.pos.y,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <button
            onClick={() => handlePlatformClick(p.id - 1)}
            disabled={p.id - 1 !== currentPlatform + 1}
            className="group w-32 h-16 bg-white/50 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:bg-white/80 hover:shadow-xl"
            aria-label={`Jump to platform ${p.id}`}
          >
            {p.id - 1 === currentPlatform + 1 && <ArrowUp className="w-8 h-8 text-primary animate-bounce" />}
            {p.id - 1 <= currentPlatform && <Sparkles className="w-8 h-8 text-yellow-400" />}
          </button>
        </motion.div>
      ))}

      {showCompletion && (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
            <Button onClick={onComplete} size="lg" className="font-bold">
                Reach for the Sky of Wishes
            </Button>
        </motion.div>
      )}
      
      <Dialog open={!!dialogContent} onOpenChange={() => setDialogContent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-primary flex items-center"><Sparkles className="mr-2"/> A Sparkling Thought</DialogTitle>
            <DialogDescription className="text-foreground pt-4 text-base">
              {dialogContent}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
