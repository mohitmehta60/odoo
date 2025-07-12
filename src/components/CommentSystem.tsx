import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Reply, User, Heart, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AnimatedButton from './ui/AnimatedButton';

interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: {
    id: string;
    username: string;
    reputation: number;
  };
  createdAt: Date;
  likes: number;
  replies: Comment[];
  parentId?: string;
}

interface CommentSystemProps {
  targetId: string;
  targetType: 'question' | 'answer';
  comments: Comment[];
  onAddComment: (content: string, parentId?: string) => void;
  onLikeComment: (commentId: string) => void;
}

const CommentSystem: React.FC<CommentSystemProps> = ({
  targetId,
  targetType,
  comments,
  onAddComment,
  onLikeComment
}) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    
    onAddComment(newComment);
    setNewComment('');
  };

  const handleSubmitReply = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyContent.trim() || !user) return;
    
    onAddComment(replyContent, parentId);
    setReplyContent('');
    setReplyingTo(null);
  };

  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${isReply ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}
    >
      <div className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-white text-sm">
                {comment.author.username}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                {comment.author.reputation} rep
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
          </span>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 leading-relaxed">
          {comment.content}
        </p>
        
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onLikeComment(comment.id)}
            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <Heart className="h-4 w-4" />
            <span className="text-xs">{comment.likes}</span>
          </motion.button>
          
          {!isReply && user && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <Reply className="h-4 w-4" />
              <span className="text-xs">Reply</span>
            </motion.button>
          )}
        </div>
        
        <AnimatePresence>
          {replyingTo === comment.id && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={(e) => handleSubmitReply(e, comment.id)}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                rows={2}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <AnimatedButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!replyContent.trim()}
                >
                  Reply
                </AnimatedButton>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
      
      {comment.replies.length > 0 && (
        <div className="mt-4 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
          Comments ({comments.length})
        </h4>
        
        {comments.length > 0 && (
          <AnimatedButton
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? 'Hide' : 'Show'} Comments
          </AnimatedButton>
        )}
      </div>
      
      {user && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmitComment}
          className="mb-6"
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-3 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 resize-none backdrop-blur-sm"
            rows={3}
          />
          <div className="flex justify-end mt-3">
            <AnimatedButton
              type="submit"
              variant="primary"
              size="sm"
              disabled={!newComment.trim()}
            >
              Add Comment
            </AnimatedButton>
          </div>
        </motion.form>
      )}
      
      <AnimatePresence>
        {(showComments || comments.length === 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No comments yet. Be the first to start the discussion!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommentSystem;