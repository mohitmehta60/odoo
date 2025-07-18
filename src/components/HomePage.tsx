import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, TrendingUp, Clock, MessageSquare, Sparkles, Star, Users } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import QuestionCard from './QuestionCard';
import EmptyState from './ui/EmptyState';
import SkeletonLoader from './ui/SkeletonLoader';
import AnimatedButton from './ui/AnimatedButton';
import { Question } from '../types';

const HomePage: React.FC<HomePageProps> = ({ onQuestionClick }) => {
  const { questions } = useData();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'votes' | 'views'>('newest');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          <div className="flex-1 min-w-0">
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4"
            >
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Questions
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm lg:text-base">
                  {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl pl-4 pr-12 py-2.5 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto"
                  >
                    <option value="newest">Newest</option>
                    <option value="votes">Most Votes</option>
                    <option value="views">Most Views</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value as any)}
                    className="appearance-none bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl pl-4 pr-12 py-2.5 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto"
                  >
                    <option value="all">All Questions</option>
                    <option value="unanswered">Unanswered</option>
                    <option value="answered">Answered</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* Questions List */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SkeletonLoader type="question" count={5} />
                </motion.div>
              ) : filteredQuestions.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EmptyState
                    type={questions.length === 0 ? 'questions' : 'search'}
                    actionButton={
                      user && questions.length === 0 ? (
                        <AnimatedButton
                          variant="primary"
                          onClick={() => window.location.href = '#ask'}
                        >
                          Ask the First Question
                        </AnimatedButton>
                      ) : undefined
                    }
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="questions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 lg:space-y-6"
                >
                  {filteredQuestions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <QuestionCard
                        question={question}
                        onClick={() => onQuestionClick(question)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full xl:w-80 space-y-6"
          >
            {/* Filter by Tags */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Filter className="h-4 w-4 text-white" />
                </div>
                Filter by Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTags.includes(tag)
                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-100/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-600/80'
                    }`}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTags([])}
                  className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Clear all filters
                </motion.button>
              )}
            </motion.div>

            {/* Statistics */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                Statistics
              </h3>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-blue-100/50 dark:border-blue-800/50"
                >
                  <span className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-blue-600" />
                    Total Questions
                  </span>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {questions.length}
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-100/50 dark:border-green-800/50"
                >
                  <span className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
                    <Star className="h-4 w-4 mr-2 text-green-600" />
                    Answered
                  </span>
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    {questions.filter(q => q.answers.length > 0).length}
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-100/50 dark:border-orange-800/50"
                >
                  <span className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-orange-600" />
                    Unanswered
                  </span>
                  <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                    {questions.filter(q => q.answers.length === 0).length}
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Popular Tags */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Users className="h-4 w-4 text-white" />
                </div>
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 8).map((tag) => (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Welcome Message for New Users */}
            {!user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border border-blue-200/50 dark:border-blue-800/50 rounded-3xl p-6 shadow-lg"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Join StackIt</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Sign up to ask questions, provide answers, and build your reputation in the community.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Ask unlimited questions</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Help others with answers</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span>Earn reputation points</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};