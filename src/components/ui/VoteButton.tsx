import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface VoteButtonProps {
  direction: 'up' | 'down';
  onClick: () => void;
  active: boolean;
  disabled: boolean;
  count: number;
  layout?: 'vertical' | 'horizontal';
}

const VoteButton: React.FC<VoteButtonProps> = ({
  direction,
  onClick,
  active,
  disabled,
  count,
  layout = 'vertical'
}) => {
  const Icon = direction === 'up' ? ArrowUp : ArrowDown;
  
  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
  };

  const countVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.2, 1] },
    transition: { duration: 0.3 }
  };

  return (
    <div className={cn(
      "flex items-center",
      layout === 'vertical' ? 'flex-col space-y-2' : 'space-x-3'
    )}>
      <motion.button
        variants={buttonVariants}
        whileHover={disabled ? {} : "hover"}
        whileTap={disabled ? {} : "tap"}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "p-3 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
          active
            ? direction === 'up'
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-110 focus:ring-green-500'
              : 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg transform scale-110 focus:ring-red-500'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:scale-105 focus:ring-gray-500',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <Icon className="h-5 w-5" />
      </motion.button>
      
      {layout === 'vertical' && (
        <motion.span
          key={count}
          variants={countVariants}
          initial="initial"
          animate="animate"
          transition={countVariants.transition}
          className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          {count}
        </motion.span>
      )}
    </div>
  );
};

export default VoteButton;