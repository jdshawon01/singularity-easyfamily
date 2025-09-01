@@ .. @@
   return (
-    <div className="p-6 space-y-6">
+    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
         <div>
-          <h1 className="text-2xl font-bold text-white mb-2">Subscriptions</h1>
-          <p className="text-gray-400">Track all your recurring bills and subscriptions.</p>
+          <h1 className="text-xl lg:text-2xl font-bold text-white mb-2">Subscriptions</h1>
+          <p className="text-sm lg:text-base text-gray-400">Track all your recurring bills and subscriptions.</p>
         </div>
         <button
           onClick={() => setShowForm(true)}
-          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
+          className="flex items-center space-x-2 px-4 py-3 lg:py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors touch-manipulation"
         >
           <Plus className="w-4 h-4" />
           <span>Add Subscription</span>
         </button>
       </div>

-      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
+      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6">
         {stats.map((stat, index) => {
           const Icon = stat.icon;
           return (
-            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-dark-800 rounded-xl p-6 border border-dark-700">
+            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-dark-800 rounded-xl p-4 lg:p-6 border border-dark-700">
               <div className="flex items-center justify-between">
                 <div>
-                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
-                  <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
+                  <p className="text-gray-400 text-xs lg:text-sm font-medium">{stat.title}</p>
+                  <p className="text-white text-lg lg:text-2xl font-bold mt-1">{stat.value}</p>
                 </div>
-                <div className="p-3 rounded-lg bg-opacity-10"><Icon className={`w-6 h-6 ${stat.color}`} /></div>
+                <div className="p-2 lg:p-3 rounded-lg bg-opacity-10"><Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.color}`} /></div>
               </div>
             </motion.div>
           );
         })}
       </div>

-      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
+      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
         {state.subscriptions
           .slice()
           .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
           .map((sub, index) => (
             <SubscriptionCard key={sub.id} sub={sub} index={index} />
         ))}
       </div>