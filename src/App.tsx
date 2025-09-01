@@ .. @@
   return (
   )
-    <div className={`min-h-screen bg-dark-100 dark:bg-dark-900 text-dark-800 dark:text-gray-300`}>
+    <div className={`min-h-screen bg-dark-100 dark:bg-dark-900 text-dark-800 dark:text-gray-300 overflow-hidden`}>
       <div className="flex h-screen">
         <Sidebar 
           collapsed={sidebarCollapsed} 
           onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
         />
-        <div className="flex-1 flex flex-col overflow-hidden">
+        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
           <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
-          <main className="flex-1 overflow-y-auto">
+          <main className="flex-1 overflow-y-auto min-h-0">
             {renderActiveSection()}
           </main>
         </div>
       </div>
     </div>
   );