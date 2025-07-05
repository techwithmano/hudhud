'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type SkySceneProps = {
  onComplete: () => void;
  playSound: (soundFile: string, volume?: number) => void;
};

const TOTAL_STARS = 10;

interface FallingStar {
  id: number;
  x: number;
  duration: number;
  delay: number;
}

export default function SkyScene({ onComplete, playSound }: SkySceneProps) {
  const [collectedStars, setCollectedStars] = useState(0);
  const [stars, setStars] = useState<FallingStar[]>([]);

  useEffect(() => {
    if (collectedStars < TOTAL_STARS) {
      const interval = setInterval(() => {
        setStars(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            duration: Math.random() * 3 + 4,
            delay: Math.random() * 2,
          },
        ]);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [collectedStars]);

  const handleStarClick = (id: number) => {
    if (collectedStars < TOTAL_STARS) {
      playSound('collect.mp3', 0.4);
      setCollectedStars(c => c + 1);
      setStars(s => s.filter(star => star.id !== id));
    }
  };
  
  const isComplete = collectedStars >= TOTAL_STARS;

  const handleNext = () => {
    playSound('click.mp3');
    onComplete();
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 text-center text-white">
        <h2 className="font-headline text-3xl">The Constellation of Our Dreams</h2>
        <p>Catch the falling wishes and weave them into a constellation of hope.</p>
        <Progress value={(collectedStars / TOTAL_STARS) * 100} className="w-64 mt-4 bg-white/20" />
        <p className="mt-2 text-lg">{collectedStars} / {TOTAL_STARS} Stars</p>
      </div>

      <AnimatePresence>
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute cursor-pointer"
            initial={{ top: '-10%', left: `${star.x}%` }}
            animate={{ top: '110%' }}
            exit={{ opacity: 0, scale: 1.5, transition: { duration: 0.3, ease: 'easeOut' } }}
            transition={{ duration: star.duration, delay: star.delay, ease: 'linear' }}
            onClick={() => handleStarClick(star.id)}
            style={{ zIndex: 5 }}
          >
            <Star className="w-10 h-10 text-yellow-300 fill-yellow-300" style={{ filter: 'drop-shadow(0 0 8px #fff)'}} />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {isComplete && (
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        >
            <p className="text-white text-2xl font-headline">The stars have heard you. The sky is full of our wishes.</p>
            <Button onClick={handleNext} size="lg" className="font-bold bg-yellow-400 hover:bg-yellow-500 text-blue-900">
                Read Your Star-Written Note
            </Button>
        </motion.div>
      )}
    </div>
  );
}
