
import React from 'react';
import { cn } from '@/lib/utils';
import { Trophy, PenTool } from 'lucide-react';
import { User } from '@/types';

interface UserProfileProps {
  name?: string;
  avatar?: string;
  score?: number;
  solvedPuzzles?: number;
  size?: 'sm' | 'md' | 'lg';
  showStats?: boolean;
  className?: string;
  user?: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  name,
  avatar,
  score = 0,
  solvedPuzzles = 0,
  size = 'md',
  showStats = true,
  className,
  user
}) => {
  // If user prop is provided, use its properties
  const displayName = user ? user.name : name;
  const displayAvatar = user ? user.avatar : avatar;
  const displayScore = user ? user.score : score;
  const displaySolvedPuzzles = user ? user.solvedPuzzles : solvedPuzzles;
  
  const avatarSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  
  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn(
        avatarSizes[size],
        "rounded-full overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800"
      )}>
        <img 
          src={displayAvatar} 
          alt={displayName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="ml-3">
        <div className={cn(
          textSizes[size],
          "font-medium text-gray-900 dark:text-gray-100"
        )}>
          {displayName}
        </div>
        
        {showStats && (
          <div className="flex items-center mt-0.5 space-x-3">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Trophy size={12} className="mr-1 text-yellow-500" />
              <span>{displayScore.toLocaleString()} pts</span>
            </div>
            
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <PenTool size={12} className="mr-1 text-blue-500" />
              <span>{displaySolvedPuzzles} solved</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
