@@ .. @@
   return (
   )
-    <div className="p-6 space-y-6">
+    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
         <div>
-          <h1 className="text-2xl font-bold text-dark-800 dark:text-white mb-2">Family Members</h1>
-          <p className="text-dark-500 dark:text-gray-400">Manage your family member profiles</p>
+          <h1 className="text-xl lg:text-2xl font-bold text-dark-800 dark:text-white mb-2">Family Members</h1>
+          <p className="text-sm lg:text-base text-dark-500 dark:text-gray-400">Manage your family member profiles</p>
         </div>
         
         <button
           onClick={() => setShowForm(true)}
-          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
+          className="flex items-center space-x-2 px-4 py-3 lg:py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors touch-manipulation"
         >
           <Plus className="w-4 h-4" />
           <span>Add Member</span>
         </button>
       </div>

       {state.members.length === 0 ? (
         )
         }
-        <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-200 dark:border-dark-700 p-12 text-center">
+        <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-200 dark:border-dark-700 p-8 lg:p-12 text-center">
           <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
-          <h3 className="text-lg font-semibold text-dark-800 dark:text-white mb-2">No family members yet</h3>
-          <p className="text-dark-500 dark:text-gray-400 mb-4">Start by adding your family members to manage their profiles</p>
+          <h3 className="text-base lg:text-lg font-semibold text-dark-800 dark:text-white mb-2">No family members yet</h3>
+          <p className="text-sm lg:text-base text-dark-500 dark:text-gray-400 mb-4">Start by adding your family members to manage their profiles</p>
           <button
             onClick={() => setShowForm(true)}
-            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
+            className="px-4 py-3 lg:py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors touch-manipulation"
           >
             Add First Member
           </button>
         </div>
       ) : (
-        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
+        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
           {state.members.map((member, index) => (
             <MemberCard key={member.id} member={member} index={index} onEdit={handleEdit} onDelete={handleDelete} />
           ))}
         </div>
       )}