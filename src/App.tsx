import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordGame } from './components/WordGame';
import { OperationGame } from './components/OperationGame';
import { Analytics } from "@vercel/analytics/react";

type GameMode = 'word' | 'operation';

function App() {
  const [gameMode, setGameMode] = useState<GameMode>('word');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center p-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-4xl flex justify-center gap-4 mt-8 mb-4 z-10"
      >
        <button
          onClick={() => setGameMode('word')}
          className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${gameMode === 'word'
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
        >
          Kelime Oyunu
        </button>
        <button
          onClick={() => setGameMode('operation')}
          className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${gameMode === 'operation'
              ? 'bg-purple-600 text-white shadow-lg scale-105'
              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
        >
          Bir İşlem
        </button>
      </motion.div>

      <div className="flex-1 w-full flex items-center justify-center">
        <h1 className="sr-only">
          {gameMode === 'word' ? 'Kelime Bulma Oyunu' : 'Bir İşlem Oyunu'}
        </h1>

        <AnimatePresence mode="wait">
          {gameMode === 'word' ? (
            <motion.div
              key="word"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center"
            >
              <WordGame />
            </motion.div>
          ) : (
            <motion.div
              key="operation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center"
            >
              <OperationGame />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
