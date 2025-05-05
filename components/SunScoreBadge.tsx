import React from 'react';
import { Sun } from 'lucide-react';

interface SunScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const SunScoreBadge: React.FC<SunScoreBadgeProps> = ({ score, size = 'md' }) => {
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'bg-amber-500';
    if (score >= 7) return 'bg-amber-400';
    if (score >= 5) return 'bg-amber-300';
    return 'bg-amber-200';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <div className={`${getScoreColor(score)} text-white rounded-full flex items-center ${sizeClasses[size]}`}>
      <Sun size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} className="mr-1" />
      <span className="font-medium">{score.toFixed(1)}</span>
    </div>
  );
};

export default SunScoreBadge; 