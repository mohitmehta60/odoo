@@ .. @@
 import React, { useState, useEffect } from 'react';
+import { motion, AnimatePresence } from 'framer-motion';
 import { formatDistanceToNow } from 'date-fns';
 import { ArrowLeft, ArrowUp, ArrowDown, User, Check, Eye, MessageSquare, Award, Clock, Star } from 'lucide-react';
 import { useAuth } from '../contexts/AuthContext';
 import { useData } from '../contexts/DataContext';
 import { Question, Answer } from '../types';
 import RichTextEditor from './RichTextEditor';
+import VoteButton from './ui/VoteButton';
+import AnimatedButton from './ui/AnimatedButton';
+import CommentSystem from './CommentSystem';
+import toast from 'react-hot-toast';

@@ .. @@
   const handleVote = (targetId: string, targetType: 'question' | 'answer', value: 1 | -1) => {
     if (!user) return;
     
+    toast.success(`Vote ${value > 0 ? 'up' : 'down'} recorded!`);
+    
     if (targetType === 'question') {
       voteOnQuestion(targetId, value);
     } else {
@@ .. @@
   const handleAcceptAnswer = (answerId: string) => {
     if (!user || user.id !== question.authorId) return;
+    
+    toast.success('Answer accepted!');
     acceptAnswer(question.id, answerId);
   };

@@ .. @@
   const handleSubmitAnswer = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!user || !answerContent.trim()) return;

     setIsSubmitting(true);
     try {
       addAnswer({
         content: answerContent,
         questionId: question.id,
         authorId: user.id,
         author: user
       });
+      toast.success('Answer submitted successfully!');
       setAnswerContent('');
     } catch (error) {
       console.error('Failed to submit answer:', error);
+      toast.error('Failed to submit answer. Please try again.');
     } finally {
       setIsSubmitting(false);
     }
@@ .. @@
   const questionVote = getUserVote(question.id, 'question');
   const isQuestionOwner = user?.id === question.authorId;

-  const VoteButton: React.FC<{ 
-    direction: 'up' | 'down'; 
-    onClick: () => void; 
-    active: boolean; 
-    disabled: boolean 
-  }> = ({ direction, onClick, active, disabled }) => (
-    <button
-      onClick={onClick}
-      disabled={disabled}
-      className={`p-3 rounded-2xl transition-all duration-300 ${
-        active
-          ? direction === 'up' 
-            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-110'
-            : 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg transform scale-110'
-          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900 hover:scale-105'
-      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
-    >
-      {direction === 'up' ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
-    </button>
-  );
+  // Mock comments data
+  const mockComments = [
+    {
+      id: '1',
+      content: 'Great question! I had the same issue.',
+      authorId: '2',
+      author: { id: '2', username: 'jane_smith', reputation: 3450 },
+      createdAt: new Date('2024-01-15T12:00:00Z'),
+      likes: 2,
+      replies: []
+    }
+  ];

   return (
-    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
+    <motion.div
+      initial={{ opacity: 0 }}
+      animate={{ opacity: 1 }}
+      transition={{ duration: 0.5 }}
+      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
+    >
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
         {/* Header */}
-        <div className="mb-8">
-          <button
+        <motion.div
+          initial={{ y: -20, opacity: 0 }}
+          animate={{ y: 0, opacity: 1 }}
+          className="mb-8"
+        >
+          <AnimatedButton
+            variant="secondary"
             onClick={onBack}
-            className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-2xl border border-gray-200/50 hover:bg-white/95 transition-all duration-300 shadow-sm hover:shadow-md"
+            className="mb-6"
           >
             <ArrowLeft className="h-5 w-5 mr-2" />
             Back to Questions
-          </button>
-        </div>
+          </AnimatedButton>
+        </motion.div>

         {/* Question */}
-        <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-6 lg:p-8 mb-8 shadow-2xl">
+        <motion.div
+          initial={{ y: 20, opacity: 0 }}
+          animate={{ y: 0, opacity: 1 }}
+          transition={{ delay: 0.1 }}
+          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 lg:p-8 mb-8 shadow-2xl"
+        >
           <div className="flex flex-col lg:flex-row lg:items-start gap-6">
             {/* Voting - Desktop */}
-            <div className="hidden lg:flex flex-col items-center space-y-4 bg-gray-50/80 rounded-3xl p-6 shadow-sm border border-gray-200/50">
+            <div className="hidden lg:flex flex-col items-center space-y-4 bg-gray-50/80 dark:bg-gray-800/80 rounded-3xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
               <VoteButton
                 direction="up"
                 onClick={() => handleVote(question.id, 'question', 1)}
                 active={questionVote?.value === 1}
                 disabled={!user}
-              />
-              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
-                {question.votes}
-              </span>
-              <VoteButton
+                count={question.votes}
+                layout="vertical"
+              />
+              <VoteButton
                 direction="down"
                 onClick={() => handleVote(question.id, 'question', -1)}
                 active={questionVote?.value === -1}
                 disabled={!user}
+                count={0}
+                layout="vertical"
               />
             </div>

             {/* Content */}
             <div className="flex-1 min-w-0">
-              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight">{question.title}</h1>
+              <motion.h1
+                initial={{ y: -10, opacity: 0 }}
+                animate={{ y: 0, opacity: 1 }}
+                transition={{ delay: 0.2 }}
+                className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
+              >
+                {question.title}
+              </motion.h1>
               
-              <div 
-                className="prose prose-lg max-w-none text-gray-700 mb-8 leading-relaxed"
+              <motion.div
+                initial={{ y: 10, opacity: 0 }}
+                animate={{ y: 0, opacity: 1 }}
+                transition={{ delay: 0.3 }}
+                className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
                 dangerouslySetInnerHTML={{ __html: question.description }}
               />

-              <div className="flex flex-wrap gap-2 mb-8">
+              <motion.div
+                initial={{ y: 10, opacity: 0 }}
+                animate={{ y: 0, opacity: 1 }}
+                transition={{ delay: 0.4 }}
+                className="flex flex-wrap gap-2 mb-8"
+              >
                 {question.tags.map((tag) => (
-                  <span
+                  <motion.span
+                    whileHover={{ scale: 1.05 }}
                     key={tag}
-                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-blue-800 border border-blue-200 hover:from-blue-200 hover:via-purple-200 hover:to-pink-200 transition-all duration-300 shadow-sm"
+                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700 hover:from-blue-200 hover:via-purple-200 hover:to-pink-200 dark:hover:from-blue-800/40 dark:hover:via-purple-800/40 dark:hover:to-pink-800/40 transition-all duration-300 shadow-sm"
                   >
                     {tag}
-                  </span>
+                  </motion.span>
                 ))}
-              </div>
+              </motion.div>

               {/* Mobile Voting */}
-              <div className="lg:hidden flex items-center justify-center space-x-6 mb-8 bg-gray-50/80 rounded-2xl p-4">
+              <div className="lg:hidden flex items-center justify-center space-x-6 mb-8 bg-gray-50/80 dark:bg-gray-800/80 rounded-2xl p-4">
                 <VoteButton
                   direction="up"
                   onClick={() => handleVote(question.id, 'question', 1)}
                   active={questionVote?.value === 1}
                   disabled={!user}
-                />
-                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
-                  {question.votes}
-                </span>
-                <VoteButton
+                  count={question.votes}
+                  layout="horizontal"
+                />
+                <VoteButton
                   direction="down"
                   onClick={() => handleVote(question.id, 'question', -1)}
                   active={questionVote?.value === -1}
                   disabled={!user}
+                  count={0}
+                  layout="horizontal"
                 />
               </div>

-              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
-                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
-                  <div className="flex items-center space-x-2 bg-gray-100/80 px-3 py-2 rounded-full">
+              <motion.div
+                initial={{ y: 10, opacity: 0 }}
+                animate={{ y: 0, opacity: 1 }}
+                transition={{ delay: 0.5 }}
+                className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
+              >
+                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
+                  <div className="flex items-center space-x-2 bg-gray-100/80 dark:bg-gray-700/80 px-3 py-2 rounded-full">
                     <Eye className="h-4 w-4" />
                     <span>{question.views} views</span>
                   </div>
-                  <div className="flex items-center space-x-2 bg-gray-100/80 px-3 py-2 rounded-full">
+                  <div className="flex items-center space-x-2 bg-gray-100/80 dark:bg-gray-700/80 px-3 py-2 rounded-full">
                     <MessageSquare className="h-4 w-4" />
                     <span>{question.answers.length} answers</span>
                   </div>
-                  <div className="flex items-center space-x-2 bg-gray-100/80 px-3 py-2 rounded-full">
+                  <div className="flex items-center space-x-2 bg-gray-100/80 dark:bg-gray-700/80 px-3 py-2 rounded-full">
                     <Clock className="h-4 w-4" />
                     <span>{formatDistanceToNow(question.createdAt, { addSuffix: true })}</span>
                   </div>
                 </div>
                 
-                <div className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-4 py-3 border border-gray-200/50">
+                <div className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl px-4 py-3 border border-gray-200/50 dark:border-gray-600/50">
                   <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                     <User className="h-5 w-5 text-white" />
                   </div>
                   <div className="flex flex-col">
-                    <span className="font-semibold text-gray-900">{question.author.username}</span>
-                    <div className="flex items-center space-x-1 text-sm text-gray-500">
+                    <span className="font-semibold text-gray-900 dark:text-white">{question.author.username}</span>
+                    <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                       <Award className="h-3 w-3" />
                       <span>{question.author.reputation} reputation</span>
                     </div>
                   </div>
                 </div>
-              </div>
+              </motion.div>
             </div>
           </div>
-        </div>
+          
+          {/* Comments for Question */}
+          <CommentSystem
+            targetId={question.id}
+            targetType="question"
+            comments={mockComments}
+            onAddComment={(content, parentId) => {
+              toast.success('Comment added!');
+              console.log('Add comment:', content, parentId);
+            }}
+            onLikeComment={(commentId) => {
+              toast.success('Comment liked!');
+              console.log('Like comment:', commentId);
+            }}
+          />
+        </motion.div>

         {/* Answers */}
-        <div className="mb-8">
-          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
+        <motion.div
+          initial={{ y: 20, opacity: 0 }}
+          animate={{ y: 0, opacity: 1 }}
+          transition={{ delay: 0.6 }}
+          className="mb-8"
+        >
+          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
             <Star className="h-6 w-6 mr-2 text-yellow-500" />
             {question.answers.length} Answer{question.answers.length !== 1 ? 's' : ''}
           </h2>

-          <div className="space-y-6">
+          <AnimatePresence>
             {question.answers
               .sort((a, b) => {
                 if (a.isAccepted && !b.isAccepted) return -1;
@@ -1,7 +1,7 @@
                 return b.votes - a.votes;
               })
-              .map((answer) => {
+              .map((answer, index) => {
                 const answerVote = getUserVote(answer.id, 'answer');
                 
                 return (
-                  <div
+                  <motion.div
+                    key={answer.id}
+                    initial={{ opacity: 0, y: 20 }}
+                    animate={{ opacity: 1, y: 0 }}
+                    transition={{ delay: 0.7 + index * 0.1 }}
+                    className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border rounded-3xl p-6 lg:p-8 shadow-2xl transition-all duration-300 ${
+                      answer.isAccepted 
+                        ? 'border-green-300 dark:border-green-600 bg-gradient-to-r from-green-50/50 via-emerald-50/50 to-green-50/50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-green-900/20' 
+                        : 'border-gray-200/50 dark:border-gray-700/50'
+                    }`}
+                  >
+                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
+                      {/* Voting - Desktop */}
+                      <div className="hidden lg:flex flex-col items-center space-y-4 bg-gray-50/80 dark:bg-gray-800/80 rounded-3xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
+                        <VoteButton
+                          direction="up"
+                          onClick={() => handleVote(answer.id, 'answer', 1)}
+                          active={answerVote?.value === 1}
+                          disabled={!user}
+                          count={answer.votes}
+                          layout="vertical"
+                        />
+                        <VoteButton
+                          direction="down"
+                          onClick={() => handleVote(answer.id, 'answer', -1)}
+                          active={answerVote?.value === -1}
+                          disabled={!user}
+                          count={0}
+                          layout="vertical"
+                        />
+                        
+                        {/* Accept Answer Button */}
+                        {isQuestionOwner && !question.acceptedAnswerId && (
+                          <motion.button
+                            whileHover={{ scale: 1.1 }}
+                            whileTap={{ scale: 0.9 }}
+                            onClick={() => handleAcceptAnswer(answer.id)}
+                            className="p-3 rounded-2xl hover:bg-green-100 dark:hover:bg-green-900/20 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600"
+                            title="Accept this answer"
+                          >
+                            <Check className="h-5 w-5" />
+                          </motion.button>
+                        )}
+                        
+                        {answer.isAccepted && (
+                          <motion.div
+                            initial={{ scale: 0 }}
+                            animate={{ scale: 1 }}
+                            className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
+                          >
+                            <Check className="h-5 w-5" />
+                          </motion.div>
+                        )}
+                      </div>

+                      {/* Content */}
+                      <div className="flex-1 min-w-0">
+                        {answer.isAccepted && (
+                          <motion.div
+                            initial={{ opacity: 0, x: -20 }}
+                            animate={{ opacity: 1, x: 0 }}
+                            className="flex items-center mb-4 text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-2xl border border-green-200 dark:border-green-700"
+                          >
+                            <Check className="h-4 w-4 mr-2" />
+                            Accepted Answer
+                          </motion.div>
+                        )}

+                        {/* Mobile Voting */}
+                        <div className="lg:hidden flex items-center justify-between mb-6">
+                          <div className="flex items-center space-x-4">
+                            <VoteButton
+                              direction="up"
+                              onClick={() => handleVote(answer.id, 'answer', 1)}
+                              active={answerVote?.value === 1}
+                              disabled={!user}
+                              count={answer.votes}
+                              layout="horizontal"
+                            />
+                            <VoteButton
+                              direction="down"
+                              onClick={() => handleVote(answer.id, 'answer', -1)}
+                              active={answerVote?.value === -1}
+                              disabled={!user}
+                              count={0}
+                              layout="horizontal"
+                            />
+                          </div>
+                          
+                          {isQuestionOwner && !question.acceptedAnswerId && (
+                            <AnimatedButton
+                              variant="ghost"
+                              size="sm"
+                              onClick={() => handleAcceptAnswer(answer.id)}
+                            >
+                              <Check className="h-4 w-4 mr-1" />
+                              Accept
+                            </AnimatedButton>
+                          )}
+                        </div>
+                        
+                        <div 
+                          className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
+                          dangerouslySetInnerHTML={{ __html: answer.content }}
+                        />

+                        <div className="flex items-center justify-end">
+                          <div className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl px-4 py-3 border border-gray-200/50 dark:border-gray-600/50">
+                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
+                              <User className="h-4 w-4 text-white" />
+                            </div>
+                            <div className="flex flex-col">
+                              <span className="font-semibold text-gray-900 dark:text-white text-sm">{answer.author.username}</span>
+                              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
+                                <Award className="h-3 w-3" />
+                                <span>{answer.author.reputation} rep</span>
+                                <span>•</span>
+                                <span>{formatDistanceToNow(answer.createdAt, { addSuffix: true })}</span>
+                              </div>
+                            </div>
+                          </div>
+                        </div>
+                        
+                        {/* Comments for Answer */}
+                        <CommentSystem
+                          targetId={answer.id}
+                          targetType="answer"
+                          comments={[]}
+                          onAddComment={(content, parentId) => {
+                            toast.success('Comment added!');
+                            console.log('Add comment:', content, parentId);
+                          }}
+                          onLikeComment={(commentId) => {
+                            toast.success('Comment liked!');
+                            console.log('Like comment:', commentId);
+                          }}
+                        />
+                      </div>
+                    </div>
+                  </motion.div>
                 );
               })}
