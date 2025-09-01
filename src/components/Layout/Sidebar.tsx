@@ .. @@
 import React, { useState } from 'react';
 import { 
   LayoutDashboard, Calendar, DollarSign, PiggyBank, CreditCard, 
   Heart, Activity, Calculator, ChefHat, Bookmark, Package,
   Users, CheckSquare, Bell, FileText, BarChart3, Bot,
-  ChevronLeft, Moon, Sun, Globe, Monitor
+  ChevronLeft, Moon, Sun, Globe, Monitor, X
 } from 'lucide-react';
 import { useApp } from '../../contexts/AppContext';
 import { motion, AnimatePresence } from 'framer-motion';

 interface SidebarProps {
   collapsed: boolean;
   onToggleCollapse: () => void;
 }

 const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
   const { state, dispatch, t } = useApp();
   const [showThemeMenu, setShowThemeMenu] = useState(false);
   const [showLangMenu, setShowLangMenu] = useState(false);

   const menuItems = [
     { id: 'dashboard', label: t('sidebar.dashboard'), icon: LayoutDashboard },
     { id: 'calendar', label: t('sidebar.calendar'), icon: Calendar },
     { id: 'finance', label: t('sidebar.finance'), icon: DollarSign },
     { id: 'budget', label: t('sidebar.budget'), icon: PiggyBank },
     { id: 'subscriptions', label: t('sidebar.subscriptions'), icon: CreditCard },
     { id: 'health', label: t('sidebar.health'), icon: Heart },
     { id: 'period', label: t('sidebar.period'), icon: Activity },
     { id: 'calculators', label: t('sidebar.calculators'), icon: Calculator },
     { id: 'rannaghor', label: t('sidebar.rannaghor'), icon: ChefHat },
     { id: 'saved-recipes', label: t('sidebar.savedRecipes'), icon: Bookmark },
     { id: 'pantry', label: t('sidebar.pantry'), icon: Package },
     { id: 'members', label: t('sidebar.members'), icon: Users },
     { id: 'tasks', label: t('sidebar.tasks'), icon: CheckSquare },
     { id: 'reminders', label: t('sidebar.reminders'), icon: Bell },
     { id: 'documents', label: t('sidebar.documents'), icon: FileText },
     { id: 'analytics', label: t('sidebar.analytics'), icon: BarChart3 },
     { id: 'ai', label: t('sidebar.ai'), icon: Bot }
   ];

   const themeOptions = [
     { id: 'light', label: 'Light', icon: Sun },
     { id: 'dark', label: 'Dark', icon: Moon },
     { id: 'system', label: 'System', icon: Monitor },
   ];

   const langOptions = [
     { id: 'en', label: 'English' },
     { id: 'bn', label: 'বাংলা' },
   ];

