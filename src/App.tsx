import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, RefreshCw, Send, Star } from 'lucide-react';
import { getRandomWord } from './data/words';
import { LetterState } from './types/game';
import { LetterBox } from './components/LetterBox';
import { GameButton } from './components/GameButton';
import { SuccessMessage } from './components/SuccessMessage';

function App() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [letterStates, setLetterStates] = useState<LetterState[]>([]);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [currentWord]);

  const initializeGame = () => {
    const states: LetterState[] = currentWord.word.split('').map(letter => ({
      letter,
      revealed: false
    }));
    setLetterStates(states);
    setGuess('');
    setIsSuccess(false);
    setShowSuccess(false);
  };

  const handleHint = () => {
    const hiddenIndices = letterStates
      .map((state, index) => (!state.revealed ? index : -1))
      .filter(index => index !== -1);

    if (hiddenIndices.length > 0) {
      const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
      const newStates = [...letterStates];
      newStates[randomIndex].revealed = true;
      setLetterStates(newStates);
    }
  };

  const handleGuess = () => {
    const normalizedGuess = guess.toUpperCase().trim();
    const normalizedWord = currentWord.word.toUpperCase();

    if (normalizedGuess === normalizedWord) {
      const newStates = letterStates.map(state => ({ ...state, revealed: true }));
      setLetterStates(newStates);
      setIsSuccess(true);
      setShowSuccess(true);
      setScore(score + 10);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
    setGuess('');
  };

  const handleNewGame = () => {
    setCurrentWord(getRandomWord());
  };

  const allRevealed = letterStates.every(state => state.revealed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-4">
      <SuccessMessage show={showSuccess} />

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
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Kelime Bulma Oyunu
          </h1>
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
            <p className="text-gray-400 text-sm mb-2">İPUCU</p>
            <p className="text-xl sm:text-2xl font-medium text-blue-300">{currentWord.hint}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {letterStates.map((state, index) => (
              <LetterBox
                key={index}
                letter={state.letter}
                revealed={state.revealed}
                index={index}
                isSuccess={isSuccess}
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
                disabled={allRevealed}
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
                disabled={!guess.trim() || allRevealed}
              />
              <GameButton
                onClick={handleHint}
                icon={Lightbulb}
                label="İpucu Al"
                variant="primary"
                disabled={allRevealed}
              />
              <GameButton
                onClick={handleNewGame}
                icon={RefreshCw}
                label="Yeni Oyun"
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
                +10 puan kazandınız! Yeni oyun için "Yeni Oyun" butonuna tıklayın.
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
          <p>Harfleri görmek için ipucu alabilir veya doğrudan tahmin edebilirsiniz</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
