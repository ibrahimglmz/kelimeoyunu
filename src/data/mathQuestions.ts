export interface NumberPuzzle {
    id: number;
    totalQuestions: number;
    numbers: number[];
    target: number;
    usedNumbers: boolean[];
}

// Sabit matematik soruları - "Bir Kelime Bir İşlem"
const FIXED_PUZZLES = [
    { numbers: [10, 5, 2, 5, 7, 50], target: 554 },
    { numbers: [7, 6, 6, 8, 8, 50], target: 208 },
    { numbers: [10, 7, 8, 1, 1, 100], target: 153 },
    { numbers: [9, 9, 5, 5, 7, 75], target: 126 },
    { numbers: [4, 5, 6, 4, 5, 25], target: 768 },
    { numbers: [2, 2, 5, 7, 9, 25], target: 608 },
    { numbers: [7, 9, 1, 4, 5, 75], target: 646 },
    { numbers: [3, 4, 7, 8, 9, 100], target: 632 },
    { numbers: [2, 3, 5, 8, 9, 50], target: 346 },
    { numbers: [3, 4, 4, 7, 8, 25], target: 943 }
];

let currentPuzzleIndex = 0;

/**
 * Generate a new Bir İşlem puzzle with 6 numbers and a target
 */
export function generateNumberPuzzle(): NumberPuzzle {
    const puzzle = FIXED_PUZZLES[currentPuzzleIndex];
    const questionNumber = currentPuzzleIndex + 1;
    const totalQuestions = FIXED_PUZZLES.length;
    currentPuzzleIndex = (currentPuzzleIndex + 1) % FIXED_PUZZLES.length;

    return {
        id: questionNumber,
        totalQuestions: totalQuestions,
        numbers: [...puzzle.numbers],
        target: puzzle.target,
        usedNumbers: new Array(6).fill(false)
    };
}

/**
 * Safely evaluate a mathematical expression
 */
export function evaluateExpression(expression: string): number | null {
    try {
        // Replace × and ÷ with * and /
        const normalizedExpr = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/\s/g, '');

        // Basic validation - only allow numbers and operators
        if (!/^[\d+\-*/().]+$/.test(normalizedExpr)) {
            return null;
        }

        // Evaluate using Function constructor (safer than eval)
        const result = new Function(`return ${normalizedExpr}`)();

        return typeof result === 'number' && !isNaN(result) ? Math.round(result) : null;
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

/**
 * Generate a hint by providing a simple operation that gets closer to target
 */
export function generateHint(numbers: number[], target: number): string {
    // Simple hint: suggest using the two largest numbers
    const sorted = [...numbers].sort((a, b) => b - a);

    if (target > 100) {
        return `İpucu: Büyük sayıları çarpmayı dene (${sorted[0]} × ${sorted[1]})`;
    } else {
        return `İpucu: ${sorted[0]} + ${sorted[1]} = ${sorted[0] + sorted[1]}`;
    }
}
