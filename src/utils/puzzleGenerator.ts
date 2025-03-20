
import { ArithmeticPuzzle, GeometryPuzzle, LogicPuzzle, AlgebraPuzzle, DifficultyLevel, PuzzleType } from '../types';

// Helper for generating unique IDs
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

// Generate arithmetic puzzles
export const generateArithmeticPuzzle = (difficulty: DifficultyLevel): ArithmeticPuzzle => {
  let equation = '';
  let solution = 0;
  let title = '';
  let problemStatement = '';
  let hintCount = 0;

  switch (difficulty) {
    case 'easy':
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const operations = ['+', '-', '×', '÷'];
      const operation = operations[Math.floor(Math.random() * 2)]; // Limited to + and -
      
      if (operation === '+') {
        equation = `${a} + ${b} = ?`;
        solution = a + b;
      } else if (operation === '-') {
        // Ensure no negative results for easy puzzles
        const max = Math.max(a, b);
        const min = Math.min(a, b);
        equation = `${max} - ${min} = ?`;
        solution = max - min;
      }
      
      title = 'Simple Arithmetic';
      problemStatement = `Find the missing value: ${equation}`;
      hintCount = 1;
      break;
      
    case 'medium':
      const c = Math.floor(Math.random() * 15) + 5;
      const d = Math.floor(Math.random() * 15) + 5;
      const e = Math.floor(Math.random() * 10) + 1;
      
      // Create a slightly more complex expression
      equation = `${c} + ${d} × ${e} = ?`;
      solution = c + (d * e);
      
      title = 'Order of Operations';
      problemStatement = `Find the value of the expression: ${equation}`;
      hintCount = 2;
      break;
      
    case 'hard':
      const f = Math.floor(Math.random() * 20) + 10;
      const g = Math.floor(Math.random() * 20) + 10;
      const h = Math.floor(Math.random() * 10) + 1;
      const j = Math.floor(Math.random() * 10) + 1;
      
      equation = `(${f} + ${g}) ÷ (${h} × ${j}) = ?`;
      solution = (f + g) / (h * j);
      
      title = 'Complex Arithmetic';
      problemStatement = `Calculate the result: ${equation}`;
      hintCount = 3;
      break;
      
    case 'expert':
      const k = Math.floor(Math.random() * 30) + 20;
      const l = Math.floor(Math.random() * 30) + 20;
      const m = Math.floor(Math.random() * 15) + 5;
      const n = Math.floor(Math.random() * 5) + 2;
      
      equation = `(${k} × ${l} - ${m}) ÷ ${n}² = ?`;
      solution = (k * l - m) / (n * n);
      
      title = 'Advanced Arithmetic';
      problemStatement = `Solve the complex expression: ${equation}`;
      hintCount = 4;
      break;
  }

  return {
    id: generateId(),
    title,
    type: 'arithmetic',
    difficulty,
    description: `A ${difficulty} arithmetic puzzle that tests your calculation skills.`,
    problemStatement,
    equation,
    solution,
    hintCount,
  };
};

// Generate geometry puzzles
export const generateGeometryPuzzle = (difficulty: DifficultyLevel): GeometryPuzzle => {
  let shapes: string[] = [];
  let solution = 0;
  let title = '';
  let problemStatement = '';
  let description = '';
  
  switch (difficulty) {
    case 'easy':
      const length = Math.floor(Math.random() * 10) + 5;
      const width = Math.floor(Math.random() * 10) + 5;
      
      shapes = ['rectangle'];
      solution = length * width;
      
      title = 'Rectangle Area';
      problemStatement = `Find the area of a rectangle with length ${length} units and width ${width} units.`;
      description = 'Calculate the area of a simple geometric shape.';
      break;
      
    case 'medium':
      const radius = Math.floor(Math.random() * 10) + 5;
      
      shapes = ['circle'];
      solution = Math.PI * radius * radius;
      
      title = 'Circle Area';
      problemStatement = `Find the area of a circle with radius ${radius} units. Use π = 3.14159.`;
      description = 'Apply formulas to find the area of a circle.';
      break;
      
    case 'hard':
      const side1 = Math.floor(Math.random() * 10) + 5;
      const side2 = Math.floor(Math.random() * 10) + 5;
      const side3 = side1 + side2 - 1; // Ensures a valid triangle
      
      shapes = ['triangle'];
      const s = (side1 + side2 + side3) / 2;
      solution = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
      
      title = 'Triangle Area';
      problemStatement = `Find the area of a triangle with sides ${side1}, ${side2}, and ${side3} units using Heron's formula.`;
      description = 'Apply Heron\'s formula to calculate the area of a triangle.';
      break;
      
    case 'expert':
      const side = Math.floor(Math.random() * 10) + 5;
      
      shapes = ['hexagon'];
      solution = (3 * Math.sqrt(3) / 2) * side * side;
      
      title = 'Regular Hexagon Area';
      problemStatement = `Find the area of a regular hexagon with side length ${side} units.`;
      description = 'Calculate the area of a complex geometric shape using advanced formulas.';
      break;
  }
  
  return {
    id: generateId(),
    title,
    type: 'geometry',
    difficulty,
    description,
    problemStatement,
    shapes,
    solution,
    hintCount: difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : difficulty === 'hard' ? 3 : 4,
  };
};

