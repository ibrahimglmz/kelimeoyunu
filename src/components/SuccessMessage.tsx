import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface SuccessMessageProps {
  show: boolean;
}

export const SuccessMessage = ({ show }: SuccessMessageProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: -50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-6 rounded-2xl shadow-2xl z-50"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Trophy size={48} />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold">Tebrikler!</h2>
              <p className="text-lg mt-1">Kelimeyi doğru bildiniz! 🎉</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
