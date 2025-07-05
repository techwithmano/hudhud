'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquareHeart } from 'lucide-react';
import WhimsicalCat from '../WhimsicalCat';
import Image from 'next/image';

const hints = [
  "Psst... I have a secret message for Nooni.",
  "It's about someone she adores...",
  "He's a star... a very handsome one!",
  "They say he's one of Korea's finest.",
  "His name sounds like... 'Hyun'?",
  "Okay, okay! You found him!"
];

type GardenSceneProps = {
  onComplete: () => void;
};

export default function GardenScene({ onComplete }: GardenSceneProps) {
  const [clickCount, setClickCount] = useState(0);
  const isComplete = clickCount >= hints.length - 1;

  const handleCatClick = () => {
    if (!isComplete) {
      const newClickCount = clickCount + 1;
      setClickCount(newClickCount);
    }
  };

  const handleNext = () => {
    onComplete();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-10 text-center z-10"
      >
        <p className="text-primary-foreground bg-primary/70 p-2 rounded-md shadow-lg text-lg font-headline">
          A Whimsical Messenger Appears
        </p>
        <p className="mt-2 text-foreground/80 text-sm">
          This little friend has a secret to share. Click on them!
        </p>
      </motion.div>

      <div className="flex-grow flex flex-col items-center justify-center gap-4">
        <motion.div
          className="relative cursor-pointer"
          onClick={handleCatClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <AnimatePresence>
            {!isComplete && (
              <motion.div
                key={clickCount}
                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute -top-20 right-[-10rem] bg-white p-3 rounded-lg shadow-lg w-48 text-center"
              >
                <MessageSquareHeart className="inline-block w-5 h-5 text-secondary mb-1" />
                <p className="text-foreground text-sm">
                  {hints[clickCount]}
                </p>
                 <div className="absolute left-4 -bottom-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
              </motion.div>
            )}
          </AnimatePresence>
          <WhimsicalCat className="w-48 h-48" />
        </motion.div>
        
        <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, type: 'spring' } }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <p className="text-2xl font-headline text-primary">It's Hyun!</p>
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-primary">
               <Image
                src="https://placehold.co/200x200.png"
                width={200}
                height={200}
                alt="A picture of Choi Seung-hyun smirking and winking"
                data-ai-hint="man winking"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-foreground/80 max-w-sm">You found the hidden treasure—a little reminder of one of your favorite things!</p>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          >
            <Button onClick={handleNext} size="lg" className="font-bold">
              Follow the Unforgettable Path <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