// Generate logic puzzles
export const generateLogicPuzzle = (difficulty: DifficultyLevel): LogicPuzzle => {
  let statements: string[] = [];
  let solution = '';
  let title = '';
  let problemStatement = '';
  
  switch (difficulty) {
    case 'easy':
      statements = [
        'All cats have four legs.',
        'Fluffy is a cat.'
      ];
      solution = 'Fluffy has four legs.';
      
      title = 'Simple Deduction';
      problemStatement = 'What conclusion can you draw from these statements?';
      break;
      
    case 'medium':
      statements = [
        'If it is raining, then the ground is wet.',
        'The ground is wet.'
      ];
      solution = 'It might be raining, but we cannot say for certain.';
      
      title = 'Logical Fallacy';
      problemStatement = 'What can you deduce from these statements?';
      break;
      
    case 'hard':
      statements = [
        'Either the butler or the gardener committed the crime.',
        'If the butler committed the crime, then he used a knife.',
        'The gardener never uses knives.',
        'The crime was committed with a knife.'
      ];
      solution = 'The butler committed the crime.';
      
      title = 'Crime Deduction';
      problemStatement = 'Who committed the crime?';
      break;
      
    case 'expert':
      statements = [
        'All mathematicians are logical.',
        'Some logical people enjoy puzzles.',
        'No one who enjoys puzzles can resist a challenge.',
        'Some mathematicians are resistible.'
      ];
      solution = 'The statements are inconsistent and lead to a contradiction.';
      
      title = 'Complex Logical Reasoning';
      problemStatement = 'Analyze these statements. Are they consistent?';
      break;
  }
  
  return {
    id: generateId(),
    title,
    type: 'logic',
    difficulty,
    description: `A ${difficulty} logical reasoning puzzle that challenges your deduction skills.`,
    problemStatement,
    statements,
    solution,
    hintCount: difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : difficulty === 'hard' ? 3 : 4,
  };
};

// Generate algebra puzzles
export const generateAlgebraPuzzle = (difficulty: DifficultyLevel): AlgebraPuzzle => {
  let equations: string[] = [];
  let solution = '';
  let title = '';
  let problemStatement = '';
  
  switch (difficulty) {
    case 'easy':
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 20) + 10;
      
      equations = [`${a}x = ${b}`];
      solution = `x = ${b/a}`;
      
      title = 'Simple Equation';
      problemStatement = 'Solve for x: ' + equations[0];
      break;
      
    case 'medium':
      const c = Math.floor(Math.random() * 5) + 1;
      const d = Math.floor(Math.random() * 10) + 5;
      const e = Math.floor(Math.random() * 20) + 10;
      
      equations = [`${c}x + ${d} = ${e}`];
      solution = `x = ${(e-d)/c}`;
      
      title = 'Linear Equation';
      problemStatement = 'Solve for x: ' + equations[0];
      break;
      
    case 'hard':
      const f = Math.floor(Math.random() * 5) + 1;
      const g = Math.floor(Math.random() * 10) + 5;
      const h = Math.floor(Math.random() * 5) + 1;
      const j = Math.floor(Math.random() * 10) + 20;
      
      equations = [`${f}x + ${g} = ${h}x + ${j}`];
      const solX = (j-g)/(f-h);
      solution = `x = ${solX}`;
      
      title = 'Complex Equation';
      problemStatement = 'Solve for x: ' + equations[0];
      break;
      
    case 'expert':
      const k = Math.floor(Math.random() * 5) + 1;
      const l = Math.floor(Math.random() * 10) + 5;
      const m = Math.floor(Math.random() * 5) + 1;
      const n = Math.floor(Math.random() * 10) + 5;
      const p = Math.floor(Math.random() * 20) + 10;
      const q = Math.floor(Math.random() * 20) + 10;
      
      equations = [
        `${k}x + ${l}y = ${p}`,
        `${m}x + ${n}y = ${q}`
      ];
      
      // Calculate solution using Cramer's rule
      const det = k * n - m * l;
      const x = (n * p - l * q) / det;
      const y = (k * q - m * p) / det;
      
      solution = `x = ${x}, y = ${y}`;
      
      title = 'System of Equations';
      problemStatement = 'Solve the system of equations: ' + equations.join(', ');
      break;
  }
  
  return {
    id: generateId(),
    title,
    type: 'algebra',
    difficulty,
    description: `An ${difficulty} algebraic puzzle that tests your equation-solving skills.`,
    problemStatement,
    equations,
    solution,
    hintCount: difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : difficulty === 'hard' ? 3 : 4,
  };
};

