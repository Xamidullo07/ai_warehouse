import { motion } from 'framer-motion';
import type { Element } from '../types/chemistry';

interface AtomProps {
  element: Element;
  x: number;
  y: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const AtomComponent = ({ element, x, y, isSelected, onClick }: AtomProps) => {
  return (
    <motion.div
      className={`absolute cursor-pointer flex items-center justify-center font-bold text-sm select-none shadow-lg border-2 ${
        isSelected ? 'border-yellow-400 z-20' : 'border-gray-300'
      }`}
      style={{
        width: element.radius * 2,
        height: element.radius * 2,
        backgroundColor: element.color,
        color: element.id === 'H' ? '#333' : '#fff',
        borderRadius: '50%',
        left: x,
        top: y,
        boxShadow: `inset -5px -5px 10px rgba(0,0,0,0.2), 0 4px 6px rgba(0,0,0,0.1)`
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      layout
    >
      {element.symbol}
    </motion.div>
  );
};