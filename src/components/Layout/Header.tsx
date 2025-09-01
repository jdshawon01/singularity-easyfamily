@@ .. @@
 import React from 'react';
 import { format } from 'date-fns';
 import { enUS, bn } from 'date-fns/locale';
-import { Menu } from 'lucide-react';
+import { Menu, User } from 'lucide-react';
 import { useApp } from '../../contexts/AppContext';

 interface HeaderProps {
   onToggleSidebar: () => void;
 }

 const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
   const { state } = useApp();
   const currentDate = format(new Date(), 'EEEE, MMMM dd, yyyy', {
     locale: state.language === 'bn' ? bn : enUS,
   });

   return (
-    <header className="bg-white dark:bg-dark-800 border-b border-dark-200 dark:border-dark-700 px-6 py-4">
+    <header className="bg-white dark:bg-dark-800 border-b border-dark-200 dark:border-dark-700 px-4 lg:px-6 py-3 lg:py-4">
       <div className="flex items-center justify-between">
         <div className="flex items-center space-x-4">
           <button
             onClick={onToggleSidebar}
-            className="lg:hidden p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 text-dark-500 dark:text-gray-400 hover:text-dark-800 dark:hover:text-white transition-colors"
+            className="lg:hidden p-3 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 text-dark-500 dark:text-gray-400 hover:text-dark-800 dark:hover:text-white transition-colors touch-manipulation"
           >
-            <Menu className="w-5 h-5" />
+            <Menu className="w-6 h-6" />
           </button>
+          <div className="hidden sm:block">
+            <h2 className="text-lg font-semibold text-dark-800 dark:text-white capitalize">
+              {state.activeSection.replace('-', ' ')}
+            </h2>
+            <p className="text-xs text-dark-500 dark:text-gray-400 hidden lg:block">
+              {currentDate}
+            </p>
+          </div>
         </div>
         
         <div className="flex items-center space-x-3">
-          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
-            <span className="text-white text-sm font-medium">U</span>
+          <div className="w-10 h-10 lg:w-8 lg:h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
+            <User className="w-5 h-5 lg:w-4 lg:h-4 text-white" />
           </div>
         </div>
       </div>
     </header>
   );
 };