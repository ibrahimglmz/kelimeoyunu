import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, RefreshCw, Send, Star, Timer } from 'lucide-react';
import { getRandomWord } from '../data/words';
import { LetterState } from '../types/game';
import { LetterBox } from './LetterBox';
import { GameButton } from './GameButton';
import { SuccessMessage } from './SuccessMessage';
import { AlertMessage } from './AlertMessage';

export function WordGame() {
    const [currentWord, setCurrentWord] = useState(() => getRandomWord());
    const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
    const [letterStates, setLetterStates] = useState<LetterState[]>([]);
    const [guess, setGuess] = useState('');
    const [score, setScore] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [activeLetterBoxIndex, setActiveLetterBoxIndex] = useState<number | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [shakeKey, setShakeKey] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);

    const shuffleWord = (word: string) => {
        const letters = word.split('');
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        return letters;
    };

    const initializeGame = useCallback(() => {
        const states: LetterState[] = currentWord.word.split('').map(char => ({
            letter: '',
            correctLetter: char.toUpperCase(),
            revealed: false,
            isInvalid: false,
            isCorrect: false
        }));
        setLetterStates(states);
        setScrambledLetters(shuffleWord(currentWord.word.toUpperCase()));
        setGuess('');
        setIsSuccess(false);
        setShowSuccess(false);
        setTimeLeft(60);
        setIsTimerActive(true);
    }, [currentWord]);

    useEffect(() => {
        initializeGame();
    }, [initializeGame]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerActive && timeLeft > 0 && !isSuccess) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTimerActive(false);
            setAlertMessage('Süre doldu! Kelime: ' + currentWord.word);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 4000);

            // Reveal the word
            setLetterStates(prev => prev.map(state => ({
                ...state,
                letter: state.correctLetter,
                revealed: true,
                isCorrect: false // Highlight as error/timeout, not success
            })));
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timeLeft, isSuccess, currentWord.word]);


    const handleLetterBoxClick = (index: number) => {
        if (timeLeft === 0) return;
        setActiveLetterBoxIndex(index);
        const newLetterStates = [...letterStates];
        if (newLetterStates[index]) {
            newLetterStates[index].isInvalid = false;
        }
        setLetterStates(newLetterStates);
    };

    const handleLetterBoxChange = (index: number, newLetter: string) => {
        if (timeLeft === 0) return;
        const newLetterStates = [...letterStates];
        if (newLetterStates[index]) {
            newLetterStates[index].letter = newLetter;
        }
        setLetterStates(newLetterStates);
    };

    const handleLetterBoxBlur = (index: number, currentLetter: string) => {
        if (timeLeft === 0) return;
        const newLetterStates = [...letterStates];
        const correctLetterOfBox = newLetterStates[index].correctLetter;

        if (newLetterStates[index]) {
            if (currentLetter !== '' && !/^[a-zA-Z]$/.test(currentLetter)) {
                setAlertMessage('Lütfen sadece harf girin.');
                setShowAlert(true);
                setShakeKey(prev => prev + 1);
                setTimeout(() => setShowAlert(false), 2000);

                newLetterStates[index].isInvalid = true;
                newLetterStates[index].letter = '';
                newLetterStates[index].revealed = false;
                newLetterStates[index].isCorrect = false;
            } else if (currentLetter === '') {
                newLetterStates[index].letter = '';
                newLetterStates[index].revealed = false;
                newLetterStates[index].isInvalid = false;
                newLetterStates[index].isCorrect = false;
            } else if (currentLetter === correctLetterOfBox) {
                newLetterStates[index].letter = currentLetter;
                newLetterStates[index].isInvalid = false;
                newLetterStates[index].isCorrect = true;
                newLetterStates[index].revealed = true;

                // setAlertMessage('Doğru harf! Kelimeyi bulmaya çok yaklaştın.');
                // setShowAlert(true);
                // setTimeout(() => setShowAlert(false), 3000);
                // Removing intermediate alerts to keep flow smoother with timer

                const allCorrect = newLetterStates.every(state => state.isCorrect || state.revealed);
                if (allCorrect) {
                    handleSuccess(newLetterStates);
                }

            } else {
                setAlertMessage('Yanlış harf!');
                setShowAlert(true);
                setShakeKey(prev => prev + 1);
                setTimeout(() => setShowAlert(false), 2000);

                newLetterStates[index].isInvalid = true;
                newLetterStates[index].letter = '';
                newLetterStates[index].revealed = false;
                newLetterStates[index].isCorrect = false;
            }
            setLetterStates(newLetterStates);
        }
    };

    const handleSuccess = (finalStates: LetterState[]) => {
        setLetterStates(finalStates);
        setIsSuccess(true);
        setShowSuccess(true);
        setIsTimerActive(false);
        setScore(score + 10 + Math.floor(timeLeft / 2)); // Bonus for time

        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };

    const handleHint = () => {
        if (timeLeft === 0) return;
        const hiddenIndices = letterStates
            .map((state, index) => (!state.revealed ? index : -1))
            .filter(index => index !== -1);

        if (hiddenIndices.length > 0) {
            const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
            const newStates = [...letterStates];
            newStates[randomIndex].revealed = true;
            newStates[randomIndex].letter = newStates[randomIndex].correctLetter;
            newStates[randomIndex].isCorrect = true;
            setLetterStates(newStates);

            // Check win condition after hint
            const allCorrect = newStates.every(state => state.isCorrect || state.revealed);
            if (allCorrect) {
                handleSuccess(newStates);
            }
        }
    };

    const handleGuess = () => {
        if (timeLeft === 0) return;
        const normalizedGuess = guess.toUpperCase().trim();
        const normalizedWord = currentWord.word.toUpperCase();

        if (normalizedGuess === normalizedWord) {
            const newStates = letterStates.map(state => ({
                ...state,
                revealed: true,
                letter: state.correctLetter,
                isCorrect: true
            }));
            handleSuccess(newStates);
        } else {
            setAlertMessage('Yanlış tahmin! Tekrar dene.');
            setShowAlert(true);
            setShakeKey(prev => prev + 1);
            setTimeout(() => setShowAlert(false), 2000);
        }
        setGuess('');
    };

    const handleNewGame = () => {
        setCurrentWord(getRandomWord());
    };

    const allRevealed = letterStates.every(state => state.revealed);

    return (
        <>
            <SuccessMessage show={showSuccess} message={`Tebrikler! +${10 + (isSuccess ? Math.floor(timeLeft / 2) : 0)} puan`} />
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
                    <div className="mb-8 text-center">
                        <p className="text-gray-400 text-sm mb-4">GİZLİ KELİME HARFLERİ</p>
                        <div className="flex flex-wrap justify-center gap-2 mb-2">
                            {scrambledLetters.map((char, idx) => (
                                <motion.div
                                    key={`${char}-${idx}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-700 rounded-lg text-xl sm:text-2xl font-bold text-blue-300 shadow-inner border border-gray-600"
                                >
                                    {char}
                                </motion.div>
                            ))}
                        </div>
                        {/* <p className="text-xs text-gray-500 mt-2">İpucu: {currentWord.hint}</p> */}
                    </div>

                    <div className="flex flex-nowrap justify-center gap-3 mb-8 overflow-x-auto pb-4">
                        {letterStates.map((state, index) => (
                            <LetterBox
                                key={index}
                                letter={state.letter}
                                revealed={state.revealed}
                                index={index}
                                isSuccess={isSuccess}
                                onClick={handleLetterBoxClick}
                                onLetterChange={handleLetterBoxChange}
                                isActive={activeLetterBoxIndex === index}
                                onBlur={handleLetterBoxBlur}
                                isInvalid={state.isInvalid}
                                isCorrect={state.isCorrect}
                                shakeKey={shakeKey}
                                isTimeUp={timeLeft === 0 && !isSuccess}
                            />
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="guess" className="block text-sm font-medium text-gray-300 mb-2">
                                Tahmininizi Girin
                            </label>
                            <input
                                id="guess"
                                type="text"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                                disabled={allRevealed || timeLeft === 0}
                                placeholder="Kelimeyi yazın..."
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <GameButton
                                onClick={handleGuess}
                                icon={Send}
                                label="Tahmin Et"
                                variant="success"
                                disabled={!guess.trim() || allRevealed || timeLeft === 0}
                            />
                            <GameButton
                                onClick={handleHint}
                                icon={Lightbulb}
                                label="İpucu Al"
                                variant="primary"
                                disabled={allRevealed || timeLeft === 0}
                            />
                            <GameButton
                                onClick={handleNewGame}
                                icon={RefreshCw}
                                label="Yeni Kelime"
                                variant="secondary"
                            />
                        </div>
                    </div>

                    {isSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 text-center"
                        >
                            <p className="text-green-400 text-lg font-semibold">
                                +{10 + Math.floor(timeLeft / 2)} puan kazandınız!
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center text-gray-400 text-sm"
                >
                    <p>Harfleri kullanarak kelimeyi bulun. Her soru için 60 saniyeniz var!</p>
                </motion.div>
            </motion.div>
        </>
    );
}

