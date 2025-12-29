import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Send, Star } from 'lucide-react';
import { OPERATIONS, OperationQuestion } from '../data/operations';
import { GameButton } from './GameButton';
import { SuccessMessage } from './SuccessMessage';
import { AlertMessage } from './AlertMessage';

export function OperationGame() {
    const [currentQuestion, setCurrentQuestion] = useState<OperationQuestion>(() => {
        const randomIndex = Math.floor(Math.random() * OPERATIONS.length);
        return OPERATIONS[randomIndex];
    });

    const [userResult, setUserResult] = useState('');
    const [score, setScore] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleGuess = () => {
        const result = parseInt(userResult);

        if (isNaN(result)) {
            setAlertMessage('Lütfen geçerli bir sayı girin.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            return;
        }

        const difference = Math.abs(result - currentQuestion.target);

        if (difference === 0) {
            setScore(score + 10);
            setAlertMessage('Tam İsabet! Hedef sayıya ulaştınız!');
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } else if (difference <= 5) {
            setScore(score + 5);
            setAlertMessage(`Çok yaklaştınız! Fark: ${difference}. (+5 puan)`);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } else {
            setAlertMessage(`Maalesef yaklaşamadınız. Fark: ${difference}.`);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
        }
    };

    const handleNewGame = () => {
        const randomIndex = Math.floor(Math.random() * OPERATIONS.length);
        setCurrentQuestion(OPERATIONS[randomIndex]);
        setUserResult('');
        setShowSuccess(false);
    };

    return (
        <>
            <SuccessMessage show={showSuccess} message="Hedef sayıya ulaştınız! 🎉" />
            <AlertMessage show={showAlert} message={alertMessage} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full"
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-center mb-8"
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-bold text-xl shadow-lg"
                    >
                        <Star size={24} fill="currentColor" />
                        Skor: {score}
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700"
                >
                    <div className="mb-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">HEDEF SAYI</p>
                        <p className="text-6xl font-bold text-blue-400 mb-8">{currentQuestion.target}</p>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {currentQuestion.numbers.map((num, idx) => (
                                <div key={idx} className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg border border-gray-600">
                                    {num}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="result" className="block text-sm font-medium text-gray-300 mb-2">
                                Bulduğunuz Sayı
                            </label>
                            <input
                                id="result"
                                type="number"
                                value={userResult}
                                onChange={(e) => setUserResult(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                                placeholder="Sonuç..."
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all text-center text-xl"
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <GameButton
                                onClick={handleGuess}
                                icon={Send}
                                label="Kontrol Et"
                                variant="success"
                                disabled={!userResult}
                            />
                            <GameButton
                                onClick={handleNewGame}
                                icon={RefreshCw}
                                label="Yeni Soru"
                                variant="secondary"
                            />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center text-gray-400 text-sm"
                >
                    <p>Verilen 6 sayıyı kullanarak (+, -, *, /) hedef sayıya ulaşmaya çalışın.</p>
                </motion.div>
            </motion.div>
        </>
    );
}
