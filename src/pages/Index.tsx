
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, LucideIcon, Users, Trophy, Target, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PuzzleCard from '@/components/PuzzleCard';
import UserProfile from '@/components/UserProfile';
import { generateSamplePuzzles, sampleUsers } from '@/utils/puzzleGenerator';
import { PuzzleType, DifficultyLevel } from '@/types';
import { cn } from '@/lib/utils';

const featuredPuzzles = generateSamplePuzzles().slice(0, 4);
const topUsers = sampleUsers.slice(0, 5);

type FeatureProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const Feature: React.FC<FeatureProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover-lift">
    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      <Icon size={24} className="text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState<PuzzleType>('arithmetic');
  const [activeDifficulty, setActiveDifficulty] = useState<DifficultyLevel>('easy');
  
  const puzzleTypes: { type: PuzzleType; label: string; icon: LucideIcon }[] = [
    { type: 'arithmetic', label: 'Arithmetic', icon: Zap },
    { type: 'geometry', label: 'Geometry', icon: Target },
    { type: 'logic', label: 'Logic', icon: Brain },
    { type: 'algebra', label: 'Algebra', icon: Users }
  ];
  
  const difficulties: { level: DifficultyLevel; label: string }[] = [
    { level: 'easy', label: 'Easy' },
    { level: 'medium', label: 'Medium' },
    { level: 'hard', label: 'Hard' },
    { level: 'expert', label: 'Expert' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-3">
              <span className="badge-subtle">Collaborative • Educational • Fun</span>
            </div>
            <h1 className="heading-xl mb-6 max-w-4xl mx-auto">
              Solve Math Puzzles <br className="hidden sm:block" />
              <span className="text-primary">Together</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Challenge yourself with intriguing puzzles while collaborating in real-time with friends and the global community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/puzzles"
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center"
              >
                <span>Start Solving</span>
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/community"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
              >
                Join Community
              </Link>
            </div>
          </div>
          
          {/* Featured Puzzles */}
          <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-center mb-10">
              <h2 className="heading-lg mb-4">Featured Puzzles</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover our most popular and challenging mathematical puzzles
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPuzzles.map((puzzle) => (
                <PuzzleCard key={puzzle.id} puzzle={puzzle} />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link
                to="/puzzles"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                <span>View all puzzles</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
          
          {/* Features */}
          <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-center mb-10">
              <h2 className="heading-lg mb-4">Why MathPuzzles?</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our platform offers unique features designed to enhance your problem-solving experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Feature
                icon={Users}
                title="Collaborate in Real-Time"
                description="Work together with friends or other users to solve complex puzzles collaboratively."
              />
              <Feature
                icon={Brain}
                title="Diverse Puzzle Types"
                description="From arithmetic to geometry, logic, and algebra - we have puzzles for every mathematical interest."
              />
              <Feature
                icon={Trophy}
                title="Track Your Progress"
                description="Earn points, climb the leaderboard, and monitor your improvement over time."
              />
            </div>
          </div>
          
          {/* Puzzle Browser */}
          <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center mb-10">
              <h2 className="heading-lg mb-4">Browse by Category</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Explore puzzles by type and difficulty level
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Tabs */}
              <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
                {puzzleTypes.map(({ type, label, icon: Icon }) => (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className={cn(
                      "flex-1 min-w-[120px] py-4 px-4 text-sm font-medium flex items-center justify-center space-x-2 transition-colors",
                      activeTab === type
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    )}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              
              {/* Difficulty selector */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex flex-wrap gap-2">
                  {difficulties.map(({ level, label }) => (
                    <button
                      key={level}
                      onClick={() => setActiveDifficulty(level)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                        activeDifficulty === level
                          ? "bg-primary text-white"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Puzzle content */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuredPuzzles
                    .filter(puzzle => puzzle.type === activeTab && puzzle.difficulty === activeDifficulty)
                    .map(puzzle => (
                      <div key={puzzle.id} className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold mb-2">{puzzle.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{puzzle.description}</p>
                        <Link
                          to={`/puzzle/${puzzle.id}`}
                          className="text-sm text-primary hover:text-primary/80 font-medium flex items-center"
                        >
                          <span>Solve Puzzle</span>
                          <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Top Users */}
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="text-center mb-10">
              <h2 className="heading-lg mb-4">Top Problem Solvers</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Meet our community's most brilliant minds
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {topUsers.map((user, index) => (
                  <div 
                    key={user.id}
                    className={cn(
                      "p-4 rounded-lg flex flex-col items-center text-center",
                      index === 0 
                        ? "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800/30"
                        : "bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    )}
                  >
                    {index === 0 && (
                      <div className="mb-2">
                        <Trophy size={18} className="text-yellow-500" />
                      </div>
                    )}
                    <div className="mb-2">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                      />
                    </div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.score.toLocaleString()} points</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user.solvedPuzzles} puzzles solved</div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link
                  to="/leaderboard"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  <span>View full leaderboard</span>
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white font-bold">
                  MP
                </div>
                <span className="text-lg font-semibold tracking-tight">
                  MathPuzzles
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Collaborative math puzzles for everyone
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                About
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} MathPuzzles. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
