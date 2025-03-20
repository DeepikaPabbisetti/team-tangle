import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import UserProfile from '@/components/UserProfile';
import { generateLeaderboardData } from '@/utils/puzzleGenerator';
import { LeaderboardEntry } from '@/types';
import { Trophy, Clock, BookOpen, Search, UserPlus, ArrowDown, ArrowUp, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'score' | 'puzzlesSolved' | 'averageTime'>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  useEffect(() => {
    setTimeout(() => {
      const data = generateLeaderboardData();
      setLeaderboardData(data);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleSort = (field: 'rank' | 'score' | 'puzzlesSolved' | 'averageTime') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  const filteredData = leaderboardData
    .filter(entry => 
      entry.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });
    
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="heading-lg mb-4">Leaderboard</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See how you stack up against the top problem solvers in our community
            </p>
          </div>
          
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handleSort('rank')}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md border transition-colors",
                  sortBy === 'rank'
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                <Trophy size={14} className="mr-1" />
                <span>Rank</span>
                {sortBy === 'rank' && (
                  sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                )}
              </button>
              
              <button
                onClick={() => handleSort('score')}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md border transition-colors",
                  sortBy === 'score'
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                <Trophy size={14} className="mr-1" />
                <span>Score</span>
                {sortBy === 'score' && (
                  sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                )}
              </button>
              
              <button
                onClick={() => handleSort('puzzlesSolved')}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md border transition-colors",
                  sortBy === 'puzzlesSolved'
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                <BookOpen size={14} className="mr-1" />
                <span>Solved</span>
                {sortBy === 'puzzlesSolved' && (
                  sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                )}
              </button>
              
              <button
                onClick={() => handleSort('averageTime')}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md border transition-colors",
                  sortBy === 'averageTime'
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                <Clock size={14} className="mr-1" />
                <span>Time</span>
                {sortBy === 'averageTime' && (
                  sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                )}
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-pulse-subtle">
                  <div className="h-12 w-12 border-4 border-t-primary border-r-primary/30 border-b-primary/30 border-l-primary/30 rounded-full animate-spin"></div>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Rank
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Puzzles Solved
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Average Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredData.map((entry, index) => (
                      <tr 
                        key={entry.user.id}
                        className={cn(
                          "transition-colors hover:bg-gray-50 dark:hover:bg-gray-750 animate-fade-in",
                          entry.rank <= 3 ? "bg-yellow-50/50 dark:bg-yellow-900/10" : ""
                        )}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                            entry.rank === 1 
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" 
                              : entry.rank === 2
                                ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                : entry.rank === 3
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                  : "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          )}>
                            {entry.rank}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <UserProfile user={entry.user} size="sm" showStats={false} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end">
                            <Trophy size={14} className="text-yellow-500 mr-1.5" />
                            <span>{entry.score.toLocaleString()} pts</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end">
                            <BookOpen size={14} className="text-blue-500 mr-1.5" />
                            <span>{entry.puzzlesSolved}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end">
                            <Clock size={14} className="text-green-500 mr-1.5" />
                            <span>{formatTime(entry.averageTime)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="mt-10 text-center animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="heading-md mb-3">Join Our Community</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
                Want to see your name on the leaderboard? Sign up today and start solving puzzles!
              </p>
              <button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center mx-auto">
                <UserPlus size={18} className="mr-2" />
                <span>Create Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
