import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Star, Timer, RefreshCw } from 'lucide-react';
import { getCurrentWordRound, nextWordRound, canFormWord, isValidWord, getWordScore, getTotalRounds } from '../data/words';
import { GameButton } from './GameButton';
import { SuccessMessage } from './SuccessMessage';
import { AlertMessage } from './AlertMessage';

import { useGameSound } from '../hooks/useGameSound';

export function WordGame() {
    const [currentRound, setCurrentRound] = useState(() => getCurrentWordRound());
    const [guess, setGuess] = useState('');
    const [score, setScore] = useState(0);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState(90);
    const [isTimerActive, setIsTimerActive] = useState(true);

    // Joker state: map index of '?' to the user-selected char
    // The joker is identified by its value '?' in the currentRound.letters array
    const [jokerValue, setJokerValue] = useState<string | null>(null);
    const [isSelectingJoker, setIsSelectingJoker] = useState(false);
    const [jokerInput, setJokerInput] = useState('');

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

    const getEffectiveLetters = () => {
        return currentRound.letters.map(l => l === '?' && jokerValue ? jokerValue : l);
    };

    const handleGuess = () => {
        if (timeLeft === 0 || !guess.trim()) return;

        const normalizedGuess = guess.toLocaleUpperCase('tr-TR').trim();

        // Check if already found
        if (foundWords.includes(normalizedGuess)) {
            setAlertMessage('Bu kelimeyi zaten buldunuz!');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            setGuess('');
            return;
        }

        // Check if can be formed from letters (using effective letters with joker resolved)
        const effectiveLetters = getEffectiveLetters();
        if (!canFormWord(normalizedGuess, effectiveLetters)) {
            setAlertMessage('Bu kelime verilen harflerden oluşturulamaz!');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            setGuess('');
            return;
        }

        // Check if valid word in current round
        if (!isValidWord(normalizedGuess)) {
            setAlertMessage('Bu kelime listede yok!');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
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
        setTimeLeft(90);
        setIsTimerActive(true);
        setJokerValue(null);
        setIsSelectingJoker(false);
        setJokerInput('');
    };

    const handleSkipRound = () => {
        setAlertMessage(`${foundWords.length} kelime buldunuz. Sonraki tura geçiliyor...`);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            handleNextRound();
        }, 2000);
    };

    const handleJokerClick = () => {
        setIsSelectingJoker(true);
    };

    const confirmJokerSelection = () => {
        if (jokerInput && jokerInput.length === 1) {
            setJokerValue(jokerInput.toLocaleUpperCase('tr-TR'));
            setIsSelectingJoker(false);
            setJokerInput('');
        }
    };

    return (
        <>
            <SuccessMessage show={showSuccess} message={successMessage} />
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

                    <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-lg shadow-lg ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-600'
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
                        <div className="flex flex-wrap justify-center gap-2 mb-2">
                            {currentRound.letters.map((char, idx) => {
                                const isJoker = char === '?';
                                const displayChar = isJoker && jokerValue ? jokerValue : char;
                                const isFilledJoker = isJoker && jokerValue;

                                return (
                                    <motion.div
                                        key={`${char}-${idx}`}
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{
                                            scale: 1,
                                            rotate: 0,
                                            backgroundColor: isFilledJoker ? '#10B981' : undefined // Green if filled joker
                                        }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={isJoker ? handleJokerClick : undefined}
                                        className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl text-2xl sm:text-3xl font-bold text-white shadow-lg border-2 border-blue-300 ${isJoker
                                            ? 'cursor-pointer hover:scale-110 transition-transform bg-purple-600 border-purple-300'
                                            : 'bg-gradient-to-br from-blue-500 to-blue-700'
                                            } ${isFilledJoker ? 'bg-green-600 !border-green-300' : ''}`}
                                    >
                                        {displayChar}
                                    </motion.div>
                                )
                            })}
                        </div>
                        {isSelectingJoker && (
                            <div className="mt-4 flex justify-center items-center gap-2 animate-fadeIn">
                                <input
                                    autoFocus
                                    className="w-16 h-10 rounded text-center text-black font-bold uppercase"
                                    maxLength={1}
                                    placeholder="?"
                                    value={jokerInput}
                                    onChange={(e) => setJokerInput(e.target.value.toLocaleUpperCase('tr-TR'))}
                                    onKeyDown={(e) => e.key === 'Enter' && confirmJokerSelection()}
                                />
                                <button
                                    onClick={confirmJokerSelection}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-bold"
                                >
                                    Seç
                                </button>
                                <button
                                    onClick={() => setIsSelectingJoker(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-bold"
                                >
                                    İptal
                                </button>
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
                                id="guess"
                                type="text"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value.toLocaleUpperCase('tr-TR'))}
                                onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                                disabled={timeLeft === 0}
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
                                disabled={!guess.trim() || timeLeft === 0}
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

