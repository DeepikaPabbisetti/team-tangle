
// User Types
export interface User {
  id: string;
  name: string;
  avatar: string;
  score: number;
  solvedPuzzles: number;
}

// Puzzle Types
export type PuzzleType = 'arithmetic' | 'geometry' | 'logic' | 'algebra';
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface Puzzle {
  id: string;
  title: string;
  type: PuzzleType;
  difficulty: DifficultyLevel;
  description: string;
  problemStatement: string;
  imageUrl?: string;
  hintCount: number;
}

export interface ArithmeticPuzzle extends Puzzle {
  type: 'arithmetic';
  equation: string;
  solution: number;
}

export interface GeometryPuzzle extends Puzzle {
  type: 'geometry';
  shapes: string[];
  solution: number;
}

export interface LogicPuzzle extends Puzzle {
  type: 'logic';
  statements: string[];
  solution: string;
}

export interface AlgebraPuzzle extends Puzzle {
  type: 'algebra';
  equations: string[];
  solution: string;
}

// Puzzle Attempt
export interface PuzzleAttempt {
  puzzleId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  solution?: string | number;
  isCorrect?: boolean;
  hintsUsed: number;
}

// Leaderboard
export interface LeaderboardEntry {
  user: User;
  rank: number;
  score: number;
  puzzlesSolved: number;
  averageTime: number;
}
