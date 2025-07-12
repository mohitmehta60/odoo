import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  type: 'question' | 'answer' | 'notification';
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type, count = 3 }) => {
  const skeletonVariants = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  const QuestionSkeleton = () => (
    <motion.div
      variants={skeletonVariants}
      initial="initial"
      animate="animate"
      transition={skeletonVariants.transition}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 lg:p-8 shadow-lg"
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-4 w-3/4"></div>
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-4/6"></div>
          </div>
          <div className="flex gap-2 mb-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-14"></div>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-center space-y-4">
          <div className="w-20 h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        </div>
      </div>
      <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="space-y-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>
    </motion.div>
  );

  const AnswerSkeleton = () => (
    <motion.div
      variants={skeletonVariants}
      initial="initial"
      animate="animate"
      transition={skeletonVariants.transition}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 lg:p-8 shadow-lg"
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="hidden lg:flex flex-col items-center space-y-4">
          <div className="w-20 h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-11/12"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-4/5"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-3/4"></div>
          </div>
          <div className="flex justify-end">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const NotificationSkeleton = () => (
    <motion.div
      variants={skeletonVariants}
      initial="initial"
      animate="animate"
      transition={skeletonVariants.transition}
      className="p-4 border-b border-gray-100/50 dark:border-gray-700/50"
    >
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    </motion.div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'question':
        return <QuestionSkeleton />;
      case 'answer':
        return <AnswerSkeleton />;
      case 'notification':
        return <NotificationSkeleton />;
      default:
        return <QuestionSkeleton />;
    }
  };

  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;