// Function to generate a random puzzle
export const generateRandomPuzzle = (type: PuzzleType, difficulty: DifficultyLevel) => {
  switch (type) {
    case 'arithmetic':
      return generateArithmeticPuzzle(difficulty);
    case 'geometry':
      return generateGeometryPuzzle(difficulty);
    case 'logic':
      return generateLogicPuzzle(difficulty);
    case 'algebra':
      return generateAlgebraPuzzle(difficulty);
    default:
      return generateArithmeticPuzzle(difficulty);
  }
};

// Generate a set of sample puzzles for initial display
export const generateSamplePuzzles = () => {
  const puzzleTypes: PuzzleType[] = ['arithmetic', 'geometry', 'logic', 'algebra'];
  const difficulties: DifficultyLevel[] = ['easy', 'medium', 'hard', 'expert'];
  
  const samplePuzzles = [];
  
  // Generate one puzzle for each combination of type and difficulty
  for (const type of puzzleTypes) {
    for (const difficulty of difficulties) {
      samplePuzzles.push(generateRandomPuzzle(type, difficulty));
    }
  }
  
  return samplePuzzles;
};

// Sample user data
export const sampleUsers = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    score: 2500,
    solvedPuzzles: 47
  },
  {
    id: '2',
    name: 'Jamie Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    score: 2250,
    solvedPuzzles: 42
  },
  {
    id: '3',
    name: 'Casey Williams',
    avatar: 'https://i.pravatar.cc/150?img=3',
    score: 2100,
    solvedPuzzles: 38
  },
  {
    id: '4',
    name: 'Taylor Brown',
    avatar: 'https://i.pravatar.cc/150?img=4',
    score: 1980,
    solvedPuzzles: 35
  },
  {
    id: '5',
    name: 'Jordan Davis',
    avatar: 'https://i.pravatar.cc/150?img=5',
    score: 1850,
    solvedPuzzles: 33
  },
  {
    id: '6',
    name: 'Morgan Miller',
    avatar: 'https://i.pravatar.cc/150?img=6',
    score: 1720,
    solvedPuzzles: 30
  },
  {
    id: '7',
    name: 'Riley Wilson',
    avatar: 'https://i.pravatar.cc/150?img=7',
    score: 1650,
    solvedPuzzles: 28
  },
  {
    id: '8',
    name: 'Avery Thompson',
    avatar: 'https://i.pravatar.cc/150?img=8',
    score: 1520,
    solvedPuzzles: 25
  },
  {
    id: '9',
    name: 'Quinn Thomas',
    avatar: 'https://i.pravatar.cc/150?img=9',
    score: 1450,
    solvedPuzzles: 23
  },
  {
    id: '10',
    name: 'Parker White',
    avatar: 'https://i.pravatar.cc/150?img=10',
    score: 1350,
    solvedPuzzles: 20
  },
];

// Generate leaderboard data
export const generateLeaderboardData = () => {
  return sampleUsers.map((user, index) => ({
    user,
    rank: index + 1,
    score: user.score,
    puzzlesSolved: user.solvedPuzzles,
    averageTime: Math.floor(Math.random() * 120) + 30, // Random time between 30-150 seconds
  }));
};
