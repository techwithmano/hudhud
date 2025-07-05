'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Search } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { generateCharacterImage } from '@/ai/flows/generate-character-image';

type GardenSceneProps = {
  onComplete: () => void;
  playSound: (soundFile: string, volume?: number) => void;
};

const characterDescriptions = [
  { id: 'hyun', name: 'The One', isTarget: true, description: "A handsome Korean man with a gentle smile and dark hair, glowing softly with a magical golden aura, in a whimsical anime portrait style." },
  { id: 'p1', name: 'Person 1', isTarget: false, description: "A cheerful woman with long, flowing blonde hair and blue eyes, in a whimsical anime portrait style." },
  { id: 'p2', name: 'Person 2', isTarget: false, description: "A man with glasses and short brown hair, in a whimsical anime portrait style." },
  { id: 'p3', name: 'Person 3', isTarget: false, description: "A woman with vibrant red curly hair and freckles, in a whimsical anime portrait style." },
  { id: 'p4', name: 'Person 4', isTarget: false, description: "A non-binary person with short purple hair and a friendly smirk, in a whimsical anime portrait style." },
  { id: 'p5', name: 'Person 5', isTarget: false, description: "An elderly woman with a kind, wrinkled face, in a whimsical anime portrait style." },
  { id: 'p6', name: 'Person 6', isTarget: false, description: "A woman with a dark skin tone and beautiful braided hair, in a whimsical anime portrait style." },
  { id: 'p7', name: 'Person 7', isTarget: false, description: "A man with a stylish haircut and a confident pose, in a whimsical anime portrait style." },
  { id: 'p8', name: 'Person 8', isTarget: false, description: "A young person with androgynous features and silver hair, in a whimsical anime portrait style." },
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
  const [faces, setFaces] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [incorrectClickId, setIncorrectClickId] = useState<string | null>(null);

  useEffect(() => {
    const generateAndSetFaces = async () => {
        setIsLoading(true);
        try {
            const generatedImages = [];
            for (const char of characterDescriptions) {
                const imageResult = await generateCharacterImage({ description: char.description });
                generatedImages.push(imageResult);
            }
            
            const populatedFaces = characterDescriptions.map((char, index) => ({
                ...char,
                image: generatedImages[index].imageDataUri
            }));
            
            setFaces(shuffleArray(populatedFaces));
        } catch (error) {
            console.error("Failed to generate character images:", error);
            // In case of an error, we could show a message, but for now we'll just not show any images
            // to avoid breaking the app.
        } finally {
            setIsLoading(false);
        }
    };

    generateAndSetFaces();
  }, []);

  const handleFaceClick = (face: any) => {
    if (isFound || isLoading) return;

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

  if (isLoading) {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 to-lime-100 p-4">
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10"
            >
                <p className="text-primary-foreground bg-primary/70 p-2 rounded-md shadow-lg text-lg font-headline flex items-center gap-2">
                    <Sparkles /> Creating a world for you...
                </p>
                <p className="mt-2 text-foreground/80 text-sm">
                    Please wait, this magic takes a moment!
                </p>
             </motion.div>
            <div className="w-full max-w-3xl p-4 mt-16">
                <div className="flex flex-wrap justify-center items-center gap-4">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.05, type: 'spring' }}
                        >
                            <Skeleton className="w-[100px] h-[100px] rounded-full" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 to-lime-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10"
      >
        <p className="text-primary-foreground bg-primary/70 p-2 rounded-md shadow-lg text-lg font-headline flex items-center gap-2">
          <Search /> A Special Mission: Find The One!
        </p>
        <p className="mt-2 text-foreground/80 text-sm">
          {isFound ? "You found them! Your heart knew exactly where to look." : 'Among these faces, find the one that shines brightest for you.'}
        </p>
      </motion.div>

      <div className="w-full max-w-3xl p-4">
        <div className="flex flex-wrap justify-center items-center gap-4">
            {faces.map((face, index) => {
              return (
                <motion.div
                  key={face.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, ...((incorrectClickId === face.id) && incorrectAnimation.shake) }}
                  transition={{ delay: index * 0.05, type: 'spring' }}
                  whileHover={{ scale: isFound ? 1 : 1.1, zIndex: 2 }}
                  className="cursor-pointer"
                  onClick={() => handleFaceClick(face)}
                >
                  <Image
                    src={face.image}
                    alt={face.name}
                    width={100}
                    height={100}
                    className={`rounded-full border-4 transition-all duration-300 ${
                      isFound && face.isTarget ? 'border-green-400 shadow-2xl scale-110 ring-4 ring-yellow-300' : 'border-white/50'
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
            <DialogTitle className="font-headline text-2xl text-primary">You Found The One!</DialogTitle>
            <DialogDescription className="text-foreground pt-4 text-base">
              Of course, you found them! Your eyes are always drawn to the things that shine. It reminds me of how I feel so lucky to have found a friend as bright and wonderful as you.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
