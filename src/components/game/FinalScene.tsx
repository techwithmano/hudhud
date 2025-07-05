'use client';

import { motion } from 'framer-motion';

type FinalSceneProps = {
  onRestart: () => void;
};

export default function FinalScene({ onRestart }: FinalSceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="max-w-2xl w-full bg-card/80 backdrop-blur-sm p-8 rounded-xl shadow-lg"
      >
        <div className="max-h-[80vh] overflow-y-auto text-left text-foreground font-body">
            <h2 className="text-3xl font-bold mb-4 text-primary text-center">To My Nooni 🌷</h2>
            <p className="text-lg leading-relaxed">
                You just walked through a little world I made just for you. 
                Everything you saw, every star you collected, was to remind you of one simple thing:
                <strong> You are so, so loved.</strong>
            </p>
            <p className="mt-4 text-lg leading-relaxed">
                You're more than my best friend. You're the person who makes me feel calm, who I can be silly with, and who always makes me laugh.
                I made this little game because just saying how much you mean to me isn't enough. I wanted to show you.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
                I made this place feel soft and kind, just like you make the real world feel to me. 
                I don’t know how you do it, but when you're around, even the bad days feel better.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
                You’ve been there for me when I didn’t even ask. You’ve made me feel seen. You’ve made me feel safe.
                And honestly, Nooni, if I could build you a thousand little worlds like this, I would. Just to see you smile.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
                So when this little game is over, please remember:
                <strong> You are wonderful. You are a bright light. You are my forever friend.</strong>
            </p>
            <p className="mt-6 text-right text-lg">— From me, always 💙</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
