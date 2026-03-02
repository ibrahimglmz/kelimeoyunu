import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Star, Timer, RefreshCw } from 'lucide-react';
import { getCurrentWordRound, nextWordRound, canFormWord, isValidWord, getWordScore, getTotalRounds } from '../data/words';
import { GameButton } from './GameButton';
import { SuccessMessage } from './SuccessMessage';
import { AlertMessage } from './AlertMessage';

import { useGameSound } from '../hooks/useGameSound';

export function WordGame() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [currentRound, setCurrentRound] = useState(() => getCurrentWordRound());
    const [guess, setGuess] = useState('');
    const [score, setScore] = useState(0);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState(90);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // Background music - playing when timer is active
    useGameSound('/sounds/game-music.mp3', isTimerActive, 0.4);
    // Timer sound
    useGameSound('/sounds/timer-tick.mp3', isTimerActive, 0.2);

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTimerActive(false);
            setAlertMessage(`Süre doldu! ${foundWords.length} kelime buldunuz.`);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 4000);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timeLeft, foundWords.length]);

    const handleGuess = () => {
        if (!hasStarted || timeLeft === 0 || !guess.trim()) return;

        const normalizedGuess = guess.toLocaleUpperCase('tr-TR').trim();
        const errorMsg = 'Kelime listede bulunamadı!';

        // Check if already found
        if (foundWords.includes(normalizedGuess)) {
            setAlertMessage('Bu kelimeyi zaten buldunuz!');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            setGuess('');
            return;
        }

        // 1. Check if can be formed from letters
        if (!canFormWord(normalizedGuess, currentRound.letters)) {
            setAlertMessage(errorMsg);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            setGuess('');
            return;
        }

        // 2. Check if valid word in current round
        if (!isValidWord(normalizedGuess)) {
            setAlertMessage(errorMsg);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            setGuess('');
            return;
        }

        // Valid word found!
        const points = getWordScore(normalizedGuess);
        setFoundWords([...foundWords, normalizedGuess]);
        setScore(score + points);
        setSuccessMessage(`Harika! "${normalizedGuess}" +${points} puan`);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
        setGuess('');
    };

    const handleNextRound = () => {
        const newRound = nextWordRound();
        setCurrentRound(newRound);
        setGuess('');
        setFoundWords([]);
        setHasStarted(false);
        setIsTimerActive(false);
        setTimeLeft(90);
    };

    const handleSkipRound = () => {
        setAlertMessage(`${foundWords.length} kelime buldunuz. Sonraki tura geçiliyor...`);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            handleNextRound();
        }, 2000);
    };

    return (
        <>
            <SuccessMessage show={showSuccess} message={successMessage} />
            <AlertMessage show={showAlert} message={alertMessage} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full"
                translate="no"
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

                    <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-lg shadow-lg ${!hasStarted ? 'bg-gray-600' : timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-600'
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
                    {/* Round Number */}
                    <div className="mb-6 text-center">
                        <p className="text-gray-400 text-sm mb-2">TUR</p>
                        <motion.p
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="text-4xl font-bold text-blue-400"
                        >
                            {currentRound.roundNumber} / {getTotalRounds()}
                        </motion.p>
                    </div>

                    {/* Letters */}
                    <div className="mb-8 text-center">
                        <p className="text-gray-400 text-sm mb-4">HARFLER</p>
                        {!hasStarted ? (
                            <div className="flex justify-center items-center py-4">
                                <button
                                    onClick={() => {
                                        setHasStarted(true);
                                        setIsTimerActive(true);
                                        setTimeout(() => inputRef.current?.focus(), 100);
                                    }}
                                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg transform transition hover:scale-105"
                                >
                                    Turu Başlat
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-wrap justify-center gap-2 mb-2">
                                {currentRound.letters.map((char, idx) => {
                                    const isJoker = char === '?';

                                    return (
                                        <motion.div
                                            key={`${char}-${idx}`}
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{
                                                scale: 1,
                                                rotate: 0,
                                            }}
                                            transition={{ delay: idx * 0.05 }}
                                            className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl text-2xl sm:text-3xl font-bold text-white shadow-lg border-2 border-blue-300 ${isJoker
                                                ? 'bg-purple-600 border-purple-300'
                                                : 'bg-gradient-to-br from-blue-500 to-blue-700'
                                                }`}
                                        >
                                            {char}
                                        </motion.div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Found Words */}
                    {foundWords.length > 0 && (
                        <div className="mb-6">
                            <p className="text-gray-400 text-sm mb-3 text-center">BULUNAN KELİMELER ({foundWords.length})</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {foundWords.map((word, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-semibold"
                                    >
                                        {word} ({getWordScore(word)}p)
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="guess" className="block text-sm font-medium text-gray-300 mb-2">
                                Kelime Girin
                            </label>
                            <input
                                ref={inputRef}
                                id="guess"
                                type="text"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value.toLocaleUpperCase('tr-TR'))}
                                onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                                disabled={!hasStarted || timeLeft === 0}
                                placeholder="Kelimeyi yazın..."
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase"
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <GameButton
                                onClick={handleGuess}
                                icon={Send}
                                label="Gönder"
                                variant="success"
                                disabled={!hasStarted || !guess.trim() || timeLeft === 0}
                            />
                            <GameButton
                                onClick={handleSkipRound}
                                icon={RefreshCw}
                                label="Sonraki Tur"
                                variant="secondary"
                            />

                        </div>
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 text-center text-gray-400 text-sm"
                    >
                        <p>Toplam {currentRound.availableWords.length} kelime bulunabilir</p>
                        <p className="mt-2 text-xs">
                            Puanlama: 9+ harf=15p, 8 harf=12p, 7 harf=10p, 6 harf=8p, 5 harf=5p
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center text-gray-400 text-sm"
                >
                    <p>Verilen harflerden kelimeler oluşturun. Her tur için 90 saniyeniz var!</p>
                </motion.div>
            </motion.div >
        </>
    );
}
