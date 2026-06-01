import { motion } from 'framer-motion';
import { AlertOctagon, TrendingUp, Zap, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import type { AIInsight } from '../types/warehouse';

const iconMap = {
  critical: AlertOctagon,
  warning: AlertTriangle,
  opportunity: TrendingUp,
  efficiency: Zap
};

const colorMap = {
  critical: 'bg-red-900/30 border-red-500/50 text-red-200',
  warning: 'bg-amber-900/30 border-amber-500/50 text-amber-200',
  opportunity: 'bg-blue-900/30 border-blue-500/50 text-blue-200',
  efficiency: 'bg-purple-900/30 border-purple-500/50 text-purple-200'
};

const iconColorMap = {
  critical: 'text-red-400',
  warning: 'text-amber-400',
  opportunity: 'text-blue-400',
  efficiency: 'text-purple-400'
};

const btnColorMap = {
  critical: 'bg-red-600 hover:bg-red-700 shadow-red-600/30',
  warning: 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30',
  opportunity: 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30',
  efficiency: 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/30'
};

export const AIInsightCard = ({ insight, onAction }: { insight: AIInsight; onAction: (i: AIInsight) => void }) => {
  const Icon = iconMap[insight.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 rounded-xl border backdrop-blur-sm ${colorMap[insight.type]} transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 p-1.5 rounded-lg bg-black/20`}>
          <Icon className={`h-4 w-4 ${iconColorMap[insight.type]}`} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{insight.title}</h4>
          <p className="text-xs mt-1.5 opacity-80 leading-relaxed">{insight.description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs font-bold bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
              {insight.impact}
            </span>
            <Button 
              size="sm" 
              className={`text-xs h-8 shadow-lg ${btnColorMap[insight.type]}`}
              onClick={() => onAction(insight)}
            >
              {insight.actionLabel}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};