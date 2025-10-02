import { motion } from 'framer-motion';

interface LetterBoxProps {
  letter: string;
  revealed: boolean;
  index: number;
  isSuccess: boolean;
}

export const LetterBox = ({ letter, revealed, index, isSuccess }: LetterBoxProps) => {
  return (
    <motion.div
      initial={{ scale: 0, rotateY: 180 }}
      animate={{
        scale: 1,
        rotateY: revealed ? 0 : 180,
        backgroundColor: isSuccess ? '#10b981' : revealed ? '#3b82f6' : '#1f2937'
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 200
      }}
      className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg shadow-lg border-2 border-gray-700"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ delay: index * 0.1 + 0.3 }}
        className="text-2xl sm:text-3xl font-bold text-white"
      >
        {revealed ? letter : '?'}
      </motion.span>
    </motion.div>
  );
};
