@@ .. @@
   return (
   )
-    <div className="p-6 space-y-6">
+    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
         <div>
-          <h1 className="text-2xl font-bold text-white mb-2">Tasks</h1>
-          <p className="text-gray-400">Organize and track your family tasks</p>
+          <h1 className="text-xl lg:text-2xl font-bold text-white mb-2">Tasks</h1>
+          <p className="text-sm lg:text-base text-gray-400">Organize and track your family tasks</p>
         </div>
         
         <div className="flex flex-wrap gap-3">
           <select
             value={filter}
             onChange={(e) => setFilter(e.target.value)}
-            className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
+            className="px-3 py-3 lg:py-2 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
           >
             <option value="all">All Tasks</option>
             <option value="pending">Pending</option>
             <option value="completed">Completed</option>
           </select>
           <button
             onClick={() => setShowForm(true)}
-            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
+            className="flex items-center space-x-2 px-4 py-3 lg:py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors touch-manipulation"
           >
             <Plus className="w-4 h-4" />
             <span>Add Task</span>
           </button>
         </div>
       </div>

-      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
+      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
         {stats.map((stat, index) => {
           }
           )
           }
           const Icon = stat.icon;
           return (
             <motion.div
               key={stat.title}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
           )
-              className="bg-dark-800 rounded-xl p-6 border border-dark-700"
+              className="bg-dark-800 rounded-xl p-4 lg:p-6 border border-dark-700"
             >
               <div className="flex items-center justify-between">
                 <div>
-                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
-                  <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
+                  <p className="text-gray-400 text-xs lg:text-sm font-medium">{stat.title}</p>
+                  <p className="text-white text-lg lg:text-2xl font-bold mt-1">{stat.value}</p>
                 </div>
-                <div className={`${stat.bgColor} p-3 rounded-lg`}>
-                  <Icon className={`w-6 h-6 ${stat.color}`} />
+                <div className={`${stat.bgColor} p-2 lg:p-3 rounded-lg`}>
+                  <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.color}`} />
                 </div>
               </div>
             </motion.div>
           );
         })}
       </div>