-          </div>
-        </div>
+          </AnimatePresence>
+        </motion.div>

         {/* Answer Form */}
         {user ? (
-          <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-6 lg:p-8 shadow-2xl">
-            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
+          <motion.div
+            initial={{ y: 20, opacity: 0 }}
+            animate={{ y: 0, opacity: 1 }}
+            transition={{ delay: 0.8 }}
+            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 lg:p-8 shadow-2xl"
+          >
+            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
               <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
               Your Answer
             </h3>
@@ .. @@
               </div>
               <div className="flex justify-end">
-                <button
-                  type="submit"
+                <AnimatedButton
+                  type="submit"
+                  variant="primary"
                   disabled={isSubmitting || !answerContent.trim()}
-                  className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:from-blue-400 disabled:via-purple-400 disabled:to-pink-400 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
+                  isLoading={isSubmitting}
                 >
-                  {isSubmitting ? (
-                    <div className="flex items-center space-x-2">
-                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
-                      <span>Submitting...</span>
-                    </div>
-                  ) : (
-                    'Submit Answer'
-                  )}
-                </button>
+                  Submit Answer
+                </AnimatedButton>
               </div>
             </form>
-          </div>
+          </motion.div>
         ) : (
-          <div className="bg-gradient-to-r from-gray-50 via-blue-50 to-purple-50 border border-gray-200/50 rounded-3xl p-8 text-center shadow-2xl">
+          <motion.div
+            initial={{ y: 20, opacity: 0 }}
+            animate={{ y: 0, opacity: 1 }}
+            transition={{ delay: 0.8 }}
+            className="bg-gradient-to-r from-gray-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 text-center shadow-2xl"
+          >
             <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
               <User className="h-8 w-8 text-white" />
             </div>
-            <p className="text-gray-600 text-lg mb-4">Please sign in to submit an answer.</p>
-            <p className="text-gray-500 text-sm">Join our community to help others and share your knowledge.</p>
-          </div>
+            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">Please sign in to submit an answer.</p>
+            <p className="text-gray-500 dark:text-gray-500 text-sm">Join our community to help others and share your knowledge.</p>
+          </motion.div>
         )}
       </div>
-    </div>
+    </motion.div>
   );
 };