import { motion } from 'framer-motion';
import { ELEMENTS, MOLECULES } from '../data/elements';

interface MoleculeProps {
  formula: string;
  x: number;
  y: number;
}

export const MoleculeComponent = ({ formula, x, y }: MoleculeProps) => {
  const moleculeData = MOLECULES[formula];
  if (!moleculeData) return null;

  return (
    <motion.div
      className="absolute flex items-center justify-center"
      style={{
        left: x,
        top: y,
        width: 80,
        height: 80
      }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <div className="relative w-full h-full">
        {moleculeData.structure.map((atomId, index) => {
          const element = ELEMENTS[atomId];
          // Simple positioning logic for demo purposes
          const positions = [
            { top: 10, left: 30 }, // Top
            { top: 35, left: 10 }, // Left
            { top: 35, left: 50 }  // Right
          ];
          const pos = positions[index] || { top: 20, left: 20 };

          return (
            <motion.div
              key={index}
              className="absolute flex items-center justify-center font-bold text-xs border-2 border-gray-300"
              style={{
                width: element.radius * 1.5,
                height: element.radius * 1.5,
                backgroundColor: element.color,
                color: element.id === 'H' ? '#333' : '#fff',
                borderRadius: '50%',
                top: pos.top,
                left: pos.left,
                boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.2)'
              }}
            >
              {element.symbol}
            </motion.div>
          );
        })}
        <div className="absolute bottom-0 w-full text-center text-xs font-bold text-gray-600 bg-white/50 rounded">
          {formula}
        </div>
      </div>
    </motion.div>
  );
};