+  const handleMenuItemClick = (id: string) => {
+    dispatch({ type: 'SET_ACTIVE_SECTION', payload: id });
+    // Auto-collapse sidebar on mobile after selection
+    if (window.innerWidth < 1024) {
+      onToggleCollapse();
+    }
+  };

   return (
-    <motion.div
-      initial={false}
-      animate={{ width: collapsed ? 80 : 280 }}
-      className="bg-white dark:bg-dark-800 border-r border-dark-200 dark:border-dark-700 flex flex-col h-screen relative"
-    >
+    <>
+      {/* Mobile Overlay */}
+      {!collapsed && (
+        <div 
+          className="lg:hidden fixed inset-0 bg-black/50 z-40"
+          onClick={onToggleCollapse}
+        />
+      )}
+      
+      <motion.div
+        initial={false}
+        animate={{ 
+          width: collapsed ? 80 : 280,
+          x: window.innerWidth < 1024 && collapsed ? -280 : 0
+        }}
+        className="bg-white dark:bg-dark-800 border-r border-dark-200 dark:border-dark-700 flex flex-col h-screen relative z-50 lg:z-auto fixed lg:relative"
+      >
       <div className="p-4 border-b border-dark-200 dark:border-dark-700">
         <div className="flex items-center justify-between">
           {!collapsed && (
-            <h1 className="text-xl font-bold text-dark-800 dark:text-white">Singularity ∞</h1>
+            <h1 className="text-lg lg:text-xl font-bold text-dark-800 dark:text-white">Singularity ∞</h1>
           )}
           <button
             onClick={onToggleCollapse}
-            className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 text-dark-500 dark:text-gray-400 hover:text-dark-800 dark:hover:text-white transition-colors"
+            className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 text-dark-500 dark:text-gray-400 hover:text-dark-800 dark:hover:text-white transition-colors touch-manipulation"
           >
-            <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
+            {window.innerWidth < 1024 && !collapsed ? (
+              <X className="w-5 h-5" />
+            ) : (
+              <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
+            )}
           </button>
         </div>
       </div>

-      <div className="flex-1 overflow-y-auto py-4">
+      <div className="flex-1 overflow-y-auto py-2 lg:py-4">
         <nav className="space-y-1 px-3">
           {menuItems.map((item) => {
             const Icon = item.icon;
             const isActive = state.activeSection === item.id;
             
             return (
               <button
                 key={item.id}
-                onClick={() => dispatch({ type: 'SET_ACTIVE_SECTION', payload: item.id })}
-                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
+                onClick={() => handleMenuItemClick(item.id)}
+                className={`w-full flex items-center px-3 py-3 lg:py-2 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
                   isActive
                     ? 'bg-primary-600 text-white'
                     : 'text-dark-600 dark:text-gray-300 hover:bg-dark-100 dark:hover:bg-dark-700 hover:text-dark-800 dark:hover:text-white'
                 }`}
               >
-                <Icon className="w-5 h-5 flex-shrink-0" />
+                <Icon className="w-5 h-5 lg:w-4 lg:h-4 flex-shrink-0" />
                 {!collapsed && <span className="ml-3 truncate">{item.label}</span>}
               </button>
             );
           })}
         </nav>
       </div>

       <div className="p-4 border-t border-dark-200 dark:border-dark-700 space-y-2">
         <div className="relative">
           <button
             onClick={() => setShowThemeMenu(!showThemeMenu)}
-            className="w-full flex items-center px-3 py-2 rounded-lg text-dark-600 dark:text-gray-300 hover:bg-dark-100 dark:hover:bg-dark-700 hover:text-dark-800 dark:hover:text-white transition-colors text-sm"
+            className="w-full flex items-center px-3 py-3 lg:py-2 rounded-lg text-dark-600 dark:text-gray-300 hover:bg-dark-100 dark:hover:bg-dark-700 hover:text-dark-800 dark:hover:text-white transition-colors text-sm touch-manipulation"
           >
             <Sun className="w-5 h-5 dark:hidden" />
             <Moon className="w-5 h-5 hidden dark:inline-block" />
             {!collapsed && <span className="ml-3">Theme</span>}
           </button>
           <AnimatePresence>
             {showThemeMenu && (
-              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute bottom-full mb-2 w-full bg-white dark:bg-dark-700 rounded-lg shadow-lg border border-dark-200 dark:border-dark-600 p-2">
+              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute bottom-full mb-2 w-full bg-white dark:bg-dark-700 rounded-lg shadow-lg border border-dark-200 dark:border-dark-600 p-2 z-50">
                 {themeOptions.map(theme => {
                   const Icon = theme.icon;
-                  return <button key={theme.id} onClick={() => { dispatch({ type: 'SET_THEME', payload: theme.id as any }); setShowThemeMenu(false); }} className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${state.theme === theme.id ? 'bg-primary-500 text-white' : 'hover:bg-dark-100 dark:hover:bg-dark-600'}`}>{<Icon size={16} />} {theme.label}</button>
+                  return <button key={theme.id} onClick={() => { dispatch({ type: 'SET_THEME', payload: theme.id as any }); setShowThemeMenu(false); }} className={`w-full flex items-center gap-2 px-3 py-3 lg:py-2 text-sm rounded-md touch-manipulation ${state.theme === theme.id ? 'bg-primary-500 text-white' : 'hover:bg-dark-100 dark:hover:bg-dark-600'}`}>{<Icon size={16} />} {theme.label}</button>
                 })}
               </motion.div>
             )}
           </AnimatePresence>
         </div>
         
         <div className="relative">
           <button
             onClick={() => setShowLangMenu(!showLangMenu)}
-            className="w-full flex items-center px-3 py-2 rounded-lg text-dark-600 dark:text-gray-300 hover:bg-dark-100 dark:hover:bg-dark-700 hover:text-dark-800 dark:hover:text-white transition-colors text-sm"
+            className="w-full flex items-center px-3 py-3 lg:py-2 rounded-lg text-dark-600 dark:text-gray-300 hover:bg-dark-100 dark:hover:bg-dark-700 hover:text-dark-800 dark:hover:text-white transition-colors text-sm touch-manipulation"
           >
             <Globe className="w-5 h-5" />
             {!collapsed && <span className="ml-3">Language</span>}
           </button>
           <AnimatePresence>
             {showLangMenu && (
-              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute bottom-full mb-2 w-full bg-white dark:bg-dark-700 rounded-lg shadow-lg border border-dark-200 dark:border-dark-600 p-2">
+              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute bottom-full mb-2 w-full bg-white dark:bg-dark-700 rounded-lg shadow-lg border border-dark-200 dark:border-dark-600 p-2 z-50">
                 {langOptions.map(lang => (
-                  <button key={lang.id} onClick={() => { dispatch({ type: 'SET_LANGUAGE', payload: lang.id as any }); setShowLangMenu(false); }} className={`w-full text-left px-3 py-2 text-sm rounded-md ${state.language === lang.id ? 'bg-primary-500 text-white' : 'hover:bg-dark-100 dark:hover:bg-dark-600'}`}>{lang.label}</button>
+                  <button key={lang.id} onClick={() => { dispatch({ type: 'SET_LANGUAGE', payload: lang.id as any }); setShowLangMenu(false); }} className={`w-full text-left px-3 py-3 lg:py-2 text-sm rounded-md touch-manipulation ${state.language === lang.id ? 'bg-primary-500 text-white' : 'hover:bg-dark-100 dark:hover:bg-dark-600'}`}>{lang.label}</button>
                 ))}
               </motion.div>
             )}
           </AnimatePresence>
         </div>
       </div>
-    </motion.div>
+      </motion.div>
+    </>
   );
 };

 export default Sidebar;