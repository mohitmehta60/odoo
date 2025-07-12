import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, MessageSquare, BarChart3, Download, Ban, Trash2, Megaphone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import AnimatedButton from './ui/AnimatedButton';
import Modal from './ui/Modal';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const { questions } = useData();
  const [showBanModal, setShowBanModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [banReason, setBanReason] = useState('');
  const [announcement, setAnnouncement] = useState('');

  if (!user || user.role !== 'admin') {
    return null;
  }

  const stats = {
    totalQuestions: questions.length,
    totalAnswers: questions.reduce((acc, q) => acc + q.answers.length, 0),
    totalUsers: 150, // Mock data
    activeUsers: 45 // Mock data
  };

  const chartData = [
    { name: 'Jan', questions: 12, answers: 24 },
    { name: 'Feb', questions: 19, answers: 35 },
    { name: 'Mar', questions: 15, answers: 28 },
    { name: 'Apr', questions: 22, answers: 41 },
    { name: 'May', questions: 18, answers: 33 },
    { name: 'Jun', questions: 25, answers: 47 }
  ];

  const pieData = [
    { name: 'Answered', value: stats.totalAnswers, color: '#10b981' },
    { name: 'Unanswered', value: stats.totalQuestions - stats.totalAnswers, color: '#f59e0b' }
  ];

  const handleBanUser = () => {
    if (!selectedUser || !banReason.trim()) return;
    
    toast.success(`User ${selectedUser} has been banned: ${banReason}`);
    setShowBanModal(false);
    setSelectedUser('');
    setBanReason('');
  };

  const handleSendAnnouncement = () => {
    if (!announcement.trim()) return;
    
    toast.success('Announcement sent to all users!');
    setShowAnnouncementModal(false);
    setAnnouncement('');
  };

  const exportData = (type: 'questions' | 'users') => {
    toast.success(`${type} data exported successfully!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 lg:p-8 shadow-2xl"
    >
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mr-4">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage platform content and users</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Questions</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.totalQuestions}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">Total Answers</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.totalAnswers}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stats.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-6 border border-orange-200/50 dark:border-orange-700/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">Active Users</p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{stats.activeUsers}</p>
            </div>
            <Users className="h-8 w-8 text-orange-500" />
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="questions" fill="#3b82f6" />
              <Bar dataKey="answers" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Question Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedButton
          variant="danger"
          onClick={() => setShowBanModal(true)}
          className="w-full"
        >
          <Ban className="h-4 w-4 mr-2" />
          Ban User
        </AnimatedButton>

        <AnimatedButton
          variant="secondary"
          onClick={() => toast.success('Spam content deleted!')}
          className="w-full"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Spam
        </AnimatedButton>

        <AnimatedButton
          variant="primary"
          onClick={() => setShowAnnouncementModal(true)}
          className="w-full"
        >
          <Megaphone className="h-4 w-4 mr-2" />
          Send Announcement
        </AnimatedButton>

        <AnimatedButton
          variant="secondary"
          onClick={() => exportData('questions')}
          className="w-full"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </AnimatedButton>
      </div>

      {/* Ban User Modal */}
      <Modal
        isOpen={showBanModal}
        onClose={() => setShowBanModal(false)}
        title="Ban User"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              placeholder="Enter username to ban"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reason
            </label>
            <textarea
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="Enter reason for ban"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <AnimatedButton
              variant="secondary"
              onClick={() => setShowBanModal(false)}
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton
              variant="danger"
              onClick={handleBanUser}
              disabled={!selectedUser || !banReason.trim()}
            >
              Ban User
            </AnimatedButton>
          </div>
        </div>
      </Modal>

      {/* Announcement Modal */}
      <Modal
        isOpen={showAnnouncementModal}
        onClose={() => setShowAnnouncementModal(false)}
        title="Send Platform Announcement"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Announcement Message
            </label>
            <textarea
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="Enter your announcement message"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <AnimatedButton
              variant="secondary"
              onClick={() => setShowAnnouncementModal(false)}
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton
              variant="primary"
              onClick={handleSendAnnouncement}
              disabled={!announcement.trim()}
            >
              Send Announcement
            </AnimatedButton>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default AdminPanel;