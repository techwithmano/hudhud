
'use client';
import { useState, useEffect } from 'react';
import PlayerCharacter from '../PlayerCharacter';
import WhimsicalCat from '../WhimsicalCat';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Flower, Sparkles } from 'lucide-react';

type GardenSceneProps = {
  onComplete: () => void;
};

const interactiveObjects = [
  { id: 'cat1', pos: { x: '20%', y: '85%' }, message: { title: "A Cuddly Friend", content: "This friendly cat whispers a secret: 'The world is a much brighter and happier place with you in it, Nooni.'" } },
  { id: 'flower1', pos: { x: '75%', y: '80%' }, message: { title: "A Shimmering Memory", content: "This flower glows with a special light, holding a memory of a time we laughed until our stomachs hurt. Remember?" } },
];

export default function GardenScene({ onComplete }: GardenSceneProps) {
  const [playerPos, setPlayerPos] = useState<{x: number, y: number} | null>(null);
  const [dialogContent, setDialogContent] = useState<{ title: string; content: string } | null>(null);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    setPlayerPos({ x: 50, y: window.innerHeight * 0.9 });
  }, []);

  const handleInteraction = (message: { title: string; content: string }) => {
    setDialogContent(message);
    if(clicks + 1 >= interactiveObjects.length) {
       // After interacting with all objects, show the button to proceed
    }
    setClicks(c => c + 1);
  };
  
  return (
    <div className="relative w-full h-full">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5, duration:1}} className="absolute inset-0">
        <p className="absolute top-10 left-1/2 -translate-x-1/2 text-primary-foreground bg-primary/70 p-2 rounded-md shadow-lg text-lg text-center font-headline">The Garden of Calm</p>
        <p className="absolute top-20 left-1/2 -translate-x-1/2 text-foreground/80 text-sm">Click on the objects to see what they have to say.</p>
      </motion.div>

      {playerPos && <PlayerCharacter position={playerPos} />}

      {interactiveObjects.map(obj => (
        <motion.div
          key={obj.id}
          className="absolute cursor-pointer"
          style={{ left: obj.pos.x, top: obj.pos.y, transform: 'translate(-50%, -50%)' }}
          whileHover={{ scale: 1.2 }}
          onClick={() => handleInteraction(obj.message)}
        >
          {obj.id.includes('cat') ? (
            <WhimsicalCat className="w-24 h-24" />
          ) : (
            <Flower className="w-16 h-16 text-accent-foreground animate-pulse" />
          )}
        </motion.div>
      ))}

      {clicks >= interactiveObjects.length && (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
            <Button onClick={onComplete} size="lg" className="font-bold">
                Follow the Trail of Laughs <Sparkles className="ml-2" />
            </Button>
        </motion.div>
      )}

      <Dialog open={!!dialogContent} onOpenChange={() => setDialogContent(null)}>
        <DialogContent className="font-body">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-primary">{dialogContent?.title}</DialogTitle>
            <DialogDescription className="text-foreground pt-4 text-base">
              {dialogContent?.content}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
