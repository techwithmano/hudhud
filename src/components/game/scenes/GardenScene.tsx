'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Search } from 'lucide-react';
import Image from 'next/image';

type GardenSceneProps = {
  onComplete: () => void;
  playSound: (soundFile: string, volume?: number) => void;
};

const initialFaces = [
  { id: 'hyun', name: 'Hyun Bin', isTarget: true, image: 'https://placehold.co/128x128.png', dataAiHint: 'Hyun Bin' },
  { id: 'p1', name: 'Person 1', isTarget: false, image: 'https://placehold.co/128x128.png', dataAiHint: 'korean actor' },
  { id: 'p2', name: 'Person 2', isTarget: false, image: 'https://placehold.co/128x128.png', dataAiHint: 'korean actress' },
  { id: 'p3', name: 'Person 3', isTarget: false, image: 'https://placehold.co/128x128.png', dataAiHint: 'korean model' },
  { id: 'p4', name: 'Person 4', isTarget: false, image: 'https://placehold.co/128x128.png', dataAiHint: 'korean actor' },
  { id: 'p5', name: 'Person 5', isTarget: false, image: 'https://placehold.co/128x128.png', dataAiHint: 'korean actress' },
  { id: 'p6', name: 'Person 6', isTarget: false, image: 'https://placehold.co/128x128.png', dataAiHint: 'korean model' },
  { id: 'p7', name: 'Person 7', isTarget: false, image: 'https://placehold.co/128x128.png', dataAiHint: 'korean actor' },
  { id: 'p8', name: 'Person 8', isTarget: false, image: 'https://placehold.co/128x128.png', dataAiHint: 'korean actress' },
  { id: 'p9', name: 'Person 9', isTarget: false, image: 'https://placehold.co/128x128.png', dataAiHint: 'korean actor' },
  { id: 'p10', name: 'Person 10', isTarget: false, image: 'https://placehold.co/128x128.png', dataAiHint: 'korean actress' },
  { id: 'p11', name: 'Person 11', isTarget: false, image: 'https://placehold.co/128x128.png', dataAiHint: 'korean actor' },
];

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


export default function GardenScene({ onComplete, playSound }: GardenSceneProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [shuffledFaces, setShuffledFaces] = useState<typeof initialFaces>([]);
  const [incorrectClickId, setIncorrectClickId] = useState<string | null>(null);

  useEffect(() => {
      setShuffledFaces(shuffleArray(initialFaces));
  }, []);

  const handleFaceClick = (face: typeof initialFaces[0]) => {
    if (isFound) return;

    if (face.isTarget) {
      setIsFound(true);
      setDialogOpen(true);
      playSound('collect.mp3');
    } else {
      playSound('click.mp3');
      setIncorrectClickId(face.id);
      setTimeout(() => setIncorrectClickId(null), 300);
    }
  };

  const handleNext = () => {
    onComplete();
  };
  
  const incorrectAnimation = {
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 to-lime-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10"
      >
        <p className="text-primary-foreground bg-primary/70 p-2 rounded-md shadow-lg text-lg font-headline flex items-center gap-2">
          <Search /> A Special Mission: Find Hyun!
        </p>
        <p className="mt-2 text-foreground/80 text-sm">
          {isFound ? "You found him! Your tracking skills are unmatched." : 'Among the stars of the screen, find the one that shines brightest for you.'}
        </p>
      </motion.div>

      <div className="w-full max-w-3xl p-4">
        <div className="flex flex-wrap justify-center items-center gap-4">
            {shuffledFaces.map((face, index) => {
              return (
                <motion.div
                  key={face.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, ...((incorrectClickId === face.id) && incorrectAnimation.shake) }}
                  transition={{ delay: 0.5 + index * 0.05, type: 'spring' }}
                  whileHover={{ scale: isFound ? 1 : 1.1, zIndex: 2 }}
                  className="cursor-pointer"
                  onClick={() => handleFaceClick(face)}
                >
                  <Image
                    src={face.image}
                    alt={face.name}
                    width={100}
                    height={100}
                    data-ai-hint={face.dataAiHint}
                    className={`rounded-full border-4 transition-all duration-300 ${
                      isFound && face.isTarget ? 'border-green-400 shadow-2xl scale-110' : 'border-white/50'
                    } ${
                      isFound && !face.isTarget ? 'opacity-30' : 'opacity-100'
                    }`}
                  />
                </motion.div>
              );
            })}
        </div>
      </div>
      

      {isFound && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <Button onClick={handleNext} size="lg" className="font-bold">
            Follow the Unforgettable Path <Sparkles className="ml-2" />
          </Button>
        </motion.div>
      )}

      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <DialogContent className="font-body">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-primary">You Found Him!</DialogTitle>
            <DialogDescription className="text-foreground pt-4 text-base">
              Of course, you found him! Your eyes are always drawn to the things that shine. It reminds me of how I feel so lucky to have found a friend as bright and wonderful as you.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
