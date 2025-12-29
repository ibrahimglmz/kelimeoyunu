import { motion } from 'framer-motion';

interface AlertMessageProps {
    show: boolean;
    message: string;
}

export const AlertMessage = ({ show, message }: AlertMessageProps) => {
    const isCloseGuess = message.includes('Kelimeyi bulmaya çok yaklaştın') || message.includes('Tebrikler!') || message.includes('Doğru cevap!');
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
