import { motion } from 'framer-motion';
import { Video as LucideIcon } from 'lucide-react';

interface GameButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  variant?: 'primary' | 'secondary' | 'success';
  disabled?: boolean;
}

export const GameButton = ({
  onClick,
  icon: Icon,
  label,
  variant = 'primary',
  disabled = false
}: GameButtonProps) => {
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-700 hover:bg-gray-600',
    success: 'bg-green-600 hover:bg-green-700'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantStyles[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        px-6 py-3 rounded-lg font-semibold text-white shadow-lg
        flex items-center gap-2 transition-colors duration-200
      `}
    >
      <Icon size={20} />
      {label}
    </motion.button>
  );
};
