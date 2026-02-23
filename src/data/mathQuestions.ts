export interface NumberPuzzle {
    id: number;
    totalQuestions: number;
    numbers: number[];
    target: number;
    usedNumbers: boolean[];
}

// Sabit matematik soruları - "Bir Kelime Bir İşlem"
const FIXED_PUZZLES = [
    { numbers: [1, 3, 5, 7, 8, 12], target: 567 },
    { numbers: [1, 4, 5, 7, 9, 20], target: 783 },
    { numbers: [3, 4, 5, 7, 9, 16], target: 719 },
    { numbers: [3, 3, 7, 8, 10, 100], target: 547 },
    { numbers: [2, 3, 4, 7, 9, 19], target: 423 },
    { numbers: [2, 2, 5, 7, 9, 25], target: 608 },
    { numbers: [7, 9, 1, 4, 5, 75], target: 646 },
    { numbers: [3, 4, 7, 8, 9, 100], target: 632 },
    { numbers: [2, 3, 5, 8, 9, 50], target: 346 },
    { numbers: [3, 4, 4, 7, 8, 25], target: 745 }
];

let currentPuzzleIndex = 0;

/**
 * Get the current Bir İşlem puzzle
 */
export function getCurrentNumberPuzzle(): NumberPuzzle {
    const puzzle = FIXED_PUZZLES[currentPuzzleIndex];
    return {
        id: currentPuzzleIndex + 1,
        totalQuestions: FIXED_PUZZLES.length,
        numbers: [...puzzle.numbers],
        target: puzzle.target,
        usedNumbers: new Array(6).fill(false)
    };
}

/**
 * Move to next puzzle
 */
export function nextNumberPuzzle(): NumberPuzzle {
    currentPuzzleIndex = (currentPuzzleIndex + 1) % FIXED_PUZZLES.length;
    return getCurrentNumberPuzzle();
}

/**
 * Safely evaluate a mathematical expression
 */
export function evaluateExpression(expression: string): number | null {
    if (!expression) return null;
    try {
        // Split expression into tokens (numbers and operators)
        const tokens = expression.trim().split(/\s+/);
        if (tokens.length === 0) return null;

        // Initialize result with the first number
        let result = parseFloat(tokens[0]);
        if (isNaN(result)) return null;

        // Process tokens sequentially from left to right
        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const nextValue = parseFloat(tokens[i + 1]);

            if (isNaN(nextValue)) break; // Stop if the next value isn't ready

            if (operator === '+') result += nextValue;
            else if (operator === '-') result -= nextValue;
            else if (operator === '×' || operator === '*') result *= nextValue;
            else if (operator === '÷' || operator === '/') {
                if (nextValue === 0) return null;
                result /= nextValue;
            }
        }

        return Math.round(result);
    } catch {
        return null;
    }
}

/**
 * Validate if expression uses only available numbers (each at most once)
 */
export function validateNumberUsage(expression: string, availableNumbers: number[]): boolean {
    // Extract all numbers from the expression
    const usedNumbers = expression.match(/\d+/g)?.map(Number) || [];

    // Create a copy of available numbers to track usage
    const numberPool = [...availableNumbers];

    // Check each used number
    for (const num of usedNumbers) {
        const index = numberPool.indexOf(num);
        if (index === -1) {
            return false; // Number not available or used too many times
        }
        numberPool.splice(index, 1); // Remove used number
    }

    return true;
}

/**
 * Calculate score based on how close the result is to target
 */
export function calculateScore(result: number, target: number, timeBonus: number): {
    points: number;
    message: string;
} {
    const difference = Math.abs(result - target);

    if (difference === 0) {
        const totalPoints = 10 + timeBonus;
        return {
            points: totalPoints,
            message: `Mükemmel! Tam hedef! +${totalPoints} puan (${timeBonus} zaman bonusu)`
        };
    } else if (difference <= 5) {
        return {
            points: 5,
            message: `Çok yakın! (Fark: ${difference}) +5 puan`
        };
    } else if (difference <= 10) {
        return {
            points: 3,
            message: `Yakın! (Fark: ${difference}) +3 puan`
        };
    } else {
        return {
            points: 0,
            message: `Hedeften uzak. (Fark: ${difference})`
        };
    }
}


