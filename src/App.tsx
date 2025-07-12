import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AskQuestionPage from './components/AskQuestionPage';
import QuestionDetailPage from './components/QuestionDetailPage';
import AdminPanel from './components/AdminPanel';
import Toast from './components/ui/Toast';
import { Question } from './types';
import { useAuth } from './contexts/AuthContext';

type PageType = 'home' | 'ask' | 'question';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const handleHome = () => {
    setCurrentPage('home');
    setSelectedQuestion(null);
  };

  const handleAskQuestion = () => {
    setCurrentPage('ask');
  };

  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion(question);
    setCurrentPage('question');
  };

  const renderPage = () => {
    const pageVariants = {
      initial: { opacity: 0, x: 20 },
      in: { opacity: 1, x: 0 },
      out: { opacity: 0, x: -20 }
    };

    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.4
    };

    switch (currentPage) {
      case 'ask':
        return (
          <motion.div
            key="ask"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AskQuestionPage onBack={handleHome} />
          </motion.div>
        );
      case 'question':
        return selectedQuestion ? (
          <motion.div
            key="question"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <QuestionDetailPage question={selectedQuestion} onBack={handleHome} />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <HomePage onQuestionClick={handleQuestionClick} />
          </motion.div>
        );
      case 'home':
      default:
        return (
          <motion.div
            key="home"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <HomePage onQuestionClick={handleQuestionClick} />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <Header onAskQuestion={handleAskQuestion} onHome={handleHome} />
      <main>
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
        
        {/* Admin Panel for admin users */}
        {user?.role === 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            <AdminPanel />
          </motion.div>
        )}
      </main>
      <Toast />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;