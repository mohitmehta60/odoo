import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bell, Users, Search, HelpCircle } from 'lucide-react';

interface EmptyStateProps {
  type: 'questions' | 'answers' | 'notifications' | 'search' | 'comments';
  title?: string;
  description?: string;
  actionButton?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, title, description, actionButton }) => {
  const getEmptyStateConfig = () => {
    switch (type) {
      case 'questions':
        return {
          icon: MessageSquare,
          title: title || 'No questions yet!',
          description: description || 'Be the first to ask a question and start the conversation.',
          gradient: 'from-blue-400 to-purple-500'
        };
      case 'answers':
        return {
          icon: HelpCircle,
          title: title || 'No answers yet',
          description: description || 'Be the first to help by providing an answer.',
          gradient: 'from-green-400 to-emerald-500'
        };
      case 'notifications':
        return {
          icon: Bell,
          title: title || 'No notifications yet',
          description: description || "We'll notify you when something happens.",
          gradient: 'from-yellow-400 to-orange-500'
        };
      case 'search':
        return {
          icon: Search,
          title: title || 'No results found',
          description: description || 'Try adjusting your search criteria or clearing the filters.',
          gradient: 'from-purple-400 to-pink-500'
        };
      case 'comments':
        return {
          icon: Users,
          title: title || 'No comments yet',
          description: description || 'Start the discussion by adding a comment.',
          gradient: 'from-indigo-400 to-blue-500'
        };
      default:
        return {
          icon: MessageSquare,
          title: title || 'Nothing here yet',
          description: description || 'Content will appear here when available.',
          gradient: 'from-gray-400 to-gray-500'
        };
    }
  };

  const config = getEmptyStateConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12 lg:py-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className={`w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r ${config.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
      >
        <Icon className="h-10 w-10 lg:h-12 lg:w-12 text-white" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-md mx-auto"
      >
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {config.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base mb-6 leading-relaxed">
          {config.description}
        </p>
        
        {actionButton && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {actionButton}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;