
'use client';

import { useState, useEffect } from 'react';
import PlayerCharacter from '../PlayerCharacter';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type TrailSceneProps = {
  onComplete: () => void;
  playSound: (soundFile: string, volume?: number) => void;
};

const platforms = [
  { id: 1, pos: { x: '50%', y: '90%' }, message: "This first leap is for every laugh that's ever made our stomachs hurt and our eyes water. You have a PhD in making me smile." },
  { id: 2, pos: { x: '25%', y: '70%' }, message: "This platform glows with the warmth of your heart. Your kindness is a constant, gentle light that makes the world a softer, better place for everyone lucky enough to know you." },
  { id: 3, pos: { x: '75%', y: '50%' }, message: "This step is our secret hideout, built from whispered conversations and jokes no one else would get. It's a universe just for us, and it's my favorite place to be." },
  { id: 4, pos: { x: '40%', y: '30%' }, message: "And this one? It's a promise. A promise of a million more adventures, big and small, waiting just for us. I can't wait for our next chapter." },
  { id: 5, pos: { x: '60%', y: '10%' }, message: "You reached the top! Just like you always reach the deepest parts of my heart. This journey with you is the greatest adventure, and I'm so grateful for every single step." },
];

export default function TrailScene({ onComplete, playSound }: TrailSceneProps) {
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
      playSound('click.mp3');
      setCurrentPlatform(platformId);
      setDialogContent(platforms[platformId].message);
      if (platformId === platforms.length - 1) {
        setTimeout(() => setShowCompletion(true), 1500);
      }
    }
  };

  const handleNext = () => {
    playSound('click.mp3');
    onComplete();
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-purple-100 to-background">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5, duration:1}}>
        <p className="absolute top-10 left-1/2 -translate-x-1/2 text-primary-foreground bg-primary/70 p-2 rounded-md shadow-lg text-lg text-center font-headline">The Path of Unforgettable Steps</p>
        <p className="absolute top-20 left-1/2 -translate-x-1/2 text-foreground/80 text-sm">Leap from one cherished moment to the next!</p>
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
            <Button onClick={handleNext} size="lg" className="font-bold">
                Let's Paint the Sky with Wishes
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
