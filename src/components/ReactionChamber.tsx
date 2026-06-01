import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Atom } from '../types/chemistry';
import { AtomComponent } from './Atom';
import { MoleculeComponent } from './Molecule';
import { Sparkles } from 'lucide-react';

interface ReactionChamberProps {
  atoms: Atom[];
  products: string[];
  isReacting: boolean;
  onAtomClick: (id: string) => void;
  chamberColor?: string;
}

export const ReactionChamber = ({ atoms, products, isReacting, onAtomClick, chamberColor }: ReactionChamberProps) => {
  const chamberRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);

  // Generate bubbles during reaction
  useEffect(() => {
    if (isReacting) {
      const interval = setInterval(() => {
        setBubbles(prev => [
          ...prev.slice(-10), // Keep max 10 bubbles
          {
            id: Date.now(),
            x: Math.random() * 300 + 20,
            y: 300 + Math.random() * 20,
            size: Math.random() * 10 + 5
          }
        ]);
      }, 100);

      return () => clearInterval(interval);
    } else {
      setBubbles([]);
    }
  }, [isReacting]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Flask Neck */}
      <div className="w-24 h-32 bg-linear-to-b from-gray-100 to-gray-200 border-2 border-gray-300 rounded-t-lg relative z-10">
        <div className="absolute inset-x-0 top-0 h-4 bg-gray-300 rounded-t-lg" />
      </div>

      {/* Flask Body */}
      <motion.div
        ref={chamberRef}
        className={`relative w-80 h-80 rounded-b-full border-4 border-gray-300 overflow-hidden shadow-2xl transition-colors duration-1000 ${
          chamberColor ? 'bg-opacity-80' : 'bg-gray-50'
        }`}
        style={{ backgroundColor: chamberColor || '#f9fafb' }}
        animate={isReacting ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 0.5, repeat: isReacting ? Infinity : 0 }}
      >
        {/* Liquid Level */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-blue-100/30 rounded-b-full"
          initial={{ height: '0%' }}
          animate={{ height: '60%' }}
          transition={{ duration: 1 }}
        />

        {/* Bubbles Animation */}
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              className="absolute bg-white/50 rounded-full"
              style={{
                width: bubble.size,
                height: bubble.size,
                left: bubble.x,
                top: bubble.y
              }}
              initial={{ y: 300, opacity: 0.8 }}
              animate={{ y: -50, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 + Math.random() }}
            />
          ))}
        </AnimatePresence>

        {/* Atoms */}
        <AnimatePresence>
          {!isReacting && atoms.map((atom) => (
            <AtomComponent
              key={atom.id}
              element={atom.element}
              x={atom.x}
              y={atom.y}
              onClick={() => onAtomClick(atom.id)}
            />
          ))}
        </AnimatePresence>

        {/* Products (Molecules) */}
        <AnimatePresence>
          {isReacting && products.map((formula, index) => (
            <MoleculeComponent
              key={formula + index}
              formula={formula}
              x={100 + (index % 3) * 80}
              y={100 + Math.floor(index / 3) * 80}
            />
          ))}
        </AnimatePresence>

        {/* Reaction Sparkle Effect */}
        {isReacting && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1 }}
          >
            <Sparkles className="w-24 h-24 text-yellow-400 drop-shadow-lg" />
          </motion.div>
        )}
      </motion.div>

      {/* Base */}
      <div className="w-96 h-4 bg-gray-300 rounded-lg -mt-1 shadow-md" />
    </div>
  );
};