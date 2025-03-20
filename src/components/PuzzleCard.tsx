
import React from 'react';
import { Link } from 'react-router-dom';
import { ArithmeticPuzzle, GeometryPuzzle, LogicPuzzle, AlgebraPuzzle } from '../types';
import { cn } from '@/lib/utils';
import { Clock, BarChart3, Users, ChevronRight } from 'lucide-react';

type PuzzleCardProps = {
  puzzle: ArithmeticPuzzle | GeometryPuzzle | LogicPuzzle | AlgebraPuzzle;
};

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  hard: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  expert: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
};

const typeIcons = {
  arithmetic: '➗',
  geometry: '📐',
  logic: '🧩',
  algebra: '⚖️'
};

const PuzzleCard: React.FC<PuzzleCardProps> = ({ puzzle }) => {
  const { id, title, type, difficulty, description } = puzzle;
  
  return (
    <Link to={`/puzzle/${id}`} className="puzzle-card block animate-fade-in">
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <span className="text-2xl">{typeIcons[type]}</span>
          <span className={cn(
            'text-xs font-medium px-2.5 py-0.5 rounded-full',
            difficultyColors[difficulty]
          )}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
        
        <h3 className="heading-sm mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
          {description}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>~5 min</span>
            </div>
            <div className="flex items-center space-x-1">
              <BarChart3 size={14} />
              <span>{puzzle.hintCount} hints</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={14} />
              <span>{Math.floor(Math.random() * 100) + 50}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary">Solve now</span>
            <ChevronRight size={16} className="text-primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PuzzleCard;
