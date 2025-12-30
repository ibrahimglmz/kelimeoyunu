import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Send, Star, Timer } from 'lucide-react';
import { getRandomMathQuestion, MathQuestion } from '../data/mathQuestions';
import { GameButton } from './GameButton';
import { SuccessMessage } from './SuccessMessage';
import { AlertMessage } from './AlertMessage';

export function OperationGame() {
    const [currentQuestion, setCurrentQuestion] = useState<MathQuestion>(() => getRandomMathQuestion());
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerActive && timeLeft > 0 && !isAnswered) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !isAnswered) {
            setIsTimerActive(false);
            setShowCorrectAnswer(true);
            setAlertMessage(`Süre doldu! Doğru cevap: ${currentQuestion.answer}`);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 4000);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timeLeft, isAnswered, currentQuestion.answer]);

    const handleGuess = () => {
        if (timeLeft === 0 || isAnswered) return;

        const answer = parseInt(userAnswer);

        if (isNaN(answer)) {
            setAlertMessage('Lütfen geçerli bir sayı girin.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            return;
        }

        setIsAnswered(true);
        setIsTimerActive(false);

        if (answer === currentQuestion.answer) {
            const timeBonus = Math.floor(timeLeft / 2);
            const totalPoints = 10 + timeBonus;
            setScore(score + totalPoints);
            setAlertMessage(`Doğru! +${totalPoints} puan (${timeBonus} zaman bonusu)`);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } else {
            setShowCorrectAnswer(true);
            setAlertMessage(`Yanlış! Doğru cevap: ${currentQuestion.answer}`);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    const handleNewGame = () => {
        setCurrentQuestion(getRandomMathQuestion());
        setUserAnswer('');
        setShowSuccess(false);
        setShowAlert(false);
        setTimeLeft(60);
        setIsTimerActive(true);
        setIsAnswered(false);
        setShowCorrectAnswer(false);
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
                    <div className="mb-8 text-center">
                        <p className="text-gray-400 text-sm mb-4">MATEMATİK SORUSU</p>
                        <motion.p
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="text-4xl sm:text-5xl font-bold text-purple-400 mb-6"
                        >
                            {currentQuestion.question}
                        </motion.p>

                        {showCorrectAnswer && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl font-bold text-red-500 mt-4"
                            >
                                Cevap: {currentQuestion.answer}
                            </motion.div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="answer" className="block text-sm font-medium text-gray-300 mb-2">
                                Cevabınız
                            </label>
                            <input
                                id="answer"
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                                disabled={timeLeft === 0 || isAnswered}
                                placeholder="Cevabınızı yazın..."
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all text-center text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <GameButton
                                onClick={handleGuess}
                                icon={Send}
                                label="Cevapla"
                                variant="success"
                                disabled={!userAnswer || timeLeft === 0 || isAnswered}
                            />
                            <GameButton
                                onClick={handleNewGame}
                                icon={RefreshCw}
                                label="Yeni Soru"
                                variant="secondary"
                            />
                        </div>
                    </div>

                    {isAnswered && !showCorrectAnswer && (
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
                    <p>Matematik sorusunu çözün. Her soru için 60 saniyeniz var!</p>
                </motion.div>
            </motion.div>
        </>
    );
}
