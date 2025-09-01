@@ .. @@
   return (
-    <div className="p-6 space-y-6">
+    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
-        <div><h1 className="text-2xl font-bold text-white mb-2">Reminders</h1><p className="text-gray-400">Set and manage important reminders.</p></div>
-        <button onClick={() => setShowForm(true)} className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"><Plus className="w-4 h-4" /><span>Add Reminder</span></button>
+        <div><h1 className="text-xl lg:text-2xl font-bold text-white mb-2">Reminders</h1><p className="text-sm lg:text-base text-gray-400">Set and manage important reminders.</p></div>
+        <button onClick={() => setShowForm(true)} className="flex items-center space-x-2 px-4 py-3 lg:py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 touch-manipulation"><Plus className="w-4 h-4" /><span>Add Reminder</span></button>
       </div>
-      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
-        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 flex items-center justify-between"><div className="flex items-center space-x-4"><div className="p-3 rounded-lg bg-blue-500/10"><Bell className="w-6 h-6 text-blue-400" /></div><div><p className="text-gray-400 text-sm">Total Reminders</p><p className="text-white text-2xl font-bold">{state.reminders.length}</p></div></div></div>
-        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 flex items-center justify-between"><div className="flex items-center space-x-4"><div className="p-3 rounded-lg bg-yellow-500/10"><Clock className="w-6 h-6 text-yellow-400" /></div><div><p className="text-gray-400 text-sm">Pending</p><p className="text-white text-2xl font-bold">{pendingReminders}</p></div></div></div>
+      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
+        <div className="bg-dark-800 rounded-xl p-4 lg:p-6 border border-dark-700 flex items-center justify-between"><div className="flex items-center space-x-3 lg:space-x-4"><div className="p-2 lg:p-3 rounded-lg bg-blue-500/10"><Bell className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" /></div><div><p className="text-gray-400 text-xs lg:text-sm">Total Reminders</p><p className="text-white text-lg lg:text-2xl font-bold">{state.reminders.length}</p></div></div></div>
+        <div className="bg-dark-800 rounded-xl p-4 lg:p-6 border border-dark-700 flex items-center justify-between"><div className="flex items-center space-x-3 lg:space-x-4"><div className="p-2 lg:p-3 rounded-lg bg-yellow-500/10"><Clock className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400" /></div><div><p className="text-gray-400 text-xs lg:text-sm">Pending</p><p className="text-white text-lg lg:text-2xl font-bold">{pendingReminders}</p></div></div></div>
       </div>
-      <div className="space-y-4">
+      <div className="space-y-3 lg:space-y-4">
         {state.reminders.slice().sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((r, i) => <ReminderCard key={r.id} reminder={r} index={i} />)}
       </div>
       {showForm && <ReminderForm onClose={() => setShowForm(false)} />}
     </div>
   );