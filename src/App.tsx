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
  const [activeLetterBoxIndex, setActiveLetterBoxIndex] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [shakeKey, setShakeKey] = useState(0); // Animasyonu tetiklemek için kullanılacak
  const [showCloseGuess, setShowCloseGuess] = useState(false);
  const [closeGuessMessage, setCloseGuessMessage] = useState(''); // Bu state artık kullanılmayacak, tek alertMessage kullanacağız.
  const [correctGuessAnimationKey, setCorrectGuessAnimationKey] = useState(0); // Doğru tahmin animasyonu için

  useEffect(() => {
    initializeGame();
  }, [currentWord]);

  const initializeGame = () => {
    const states: LetterState[] = currentWord.word.split('').map(char => ({
      letter: '', // Kullanıcının girdiği harf başlangıçta boş
      correctLetter: char.toUpperCase(), // Orijinal harf
      revealed: false,
      isInvalid: false,
      isCorrect: false
    }));
    setLetterStates(states);
    setGuess('');
    setIsSuccess(false);
    setShowSuccess(false);
  };

  const handleLetterBoxClick = (index: number) => {
    setActiveLetterBoxIndex(index);
    // Tıklanan kutudaki invalid durumunu sıfırla
    const newLetterStates = [...letterStates];
    if (newLetterStates[index]) {
      newLetterStates[index].isInvalid = false;
    }
    setLetterStates(newLetterStates);
  };

  const handleLetterBoxChange = (index: number, newLetter: string) => {
    const newLetterStates = [...letterStates];
    if (newLetterStates[index]) {
      newLetterStates[index].letter = newLetter;
    }
    setLetterStates(newLetterStates);
  };

  const handleLetterBoxBlur = (index: number, currentLetter: string) => {
    const newLetterStates = [...letterStates];
    const correctLetterOfBox = newLetterStates[index].correctLetter;

    if (newLetterStates[index]) {
      if (currentLetter !== '' && !/^[a-zA-Z]$/.test(currentLetter)) {
        setAlertMessage('Lütfen sadece harf girin.');
        setShowAlert(true);
        setShakeKey(prev => prev + 1); // Animasyonu tetikle
        setTimeout(() => setShowAlert(false), 2000);

        newLetterStates[index].isInvalid = true;
        newLetterStates[index].letter = ''; // Yanlış giriş olursa kutu içeriğini sil
        newLetterStates[index].revealed = false;
        newLetterStates[index].isCorrect = false;
      } else if (currentLetter === '') {
        newLetterStates[index].letter = '';
        newLetterStates[index].revealed = false;
        newLetterStates[index].isInvalid = false;
        newLetterStates[index].isCorrect = false;
      } else if (currentLetter === correctLetterOfBox) {
        // Doğru harf girildiğinde
        newLetterStates[index].letter = currentLetter; // Kullanıcının girdiği doğru harfi kaydet
        newLetterStates[index].isInvalid = false;
        newLetterStates[index].isCorrect = true;
        newLetterStates[index].revealed = true; // Doğru harf girildiğinde açığa çıksın

        setAlertMessage('Doğru harf! Kelimeyi bulmaya çok yaklaştın.'); // Birleşik bildirim
        setShowAlert(true);
        setCorrectGuessAnimationKey(prev => prev + 1); // Yeni animasyonu tetikle
        setTimeout(() => setShowAlert(false), 3000); // Daha uzun süreli bildirim

        const allCorrect = newLetterStates.every(state => state.isCorrect || state.revealed);
        if (allCorrect) {
          setAlertMessage('Tebrikler! Kelimeyi doğru tahmin ettin!'); // Oyun bitiş bildirimi
          setShowAlert(true);
          // Burada ekstra bir bitiş animasyonu veya yönlendirme olabilir.
        }

      } else {
        // Yanlış harf girildiğinde
        setAlertMessage('Yanlış harf!');
        setShowAlert(true);
        setShakeKey(prev => prev + 1);
        setTimeout(() => setShowAlert(false), 2000);

        newLetterStates[index].isInvalid = true;
        newLetterStates[index].letter = ''; // Yanlış giriş olursa kutu içeriğini sil
        newLetterStates[index].revealed = false;
        newLetterStates[index].isCorrect = false;
      }
      setLetterStates(newLetterStates);
    }
  };

  const handleHint = () => {
    const hiddenIndices = letterStates
      .map((state, index) => (!state.revealed ? index : -1))
      .filter(index => index !== -1);

    if (hiddenIndices.length > 0) {
      const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
      const newStates = [...letterStates];
      newStates[randomIndex].revealed = true;
      newStates[randomIndex].letter = newStates[randomIndex].correctLetter; // Harfi açığa çıkar
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
    } else {
      // Yanlış tahmin yapıldığında
      setAlertMessage('Yanlış tahmin! Tekrar dene.');
      setShowAlert(true);
      setShakeKey(prev => prev + 1); // Tüm kutuları sallamak için tetikle
      setTimeout(() => setShowAlert(false), 2000);
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

          <div className="flex flex-nowrap justify-center gap-3 mb-8">
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

interface AlertMessageProps {
  show: boolean;
  message: string;
}

const AlertMessage = ({ show, message }: AlertMessageProps) => {
  const isCloseGuess = message.includes('Kelimeyi bulmaya çok yaklaştın') || message.includes('Tebrikler!');
  const bgColor = isCloseGuess ? 'bg-green-600' : 'bg-red-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`fixed top-5 left-1/2 -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded-lg shadow-xl z-50 text-lg font-semibold`}
    >
      {message}
    </motion.div>
  );
};
