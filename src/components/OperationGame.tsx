import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Send, Star, Timer, Delete, Lightbulb } from 'lucide-react';
import {
    generateNumberPuzzle,
    evaluateExpression,
    validateNumberUsage,
    calculateScore,
    generateHint,
    NumberPuzzle
} from '../data/mathQuestions';
import { GameButton } from './GameButton';
import { SuccessMessage } from './SuccessMessage';
import { AlertMessage } from './AlertMessage';

import { useGameSound } from '../hooks/useGameSound';

export function OperationGame() {
    const [puzzle, setPuzzle] = useState<NumberPuzzle>(() => generateNumberPuzzle());
    const [expression, setExpression] = useState('');
    const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
    const [score, setScore] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [isAnswered, setIsAnswered] = useState(false);
    const [currentResult, setCurrentResult] = useState<number | null>(null);
    const [jokerUsed, setJokerUsed] = useState(false);

    // Background music - playing when timer is active
    useGameSound('/sounds/game-music.mp3', isTimerActive, 0.4);
    // Timer sound
    useGameSound('/sounds/timer-tick.mp3', isTimerActive, 0.2);

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerActive && timeLeft > 0 && !isAnswered) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !isAnswered) {
            handleTimeUp();
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timeLeft, isAnswered]);

    // Calculate result whenever expression changes
    useEffect(() => {
        if (expression) {
            const result = evaluateExpression(expression);
            setCurrentResult(result);
        } else {
            setCurrentResult(null);
        }
    }, [expression]);

    const handleTimeUp = () => {
        setIsTimerActive(false);
        setAlertMessage(`Süre doldu! Hedef: ${puzzle.target}`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000);
        setIsAnswered(true);
    };

    const handleNumberClick = (number: number, index: number) => {
        if (timeLeft === 0 || isAnswered || usedIndices.has(index)) return;

        setExpression(prev => prev + number);
        setUsedIndices(prev => new Set([...prev, index]));
    };

    const handleOperatorClick = (operator: string) => {
        if (timeLeft === 0 || isAnswered || !expression) return;

        // Don't add operator if last character is already an operator
        const lastChar = expression[expression.length - 1];
        if (['+', '-', '×', '÷', '(', ')'].includes(lastChar)) return;

        setExpression(prev => prev + ' ' + operator + ' ');
    };

    const handleParenthesis = (paren: string) => {
        if (timeLeft === 0 || isAnswered) return;
        setExpression(prev => prev + paren);
    };

    const handleBackspace = () => {
        if (timeLeft === 0 || isAnswered || !expression) return;

        const trimmed = expression.trimEnd();

        // Check if we're removing a number
        const match = trimmed.match(/(\d+)$/);
        if (match) {
            const numberToRemove = parseInt(match[1]);
            const indexToFree = puzzle.numbers.findIndex((num, idx) =>
                num === numberToRemove && usedIndices.has(idx)
            );

            if (indexToFree !== -1) {
                setUsedIndices(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(indexToFree);
                    return newSet;
                });
            }
        }

        // Remove last character or operator with spaces
        if (trimmed.endsWith(' ')) {
            setExpression(trimmed.slice(0, -3)); // Remove " + " or similar
        } else {
            setExpression(trimmed.slice(0, -1));
        }
    };

    const handleClear = () => {
        if (timeLeft === 0 || isAnswered) return;
        setExpression('');
        setUsedIndices(new Set());
        setCurrentResult(null);
    };

    const handleSubmit = () => {
        if (timeLeft === 0 || isAnswered || !expression) return;

        const result = evaluateExpression(expression);

        if (result === null) {
            setAlertMessage('Geçersiz işlem! Lütfen kontrol edin.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            return;
        }

        // Validate number usage
        if (!validateNumberUsage(expression, puzzle.numbers)) {
            setAlertMessage('Sadece verilen sayıları kullanabilirsiniz!');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            return;
        }

        setIsAnswered(true);
        setIsTimerActive(false);

        const timeBonus = Math.floor(timeLeft / 2);
        const scoreResult = calculateScore(result, puzzle.target, timeBonus);

        if (scoreResult.points > 0) {
            setScore(score + scoreResult.points);
            setAlertMessage(scoreResult.message);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } else {
            setAlertMessage(scoreResult.message);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    const handleJoker = () => {
        if (jokerUsed || timeLeft === 0 || isAnswered) return;

        setJokerUsed(true);
        const hint = generateHint(puzzle.numbers, puzzle.target);
        setAlertMessage(hint);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
    };

    const handleNewGame = () => {
        setPuzzle(generateNumberPuzzle());
        setExpression('');
        setUsedIndices(new Set());
        setShowSuccess(false);
        setShowAlert(false);
        setTimeLeft(60);
        setIsTimerActive(true);
        setIsAnswered(false);
        setCurrentResult(null);
        setJokerUsed(false);
    };

    const getDifferenceColor = () => {
        if (currentResult === null) return 'text-gray-400';
        const diff = Math.abs(currentResult - puzzle.target);
        if (diff === 0) return 'text-green-400';
        if (diff <= 5) return 'text-yellow-400';
        if (diff <= 10) return 'text-orange-400';
        return 'text-red-400';
    };

    return (
        <>
            <SuccessMessage show={showSuccess} message={alertMessage} />
            <AlertMessage show={showAlert} message={alertMessage} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full"
            >
                <div className="flex justify-between items-center mb-8 px-4">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 px-6 py-2 rounded-full font-bold text-lg shadow-lg"
                    >
                        <Star size={20} fill="currentColor" />
                        <span>{score}</span>
                    </motion.div>

                    <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-lg shadow-lg ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-purple-600'
                        } text-white`}>
                        <Timer size={20} />
                        <span>{timeLeft}s</span>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700"
                >
                    {/* Question Number */}
                    <div className="mb-2 text-center">
                        <p className="text-gray-400 text-sm mb-1">SORU</p>
                        <motion.p
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="text-2xl font-bold text-purple-400"
                        >
                            {puzzle.id} / {puzzle.totalQuestions}
                        </motion.p>
                    </div>

                    {/* Target Number */}
                    <div className="mb-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">HEDEF SAYI</p>
                        <motion.p
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="text-6xl font-bold text-purple-400 mb-4"
                        >
                            {puzzle.target}
                        </motion.p>
                    </div>

                    {/* Available Numbers */}
                    <div className="mb-6">
                        <p className="text-gray-400 text-sm mb-3 text-center">KULLANILACAK SAYILAR</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {puzzle.numbers.map((number, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleNumberClick(number, index)}
                                    disabled={usedIndices.has(index) || timeLeft === 0 || isAnswered}
                                    className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-xl text-2xl sm:text-3xl font-bold shadow-lg transition-all ${usedIndices.has(index)
                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                                        : 'bg-gradient-to-br from-purple-500 to-purple-700 text-white hover:scale-110 hover:shadow-xl cursor-pointer'
                                        }`}
                                >
                                    {number}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Expression Display */}
                    <div className="mb-6">
                        <div className="bg-gray-900 rounded-lg p-4 min-h-[80px] border-2 border-purple-500/30">
                            <p className="text-gray-400 text-xs mb-2">İŞLEMİNİZ</p>
                            <p className="text-white text-2xl font-mono break-all">
                                {expression || <span className="text-gray-600">Sayıları ve işlemleri seçin...</span>}
                            </p>
                        </div>
                    </div>

                    {/* Current Result */}
                    {currentResult !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 text-center"
                        >
                            <p className="text-gray-400 text-sm mb-1">SONUÇ</p>
                            <p className={`text-4xl font-bold ${getDifferenceColor()}`}>
                                {currentResult}
                            </p>
                            {currentResult !== puzzle.target && (
                                <p className="text-gray-500 text-sm mt-1">
                                    Fark: {Math.abs(currentResult - puzzle.target)}
                                </p>
                            )}
                        </motion.div>
                    )}

                    {/* Operators */}
                    <div className="mb-6">
                        <p className="text-gray-400 text-sm mb-3 text-center">İŞLEMLER</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {['+', '-', '×', '÷'].map((op) => (
                                <button
                                    key={op}
                                    onClick={() => handleOperatorClick(op)}
                                    disabled={timeLeft === 0 || isAnswered}
                                    className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-lg shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {op}
                                </button>
                            ))}
                            <button
                                onClick={() => handleParenthesis('(')}
                                disabled={timeLeft === 0 || isAnswered}
                                className="w-14 h-14 bg-gray-600 hover:bg-gray-700 text-white text-2xl font-bold rounded-lg shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                (
                            </button>
                            <button
                                onClick={() => handleParenthesis(')')}
                                disabled={timeLeft === 0 || isAnswered}
                                className="w-14 h-14 bg-gray-600 hover:bg-gray-700 text-white text-2xl font-bold rounded-lg shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                )
                            </button>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        <button
                            onClick={handleBackspace}
                            disabled={!expression || timeLeft === 0 || isAnswered}
                            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Delete size={18} />
                            Geri
                        </button>
                        <button
                            onClick={handleClear}
                            disabled={!expression || timeLeft === 0 || isAnswered}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Temizle
                        </button>
                        <GameButton
                            onClick={handleJoker}
                            icon={Lightbulb}
                            label="Joker"
                            variant="primary"
                            disabled={jokerUsed || timeLeft === 0 || isAnswered}
                        />
                        <GameButton
                            onClick={handleSubmit}
                            icon={Send}
                            label="Gönder"
                            variant="success"
                            disabled={!expression || timeLeft === 0 || isAnswered}
                        />
                        <GameButton
                            onClick={handleNewGame}
                            icon={RefreshCw}
                            label="Yeni Oyun"
                            variant="secondary"
                        />
                    </div>

                    {jokerUsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 text-center text-yellow-400 text-sm"
                        >
                            ⭐ Joker kullanıldı
                        </motion.div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center text-gray-400 text-sm"
                >
                    <p>Verilen sayıları kullanarak hedef sayıya ulaşın. Her sayıyı sadece bir kez kullanabilirsiniz!</p>
                </motion.div>
            </motion.div>
        </>
    );
}
