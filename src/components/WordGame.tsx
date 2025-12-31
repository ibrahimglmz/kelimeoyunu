import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Send, Star, Timer, Lightbulb } from 'lucide-react';
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
    const [jokerCount, setJokerCount] = useState(3);
    const [isTimerActive, setIsTimerActive] = useState(true);


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
        if (timeLeft === 0 || !guess.trim()) return;

        const normalizedGuess = guess.toUpperCase().trim();

        // Check if already found
        if (foundWords.includes(normalizedGuess)) {
            setAlertMessage('Bu kelimeyi zaten buldunuz!');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            setGuess('');
            return;
        }

        // Check if can be formed from letters
        if (!canFormWord(normalizedGuess, currentRound.letters)) {
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
    };

    const handleSkipRound = () => {
        setAlertMessage(`${foundWords.length} kelime buldunuz. Sonraki tura geçiliyor...`);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            handleNextRound();
        }, 2000);
    };

    const handleJoker = () => {
        if (jokerCount <= 0 || timeLeft === 0) return;

        const availableWords = currentRound.availableWords.filter(
            word => !foundWords.includes(word)
        );

        if (availableWords.length === 0) {
            setAlertMessage('Tüm kelimeler bulundu!');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            return;
        }

        const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];

        setFoundWords([...foundWords, randomWord]);
        setJokerCount(prev => prev - 1);
        setAlertMessage(`Joker Kullanıldı: ${randomWord}`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
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
                            {currentRound.letters.map((char, idx) => (
                                <motion.div
                                    key={`${char}-${idx}`}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl text-2xl sm:text-3xl font-bold text-white shadow-lg border-2 border-blue-300"
                                >
                                    {char}
                                </motion.div>
                            ))}
                        </div>
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
                                onChange={(e) => setGuess(e.target.value.toUpperCase())}
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
                            <GameButton
                                onClick={handleJoker}
                                icon={Lightbulb}
                                label={`Joker (${jokerCount})`}
                                variant="warning"
                                disabled={jokerCount <= 0 || timeLeft === 0}
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
