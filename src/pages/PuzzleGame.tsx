
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PuzzleBoard from '@/components/PuzzleBoard';
import { ArrowLeft } from 'lucide-react';
import { ArithmeticPuzzle, GeometryPuzzle, LogicPuzzle, AlgebraPuzzle, PuzzleType, DifficultyLevel } from '../types';
import { generateRandomPuzzle } from '../utils/puzzleGenerator';
import { Progress } from '@/components/ui/progress';
import { toast } from "sonner";

const PuzzleGame = () => {
  const { type = 'arithmetic' } = useParams<{ type: PuzzleType }>();
  const navigate = useNavigate();
  
  const [currentPuzzle, setCurrentPuzzle] = useState<ArithmeticPuzzle | GeometryPuzzle | LogicPuzzle | AlgebraPuzzle | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [maxLevel, setMaxLevel] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  
  const generatePuzzleForLevel = (level: number, puzzleType: PuzzleType = 'arithmetic') => {
    let difficulty: DifficultyLevel = 'easy';
    
    // Determine difficulty based on level
    if (level <= 3) {
      difficulty = 'easy';
    } else if (level <= 6) {
      difficulty = 'medium';
    } else if (level <= 9) {
      difficulty = 'hard';
    } else {
      difficulty = 'expert';
    }
    
    // Generate a new puzzle
    const puzzle = generateRandomPuzzle(puzzleType as PuzzleType, difficulty);
    
    // Custom title to indicate level
    puzzle.title = `${puzzle.title} - Level ${level}`;
    
    return puzzle;
  };
  
  // Initialize or update the puzzle when level or type changes
  useEffect(() => {
    setLoading(true);
    const newPuzzle = generatePuzzleForLevel(currentLevel, type as PuzzleType);
    setCurrentPuzzle(newPuzzle);
    setLoading(false);
  }, [currentLevel, type]);
  
  const handlePuzzleComplete = (nextLevel: number) => {
    if (nextLevel > maxLevel) {
      toast.success("Congratulations! You've completed all levels!");
      // Navigate to a completion screen or reset
      navigate('/puzzles');
      return;
    }
    
    setCurrentLevel(nextLevel);
    toast.success(`Moving to Level ${nextLevel}`);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse-subtle">
                <div className="h-12 w-12 border-4 border-t-primary border-r-primary/30 border-b-primary/30 border-l-primary/30 rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!currentPuzzle) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="heading-lg mb-4">Puzzle Not Found</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Sorry, we couldn't find the puzzle you're looking for.
              </p>
              <button
                onClick={() => navigate('/puzzles')}
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all inline-flex items-center"
              >
                <ArrowLeft size={18} className="mr-2" />
                <span>Back to Puzzles</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="heading-lg">{type.charAt(0).toUpperCase() + type.slice(1)} Puzzles</h1>
              <button
                onClick={() => navigate('/puzzles')}
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back to All Puzzles
              </button>
            </div>
            
            {/* Level progress */}
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Level Progress</div>
                <div className="text-sm text-gray-500">{currentLevel} of {maxLevel}</div>
              </div>
              <Progress value={(currentLevel / maxLevel) * 100} className="h-2" />
            </div>
          </div>
          
          {/* Puzzle Board */}
          <PuzzleBoard 
            puzzle={currentPuzzle} 
            level={currentLevel}
            onComplete={handlePuzzleComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default PuzzleGame;
