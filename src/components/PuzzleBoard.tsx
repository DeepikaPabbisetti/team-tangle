
import React, { useState, useEffect } from 'react';
import { Puzzle, User } from '../types';
import { cn } from '@/lib/utils';
import { Lightbulb, Clock, CheckCircle, XCircle, Send, RefreshCw, Eye } from 'lucide-react';
import UserProfile from './UserProfile';

interface PuzzleBoardProps {
  puzzle: Puzzle;
  currentUser: User;
  collaborators?: User[];
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ 
  puzzle, 
  currentUser, 
  collaborators = [] 
}) => {
  const [answer, setAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  
  // Timer for tracking puzzle attempt time
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle submitting an answer
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple comparison - in a real app would need more sophisticated checking
    const correctAnswer = 'solution' in puzzle ? String(puzzle.solution) : '';
    const isAnswerCorrect = answer.trim().toLowerCase() === correctAnswer.toLowerCase();
    
    setIsCorrect(isAnswerCorrect);
  };
  
  // Get a hint (would be more sophisticated in a real app)
  const getHint = () => {
    if (hintsUsed < puzzle.hintCount) {
      setHintsUsed(prev => prev + 1);
      setShowHint(true);
    }
  };
  
  // Reset the puzzle attempt
  const resetPuzzle = () => {
    setAnswer('');
    setIsCorrect(null);
    setHintsUsed(0);
    setElapsedTime(0);
    setShowHint(false);
  };
  
  // Generate a simple hint based on puzzle type
  const generateHint = (): string => {
    if ('equation' in puzzle) {
      return "Try to isolate the variable and solve step by step.";
    } else if ('shapes' in puzzle) {
      return "Remember the formulas for calculating areas of geometric shapes.";
    } else if ('statements' in puzzle) {
      return "Analyze each statement carefully and consider how they relate to each other.";
    } else if ('equations' in puzzle) {
      return "Try substitution or elimination methods to solve the system.";
    }
    return "Break down the problem into smaller parts.";
  };
  
  return (
    <div className="puzzle-board animate-scale-in">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <h2 className="heading-md">{puzzle.title}</h2>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              <Clock size={14} className="mr-1.5 text-gray-500" />
              <span>{formatTime(elapsedTime)}</span>
            </div>
            <button 
              onClick={resetPuzzle}
              className="flex items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-2 py-1 rounded-full transition-colors"
            >
              <RefreshCw size={14} className="text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-gray-700 dark:text-gray-300">{puzzle.description}</p>
        </div>
      </div>
      
      <div className="p-6">
        {/* Problem statement */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Problem</h3>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-gray-800 dark:text-gray-200">{puzzle.problemStatement}</p>
            
            {/* Display puzzle specific content based on type */}
            {'equation' in puzzle && (
              <div className="mt-4 text-center text-xl font-medium text-primary py-2">
                {puzzle.equation}
              </div>
            )}
            
            {'shapes' in puzzle && (
              <div className="mt-4 text-center">
                <div className="inline-block bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  {puzzle.shapes.map((shape, index) => (
                    <span key={index} className="text-2xl mr-2">{shape === 'rectangle' ? '□' : shape === 'circle' ? '○' : shape === 'triangle' ? '△' : '⬡'}</span>
                  ))}
                </div>
              </div>
            )}
            
            {'statements' in puzzle && (
              <ul className="mt-4 space-y-2 list-disc list-inside">
                {puzzle.statements.map((statement, index) => (
                  <li key={index} className="text-gray-800 dark:text-gray-200">{statement}</li>
                ))}
              </ul>
            )}
            
            {'equations' in puzzle && (
              <div className="mt-4 text-center space-y-2">
                {puzzle.equations.map((equation, index) => (
                  <div key={index} className="text-xl font-medium text-primary py-1">{equation}</div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Hints section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Hints</h3>
            <div className="text-sm text-gray-500">
              {hintsUsed} / {puzzle.hintCount} used
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {Array.from({ length: puzzle.hintCount }).map((_, index) => (
              <button
                key={index}
                onClick={getHint}
                disabled={index >= puzzle.hintCount || hintsUsed > index}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-all",
                  hintsUsed > index
                    ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed"
                    : "bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50"
                )}
              >
                <Lightbulb size={14} className="mr-1.5" />
                <span>Hint {index + 1}</span>
              </button>
            ))}
          </div>
          
          {showHint && (
            <div className="mt-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-lg p-3 text-amber-800 dark:text-amber-300 text-sm">
              <div className="flex items-start">
                <Lightbulb size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <p>{generateHint()}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Answer submission */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Your Answer</h3>
          
          {isCorrect === null ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                <Send size={16} className="mr-1.5" />
                Submit Answer
              </button>
            </form>
          ) : (
            <div className={cn(
              "p-4 rounded-lg flex items-start",
              isCorrect 
                ? "bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30" 
                : "bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30"
            )}>
              {isCorrect ? (
                <>
                  <CheckCircle size={20} className="text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">Correct!</p>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                      Great job solving this puzzle! Ready for another challenge?
                    </p>
                    <div className="mt-3 flex space-x-3">
                      <button className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 px-3 py-1 rounded-md transition-colors">
                        Next Puzzle
                      </button>
                      <button onClick={resetPuzzle} className="text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 dark:text-green-300 dark:bg-green-900/40 dark:hover:bg-green-900/60 px-3 py-1 rounded-md transition-colors">
                        Try Again
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <XCircle size={20} className="text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-300">Incorrect</p>
                    <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                      That's not quite right. Would you like to try again or see the correct answer?
                    </p>
                    <div className="mt-3 flex space-x-3">
                      <button onClick={resetPuzzle} className="text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 px-3 py-1 rounded-md transition-colors">
                        Try Again
                      </button>
                      <button className="text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 dark:text-red-300 dark:bg-red-900/40 dark:hover:bg-red-900/60 px-3 py-1 rounded-md transition-colors flex items-center">
                        <Eye size={14} className="mr-1" />
                        View Solution
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Collaborators */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Collaborators</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
            <div className="flex flex-wrap gap-4">
              <UserProfile user={currentUser} size="sm" showStats={false} className="bg-primary/10 rounded-lg p-2" />
              
              {collaborators.map(user => (
                <UserProfile key={user.id} user={user} size="sm" showStats={false} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2" />
              ))}
              
              <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg p-2 flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors">
                <span>Invite</span>
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <Users size={14} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleBoard;
