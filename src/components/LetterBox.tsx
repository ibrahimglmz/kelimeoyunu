import { motion } from 'framer-motion';

interface LetterBoxProps {
  letter: string;
  revealed: boolean;
  index: number;
  isSuccess: boolean;
  onClick: (index: number) => void;
  onLetterChange: (index: number, newLetter: string) => void;
  isActive: boolean;
  onBlur: (index: number, currentLetter: string) => void;
  isInvalid?: boolean;
  isCorrect?: boolean;
  shakeKey?: number; // Animasyonu tetiklemek için yeni prop
}

export const LetterBox = ({
  letter,
  revealed,
  index,
  isSuccess,
  onClick,
  onLetterChange,
  isActive,
  onBlur,
  isInvalid,
  isCorrect,
  shakeKey
}: LetterBoxProps) => {
  const handleClick = () => {
    if (!revealed) {
      onClick(index);
    }
  };

  return (
    <motion.div
      key={shakeKey} // Animasyonu tetiklemek için key ekliyoruz
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        rotateY: revealed ? 0 : 0, // Harfler ters dönmesin, sadece açığa çıktığında dönüş animasyonu olsun
        backgroundColor: isSuccess ? '#10b981' : revealed ? '#3b82f6' : '#1f2937'
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 200
      }}
      onClick={handleClick}
      className={`relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg shadow-lg border-2 ${isInvalid ? 'border-red-500 animate-shake' : isCorrect ? 'border-green-500' : 'border-gray-700'} ${!revealed ? 'cursor-pointer' : ''}`}
    >
      {!revealed ? (
        <input
          type="text"
          maxLength={1}
          value={letter === '?' ? '' : letter}
          className="absolute inset-0 w-full h-full bg-transparent text-2xl sm:text-3xl font-bold text-white text-center uppercase outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (!/[a-zA-Z]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            onLetterChange(index, e.target.value.toUpperCase());
          }}
          onBlur={(e) => onBlur(index, e.target.value.toUpperCase())}
          onClick={(e) => e.stopPropagation()} // Prevent triggering parent div's onClick
          autoFocus={isActive}
        />
      ) : (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="text-2xl sm:text-3xl font-bold text-white"
        >
          {revealed ? letter : ''}
        </motion.span>
      )}
    </motion.div>
  );
};
