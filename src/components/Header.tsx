@@ .. @@
 import React, { useState } from 'react';
-import { Bell, User, LogOut, Search, Sparkles, Menu, X } from 'lucide-react';
+import { Bell, User, LogOut, Search, Sparkles, Menu, X, Moon, Sun } from 'lucide-react';
+import { motion, AnimatePresence } from 'framer-motion';
 import { useAuth } from '../contexts/AuthContext';
+import { useTheme } from '../contexts/ThemeContext';
 import { useData } from '../contexts/DataContext';
 import NotificationDropdown from './NotificationDropdown';
 import AuthModal from './AuthModal';
+import AnimatedButton from './ui/AnimatedButton';

@@ .. @@
 const Header: React.FC<HeaderProps> = ({ onAskQuestion, onHome }) => {
   const { user, logout } = useAuth();
+  const { isDark, toggleTheme } = useTheme();
   const { getUnreadNotificationCount } = useData();
@@ .. @@
   return (
     <>
-      <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
+      <motion.header
+        initial={{ y: -100 }}
+        animate={{ y: 0 }}
+        transition={{ type: "spring", stiffness: 300, damping: 30 }}
+        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-lg transition-colors duration-500"
+      >
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
@@ .. @@
             {/* Logo */}
             <div className="flex items-center">
-              <button
+              <motion.button
+                whileHover={{ scale: 1.05 }}
+                whileTap={{ scale: 0.95 }}
                 onClick={onHome}
-                className="flex items-center space-x-2 text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300"
+                className="flex items-center space-x-2 text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300"
               >
-                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
+                <motion.div
+                  whileHover={{ rotate: 180 }}
+                  transition={{ duration: 0.3 }}
+                  className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
+                >
                   <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
-                </div>
+                </motion.div>
                 <span className="hidden sm:block">StackIt</span>
-              </button>
+              </motion.button>
             </div>

@@ .. @@
                   <input
                     type="text"
                     placeholder="Search questions, tags, or users..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
-                    className="block w-full pl-12 pr-4 py-3 bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl leading-5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white/90 transition-all duration-300"
+                    className="block w-full pl-12 pr-4 py-3 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl leading-5 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white/90 dark:focus:bg-gray-700/90 transition-all duration-300"
                   />
                 </form>
               </div>

             {/* Desktop Right side */}
             <div className="hidden md:flex items-center space-x-3">
+              {/* Theme Toggle */}
+              <motion.button
+                whileHover={{ scale: 1.1 }}
+                whileTap={{ scale: 0.9 }}
+                onClick={toggleTheme}
+                className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-2xl transition-all duration-300"
+              >
+                <AnimatePresence mode="wait">
+                  {isDark ? (
+                    <motion.div
+                      key="sun"
+                      initial={{ rotate: -90, opacity: 0 }}
+                      animate={{ rotate: 0, opacity: 1 }}
+                      exit={{ rotate: 90, opacity: 0 }}
+                      transition={{ duration: 0.2 }}
+                    >
+                      <Sun className="h-5 w-5" />
+                    </motion.div>
+                  ) : (
+                    <motion.div
+                      key="moon"
+                      initial={{ rotate: 90, opacity: 0 }}
+                      animate={{ rotate: 0, opacity: 1 }}
+                      exit={{ rotate: -90, opacity: 0 }}
+                      transition={{ duration: 0.2 }}
+                    >
+                      <Moon className="h-5 w-5" />
+                    </motion.div>
+                  )}
+                </AnimatePresence>
+              </motion.button>
+
               {user ? (
                 <>
                   {/* Ask Question Button */}
-                  <button
+                  <AnimatedButton
+                    variant="primary"
                     onClick={onAskQuestion}
-                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                   >
                     Ask Question
-                  </button>
+                  </AnimatedButton>

                   {/* Notifications */}
                   <div className="relative">
-                    <button
+                    <motion.button
+                      whileHover={{ scale: 1.1 }}
+                      whileTap={{ scale: 0.9 }}
                       onClick={() => setShowNotifications(!showNotifications)}
-                      className="relative p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-2xl transition-all duration-300"
+                      className="relative p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-2xl transition-all duration-300"
                     >
                       <Bell className="h-5 w-5" />
                       {unreadCount > 0 && (
-                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">
+                        <motion.span
+                          initial={{ scale: 0 }}
+                          animate={{ scale: 1 }}
+                          className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"
+                        >
+                          <motion.span
+                            animate={{ scale: [1, 1.2, 1] }}
+                            transition={{ duration: 2, repeat: Infinity }}
+                          >
                           {unreadCount > 9 ? '9+' : unreadCount}
-                        </span>
+                          </motion.span>
+                        </motion.span>
                       )}
-                    </button>
-                    {showNotifications && (
+                    </motion.button>
+                    <AnimatePresence>
+                      {showNotifications && (
                       <NotificationDropdown onClose={() => setShowNotifications(false)} />
-                    )}
+                      )}
+                    </AnimatePresence>
                   </div>

                   {/* User Menu */}
-                  <div className="flex items-center space-x-3 bg-gray-50/80 backdrop-blur-sm rounded-2xl px-4 py-2 border border-gray-200/50">
+                  <motion.div
+                    whileHover={{ scale: 1.02 }}
+                    className="flex items-center space-x-3 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl px-4 py-2 border border-gray-200/50 dark:border-gray-700/50"
+                  >
                     <div className="flex items-center space-x-2 text-sm">
                       <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                         <User className="h-4 w-4 text-white" />
                       </div>
                       <div className="flex flex-col">
-                        <span className="text-gray-900 font-semibold">{user.username}</span>
-                        <span className="text-gray-500 text-xs">{user.reputation} rep</span>
+                        <span className="text-gray-900 dark:text-white font-semibold">{user.username}</span>
+                        <span className="text-gray-500 dark:text-gray-400 text-xs">{user.reputation} rep</span>
                       </div>
                     </div>
-                    <button
+                    <motion.button
+                      whileHover={{ scale: 1.1 }}
+                      whileTap={{ scale: 0.9 }}
                       onClick={logout}
-                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
+                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300"
                       title="Logout"
                     >
                       <LogOut className="h-4 w-4" />
-                    </button>
-                  </div>
+                    </motion.button>
+                  </motion.div>
                 </>
               ) : (
-                <button
+                <AnimatedButton
+                  variant="primary"
                   onClick={() => setShowAuthModal(true)}
-                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                 >
                   Sign In
-                </button>
+                </AnimatedButton>
               )}
             </div>

             {/* Mobile menu button */}
             <div className="md:hidden flex items-center space-x-2">
+              {/* Mobile Theme Toggle */}
+              <motion.button
+                whileHover={{ scale: 1.1 }}
+                whileTap={{ scale: 0.9 }}
+                onClick={toggleTheme}
+                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-300"
+              >
+                <AnimatePresence mode="wait">
+                  {isDark ? (
+                    <motion.div
+                      key="sun"
+                      initial={{ rotate: -90, opacity: 0 }}
+                      animate={{ rotate: 0, opacity: 1 }}
+                      exit={{ rotate: 90, opacity: 0 }}
+                      transition={{ duration: 0.2 }}
+                    >
+                      <Sun className="h-5 w-5" />
+                    </motion.div>
+                  ) : (
+                    <motion.div
+                      key="moon"
+                      initial={{ rotate: 90, opacity: 0 }}
+                      animate={{ rotate: 0, opacity: 1 }}
+                      exit={{ rotate: -90, opacity: 0 }}
+                      transition={{ duration: 0.2 }}
+                    >
+                      <Moon className="h-5 w-5" />
+                    </motion.div>
+                  )}
+                </AnimatePresence>
+              </motion.button>
+
               {user && (
                 <div className="relative">
-                  <button
+                  <motion.button
+                    whileHover={{ scale: 1.1 }}
+                    whileTap={{ scale: 0.9 }}
                     onClick={() => setShowNotifications(!showNotifications)}
-                    className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-xl transition-all duration-300"
+                    className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-300"
                   >
                     <Bell className="h-5 w-5" />
                     {unreadCount > 0 && (
-                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">
+                      <motion.span
+                        initial={{ scale: 0 }}
+                        animate={{ scale: 1 }}
+                        className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"
+                      >
+                        <motion.span
+                          animate={{ scale: [1, 1.2, 1] }}
+                          transition={{ duration: 2, repeat: Infinity }}
+                        >
                         {unreadCount > 9 ? '9+' : unreadCount}
-                      </span>
+                        </motion.span>
+                      </motion.span>
                     )}
-                  </button>
-                  {showNotifications && (
+                  </motion.button>
+                  <AnimatePresence>
+                    {showNotifications && (
                     <NotificationDropdown onClose={() => setShowNotifications(false)} />
-                  )}
+                    )}
+                  </AnimatePresence>
                 </div>
               )}
-              <button
+              <motion.button
+                whileHover={{ scale: 1.1 }}
+                whileTap={{ scale: 0.9 }}
                 onClick={() => setShowMobileMenu(!showMobileMenu)}
-                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-xl transition-all duration-300"
+                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-300"
               >
-                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
-              </button>
+                <AnimatePresence mode="wait">
+                  {showMobileMenu ? (
+                    <motion.div
+                      key="close"
+                      initial={{ rotate: -90, opacity: 0 }}
+                      animate={{ rotate: 0, opacity: 1 }}
+                      exit={{ rotate: 90, opacity: 0 }}
+                      transition={{ duration: 0.2 }}
+                    >
+                      <X className="h-6 w-6" />
+                    </motion.div>
+                  ) : (
+                    <motion.div
+                      key="menu"
+                      initial={{ rotate: 90, opacity: 0 }}
+                      animate={{ rotate: 0, opacity: 1 }}
+                      exit={{ rotate: -90, opacity: 0 }}
+                      transition={{ duration: 0.2 }}
+                    >
+                      <Menu className="h-6 w-6" />
+                    </motion.div>
+                  )}
+                </AnimatePresence>
+              </motion.button>
             </div>
           </div>

           {/* Mobile Menu */}
-          {showMobileMenu && (
-            <div className="md:hidden border-t border-gray-200/50 py-4 space-y-4 bg-white/95 backdrop-blur-xl">
+          <AnimatePresence>
+            {showMobileMenu && (
+              <motion.div
+                initial={{ opacity: 0, height: 0 }}
+                animate={{ opacity: 1, height: 'auto' }}
+                exit={{ opacity: 0, height: 0 }}
+                transition={{ duration: 0.3 }}
+                className="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 py-4 space-y-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"
+              >
               {/* Mobile Search */}
               <form onSubmit={handleSearch} className="relative">
@@ .. @@
                 <input
                   type="text"
                   placeholder="Search questions..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
-                  className="block w-full pl-12 pr-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
+                  className="block w-full pl-12 pr-4 py-3 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                 />
               </form>

               {user ? (
                 <div className="space-y-3">
-                  <button
+                  <AnimatedButton
+                    variant="primary"
                     onClick={() => {
                       onAskQuestion();
                       setShowMobileMenu(false);
                     }}
-                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300"
+                    className="w-full"
                   >
                     Ask Question
-                  </button>
+                  </AnimatedButton>
                   
-                  <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-2xl">
+                  <div className="flex items-center justify-between p-3 bg-gray-50/80 dark:bg-gray-800/80 rounded-2xl">
                     <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                         <User className="h-5 w-5 text-white" />
                       </div>
                       <div>
-                        <div className="font-semibold text-gray-900">{user.username}</div>
-                        <div className="text-sm text-gray-500">{user.reputation} reputation</div>
+                        <div className="font-semibold text-gray-900 dark:text-white">{user.username}</div>
+                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.reputation} reputation</div>
                       </div>
                     </div>
-                    <button
+                    <motion.button
+                      whileHover={{ scale: 1.1 }}
+                      whileTap={{ scale: 0.9 }}
                       onClick={() => {
                         logout();
                         setShowMobileMenu(false);
                       }}
-                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
+                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300"
                     >
                       <LogOut className="h-5 w-5" />
-                    </button>
+                    </motion.button>
                   </div>
                 </div>
               ) : (
-                <button
+                <AnimatedButton
+                  variant="primary"
                   onClick={() => {
                     setShowAuthModal(true);
                     setShowMobileMenu(false);
                   }}
-                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300"
+                  className="w-full"
                 >
                   Sign In
-                </button>
+                </AnimatedButton>
               )}
-            </div>
-          )}
+              </motion.div>
+            )}
+          </AnimatePresence>
         </div>
-      </header>
+      </motion.header>

-      {showAuthModal && (
+      <AnimatePresence>
+        {showAuthModal && (
         <AuthModal onClose={() => setShowAuthModal(false)} />
-      )}
+        )}
+      </AnimatePresence>
     </>
   );
 };