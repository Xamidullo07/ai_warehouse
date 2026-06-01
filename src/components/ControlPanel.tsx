import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ELEMENTS } from '../data/elements';
import type { Element as ElementType } from '../types/chemistry';
import { FlaskConical, RotateCcw, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ControlPanelProps {
  onAddAtom: (element: ElementType) => void;
  onReact: () => void;
  onReset: () => void;
  canReact: boolean;
  isReacting: boolean;
  selectedReaction: string | null;
}

export const ControlPanel = ({ onAddAtom, onReact, onReset, canReact, isReacting, selectedReaction }: ControlPanelProps) => {
  return (
    <div className="space-y-6">
      {/* Elements Shelf */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FlaskConical className="text-blue-500" />
            Elementlar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {Object.values(ELEMENTS).map((element) => (
              <motion.button
                key={element.id}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => !isReacting && onAddAtom(element)}
                disabled={isReacting}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                  isReacting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
                }`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-md border-2 border-white"
                  style={{
                    backgroundColor: element.color,
                    color: element.id === 'H' ? '#333' : '#fff',
                    boxShadow: `0 4px 10px ${element.color}66`
                  }}
                >
                  {element.symbol}
                </div>
                <span className="text-xs font-medium text-gray-600">{element.nameUz}</span>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onReact}
            disabled={!canReact || isReacting}
            className="w-full h-14 text-lg bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
          >
            <Zap className="mr-2 h-5 w-5" />
            Reaksiya
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onReset}
            disabled={isReacting}
            variant="outline"
            className="w-full h-14 text-lg border-2 border-gray-300 hover:bg-gray-50"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Tozalash
          </Button>
        </motion.div>
      </div>

      {/* Possible Reactions Hint */}
      {selectedReaction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <p className="text-sm font-semibold text-blue-800 mb-1">Mumkin bo'lgan reaksiya:</p>
          <p className="text-sm text-blue-600">{selectedReaction}</p>
        </motion.div>
      )}
    </div>
  );
};