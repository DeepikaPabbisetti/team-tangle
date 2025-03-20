
import React from 'react';
import { User } from '../types';
import { cn } from '@/lib/utils';
import { Trophy, PenTool } from 'lucide-react';

interface UserProfileProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showStats?: boolean;
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  size = 'md',
  showStats = true,
  className
}) => {
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
          src={user.avatar} 
          alt={user.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="ml-3">
        <div className={cn(
          textSizes[size],
          "font-medium text-gray-900 dark:text-gray-100"
        )}>
          {user.name}
        </div>
        
        {showStats && (
          <div className="flex items-center mt-0.5 space-x-3">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Trophy size={12} className="mr-1 text-yellow-500" />
              <span>{user.score.toLocaleString()} pts</span>
            </div>
            
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <PenTool size={12} className="mr-1 text-blue-500" />
              <span>{user.solvedPuzzles} solved</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
