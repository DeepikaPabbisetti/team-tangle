
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PuzzleType, DifficultyLevel } from '../types';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import { ChevronRight, Calculator, Ruler, Brain, FunctionSquare } from 'lucide-react';

const Index = () => {
  const puzzleTypes: { type: PuzzleType; title: string; description: string; icon: React.ReactNode; color: string }[] = [
    {
      type: 'arithmetic',
      title: 'Arithmetic Puzzles',
      description: 'Test your skills with addition, subtraction, multiplication, and division puzzles.',
      icon: <Calculator className="h-8 w-8" />,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    },
    {
      type: 'geometry',
      title: 'Geometry Puzzles',
      description: 'Explore shapes, areas, angles, and spatial relationships in these geometric challenges.',
      icon: <Ruler className="h-8 w-8" />,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
    },
    {
      type: 'logic',
      title: 'Logic Puzzles',
      description: 'Sharpen your mind with puzzles that test your deductive reasoning and logical thinking.',
      icon: <Brain className="h-8 w-8" />,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
    },
    {
      type: 'algebra',
      title: 'Algebra Puzzles',
      description: 'Solve for unknown variables in these challenging algebraic equations and systems.',
      icon: <FunctionSquare className="h-8 w-8" />,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Math Puzzles</span>
              <span className="block text-primary">Challenge Your Mind</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Solve puzzles ranging from simple arithmetic to complex algebraic equations, with progressively challenging levels.
            </p>
          </div>
          
          {/* Featured Puzzle Categories */}
          <div className="mb-12">
            <h2 className="heading-lg mb-6">Puzzle Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {puzzleTypes.map((puzzleType) => (
                <div 
                  key={puzzleType.type}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow border border-gray-200 dark:border-gray-700 hover-lift"
                >
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className={cn("p-3 rounded-lg mr-4", puzzleType.color)}>
                        {puzzleType.icon}
                      </div>
                      <div>
                        <h3 className="heading-sm mb-2">{puzzleType.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {puzzleType.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="text-sm font-medium mb-2">Difficulty Levels:</div>
                      <div className="grid grid-cols-4 gap-2">
                        {['easy', 'medium', 'hard', 'expert'].map((difficulty, i) => (
                          <Link
                            key={difficulty}
                            to={`/puzzle/${puzzleType.type}`}
                            className={cn(
                              "px-3 py-2 text-xs font-medium rounded-md text-center transition-colors",
                              difficulty === 'easy' ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50' : 
                              difficulty === 'medium' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50' : 
                              difficulty === 'hard' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50' : 
                              'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50'
                            )}
                          >
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
                    <Link
                      to={`/puzzle/${puzzleType.type}`}
                      className="text-primary hover:text-primary-600 text-sm font-medium flex items-center justify-between"
                    >
                      <span>Start with level 1</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* How to Play */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
            <h2 className="heading-md mb-4">How to Play</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">1</div>
                <div>
                  <h3 className="font-medium">Choose a puzzle category</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Select from arithmetic, geometry, logic, or algebra puzzles.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">2</div>
                <div>
                  <h3 className="font-medium">Start with Level 1</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Each puzzle type has 10 increasingly difficult levels.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">3</div>
                <div>
                  <h3 className="font-medium">Solve and progress</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Solve each puzzle to unlock the next level.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">4</div>
                <div>
                  <h3 className="font-medium">Use hints if needed</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Each puzzle offers hints if you get stuck.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
