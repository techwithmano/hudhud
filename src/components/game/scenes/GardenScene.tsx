'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Flower, Heart, Sparkles } from 'lucide-react';

type GardenSceneProps = {
  onComplete: () => void;
  playSound: (soundFile: string, volume?: number) => void;
};

const choices = [
  { id: 'calm', icon: Flower, pos: { x: '25%', y: '50%' }, color: 'text-primary', message: { title: "A Flower of Serenity", content: "This flower represents the beautiful calm and peace I feel whenever I'm with you. You're my safe harbor in any storm." } },
  { id: 'joy', icon: Sparkles, pos: { x: '50%', y: '50%' }, color: 'text-yellow-400', message: { title: "A Sparkle of Joy", content: "This little sparkle is for the endless joy and laughter you bring into my life. The world is simply brighter and funnier with you in it." } },
  { id: 'love', icon: Heart, pos: { x: '75%', y: '50%' }, color: 'text-red-400', message: { title: "A Heart of Affection", content: "This heart holds all the love and admiration I have for you. Thank you for being the most incredible, kind, and wonderful person I know." } },
];

export default function GardenScene({ onComplete, playSound }: GardenSceneProps) {
  const [dialogContent, setDialogContent] = useState<{ title: string; content: string } | null>(null);
  const [choiceMade, setChoiceMade] = useState(false);

  const handleInteraction = (message: { title: string; content: string }) => {
    playSound('collect.mp3');
    setDialogContent(message);
    setChoiceMade(true);
  };

  const handleNext = () => {
    playSound('click.mp3');
    onComplete();
  }
  
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5, duration:1}} className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10">
        <p className="text-primary-foreground bg-primary/70 p-2 rounded-md shadow-lg text-lg font-headline">The Garden of Feelings</p>
        <p className="mt-2 text-foreground/80 text-sm">Pick an object that speaks to you.</p>
      </motion.div>

      <div className="w-full h-full relative">
        {choices.map((choice, index) => {
          const Icon = choice.icon;
          return (
            <motion.div
              key={choice.id}
              className="absolute cursor-pointer"
              style={{ left: choice.pos.x, top: choice.pos.y, transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.2, type: 'spring' }}
              whileHover={{ scale: 1.2, rotate: choiceMade ? 0 : (index % 2 === 0 ? -5 : 5) }}
              onClick={() => !choiceMade && handleInteraction(choice.message)}
            >
              <Icon className={`w-20 h-20 md:w-24 md:h-24 ${choice.color} drop-shadow-lg`} style={{ filter: 'drop-shadow(0 0 10px currentColor)'}}/>
            </motion.div>
          )
        })}
      </div>


      {choiceMade && (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
            <Button onClick={handleNext} size="lg" className="font-bold">
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
