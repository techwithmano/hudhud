'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Lock, Unlock, Sparkles } from 'lucide-react';

type TrailSceneProps = {
  onComplete: () => void;
  playSound: (soundFile: string, volume?: number) => void;
};

const memories = [
  { id: 1, title: "A Foundation of Laughter", content: "For every time we've laughed so hard we couldn't breathe. This journey is built on the pure, unfiltered joy you bring into my life." },
  { id: 2, title: "A Shelter of Kindness", content: "For every moment your kindness was a safe harbor. You make the world a gentler place just by being in it." },
  { id: 3, title: "A Universe of Secrets", content: "For all our inside jokes and every shared look that says more than words ever could. Our little world is my favorite place to be." },
  { id: 4, title: "A Sky of Promises", content: "For all the adventures that still await us. This isn't the end of the path, just the beginning of our next beautiful chapter." },
];

export default function TrailScene({ onComplete, playSound }: TrailSceneProps) {
  const [unlockedCount, setUnlockedCount] = useState(1);
  const memoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  const unlockMemory = (id: number) => {
    // Can only unlock the next sequential memory
    if (id !== unlockedCount) return;
    
    setUnlockedCount(id + 1);
    
    const targetRef = memoryRefs.current[id];
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const allUnlocked = unlockedCount > memories.length;

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-purple-100 to-background overflow-y-auto">
      <div className="sticky top-0 z-10 bg-gradient-to-b from-purple-100 via-purple-100/80 to-transparent pt-8 pb-4 text-center backdrop-blur-sm">
        <p className="text-primary-foreground bg-primary/70 p-2 rounded-md shadow-lg text-lg font-headline inline-block">The Path of Unforgettable Steps</p>
        <p className="mt-2 text-foreground/80 text-sm">Tap each step of our journey to unlock the memory within.</p>
      </div>

      <div className="flex flex-col items-center gap-24 py-16 px-4 min-h-full">
        {memories.map((memory, index) => {
          const isUnlocked = index < unlockedCount;
          const isNext = index === unlockedCount - 1;

          return (
            <motion.div
              ref={el => (memoryRefs.current[index] = el)}
              key={memory.id}
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => unlockMemory(index + 1)}
            >
              <Card className={`transition-all duration-500 shadow-lg  ${isNext ? 'cursor-pointer border-primary ring-2 ring-primary shadow-primary/30 shadow-2xl' : ''} ${isUnlocked ? 'border-primary/50' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <Heart className={`transition-all duration-500 ${isUnlocked ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                      {memory.title}
                    </span>
                    {isUnlocked ? <Unlock className="text-green-500" /> : <Lock className="text-muted-foreground" />}
                  </CardTitle>
                </CardHeader>
                <AnimatePresence>
                  {isUnlocked && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <CardContent>
                        <p>{memory.content}</p>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {allUnlocked && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="sticky bottom-0 flex justify-center py-8 bg-gradient-to-t from-background to-transparent"
        >
          <Button onClick={() => { onComplete(); }} size="lg" className="font-bold">
            Let's Connect Our Story <Sparkles className="ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
