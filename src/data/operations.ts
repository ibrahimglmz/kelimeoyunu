export interface OperationQuestion {
    id: number;
    numbers: number[];
    target: number;
}

export const OPERATIONS: OperationQuestion[] = [
    {
        id: 1,
        numbers: [10, 5, 2, 5, 7, 50],
        target: 554
    },
    {
        id: 2,
        numbers: [7, 6, 6, 8, 8, 50],
        target: 208
    },
    {
        id: 3,
        numbers: [10, 7, 8, 1, 1, 100],
        target: 153
    },
    {
        id: 4,
        numbers: [9, 9, 5, 5, 7, 75],
        target: 126
    },
    {
        id: 5,
        numbers: [4, 5, 6, 4, 5, 25],
        target: 768
    },
    {
        id: 6,
        numbers: [2, 2, 5, 7, 9, 25],
        target: 608
    },
    {
        id: 7,
        numbers: [7, 9, 1, 4, 5, 75],
        target: 646
    },
    {
        id: 8,
        numbers: [3, 4, 7, 8, 9, 100],
        target: 632
    },
    {
        id: 9,
        numbers: [2, 3, 5, 8, 9, 50],
        target: 346
    },
    {
        id: 10,
        numbers: [3, 4, 4, 7, 8, 25],
        target: 943
    }
];
