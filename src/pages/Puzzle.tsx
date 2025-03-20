
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArithmeticPuzzle, GeometryPuzzle, LogicPuzzle, AlgebraPuzzle, User } from '../types';
import { generateRandomPuzzle, generateSamplePuzzles, sampleUsers } from '../utils/puzzleGenerator';
import Navbar from '@/components/Navbar';
import PuzzleBoard from '@/components/PuzzleBoard';
import { ArrowLeft, ChevronRight } from 'lucide-react';

const Puzzle = () => {
  const { puzzleId } = useParams<{ puzzleId: string }>();
  const [puzzle, setPuzzle] = useState<ArithmeticPuzzle | GeometryPuzzle | LogicPuzzle | AlgebraPuzzle | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulating fetch of puzzle data
    setTimeout(() => {
      const allPuzzles = generateSamplePuzzles();
      const foundPuzzle = allPuzzles.find(p => p.id === puzzleId);
      
      if (foundPuzzle) {
        setPuzzle(foundPuzzle);
      } else {
        // If puzzle not found, generate a random one (for demo)
        const randomPuzzle = generateRandomPuzzle('arithmetic', 'medium');
        setPuzzle(randomPuzzle);
      }
      
      // Set current user (first user for demo)
      setCurrentUser(sampleUsers[0]);
      
      // Set random collaborators (2-3 users for demo)
      const numCollaborators = Math.floor(Math.random() * 2) + 2;
      setCollaborators(sampleUsers.slice(1, numCollaborators + 1));
      
      setLoading(false);
    }, 1000);
  }, [puzzleId]);
  
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
  
  if (!puzzle || !currentUser) {
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
              <Link
                to="/puzzles"
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all inline-flex items-center"
              >
                <ArrowLeft size={18} className="mr-2" />
                <span>Back to Puzzles</span>
              </Link>
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
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
              <ChevronRight size={16} className="mx-2" />
              <Link to="/puzzles" className="hover:text-gray-700 dark:hover:text-gray-300">Puzzles</Link>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-gray-900 dark:text-white font-medium">{puzzle.title}</span>
            </div>
          </div>
          
          {/* Puzzle Board */}
          <PuzzleBoard 
            puzzle={puzzle} 
            currentUser={currentUser} 
            collaborators={collaborators} 
          />
          
          {/* Related Puzzles */}
          <div className="mt-12">
            <h2 className="heading-md mb-6">More Puzzles Like This</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {generateSamplePuzzles()
                .filter(p => p.type === puzzle.type && p.id !== puzzle.id)
                .slice(0, 3)
                .map((relatedPuzzle) => (
                  <Link
                    key={relatedPuzzle.id}
                    to={`/puzzle/${relatedPuzzle.id}`}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover-lift"
                  >
                    <h3 className="font-semibold mb-2">{relatedPuzzle.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {relatedPuzzle.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-primary">Solve now</span>
                      <ChevronRight size={16} className="text-primary" />
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Puzzle;
