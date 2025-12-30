export interface MathQuestion {
    id: number;
    question: string;
    answer: number;
    difficulty: 'easy' | 'medium' | 'hard';
}

export const MATH_QUESTIONS: MathQuestion[] = [
    // Kolay Sorular
    {
        id: 1,
        question: "15 + 28 = ?",
        answer: 43,
        difficulty: 'easy'
    },
    {
        id: 2,
        question: "56 - 23 = ?",
        answer: 33,
        difficulty: 'easy'
    },
    {
        id: 3,
        question: "12 × 7 = ?",
        answer: 84,
        difficulty: 'easy'
    },
    {
        id: 4,
        question: "144 ÷ 12 = ?",
        answer: 12,
        difficulty: 'easy'
    },
    {
        id: 5,
        question: "25 + 37 = ?",
        answer: 62,
        difficulty: 'easy'
    },
    // Orta Zorluk
    {
        id: 6,
        question: "15 × 8 + 20 = ?",
        answer: 140,
        difficulty: 'medium'
    },
    {
        id: 7,
        question: "100 - 45 + 23 = ?",
        answer: 78,
        difficulty: 'medium'
    },
    {
        id: 8,
        question: "18 × 5 - 30 = ?",
        answer: 60,
        difficulty: 'medium'
    },
    {
        id: 9,
        question: "200 ÷ 4 + 15 = ?",
        answer: 65,
        difficulty: 'medium'
    },
    {
        id: 10,
        question: "45 + 35 - 20 = ?",
        answer: 60,
        difficulty: 'medium'
    },
    {
        id: 11,
        question: "13 × 6 + 8 = ?",
        answer: 86,
        difficulty: 'medium'
    },
    {
        id: 12,
        question: "150 - 75 + 25 = ?",
        answer: 100,
        difficulty: 'medium'
    },
    // Zor Sorular
    {
        id: 13,
        question: "(15 + 25) × 3 = ?",
        answer: 120,
        difficulty: 'hard'
    },
    {
        id: 14,
        question: "180 ÷ (12 - 3) = ?",
        answer: 20,
        difficulty: 'hard'
    },
    {
        id: 15,
        question: "25 × 4 - 30 ÷ 5 = ?",
        answer: 94,
        difficulty: 'hard'
    },
    {
        id: 16,
        question: "(50 + 30) × 2 - 40 = ?",
        answer: 120,
        difficulty: 'hard'
    },
    {
        id: 17,
        question: "144 ÷ 12 + 15 × 3 = ?",
        answer: 57,
        difficulty: 'hard'
    },
    {
        id: 18,
        question: "200 - (45 + 35) = ?",
        answer: 120,
        difficulty: 'hard'
    },
    {
        id: 19,
        question: "18 × 5 + 60 ÷ 4 = ?",
        answer: 105,
        difficulty: 'hard'
    },
    {
        id: 20,
        question: "(100 - 40) ÷ 3 = ?",
        answer: 20,
        difficulty: 'hard'
    },
    // Ekstra Sorular
    {
        id: 21,
        question: "75 + 125 = ?",
        answer: 200,
        difficulty: 'easy'
    },
    {
        id: 22,
        question: "16 × 9 = ?",
        answer: 144,
        difficulty: 'medium'
    },
    {
        id: 23,
        question: "225 ÷ 15 = ?",
        answer: 15,
        difficulty: 'medium'
    },
    {
        id: 24,
        question: "50 × 3 - 75 = ?",
        answer: 75,
        difficulty: 'medium'
    },
    {
        id: 25,
        question: "(80 + 40) ÷ 6 = ?",
        answer: 20,
        difficulty: 'hard'
    }
];

export function getRandomMathQuestion(): MathQuestion {
    const randomIndex = Math.floor(Math.random() * MATH_QUESTIONS.length);
    return MATH_QUESTIONS[randomIndex];
}
