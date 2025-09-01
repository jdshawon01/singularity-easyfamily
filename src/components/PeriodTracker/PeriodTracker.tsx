@@ .. @@
   return (
-    <div className="p-6 space-y-6">
+    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
-        <div><h1 className="text-2xl font-bold text-white mb-2">Period Tracker</h1><p className="text-gray-400">Track your menstrual cycle and gain health insights.</p></div>
-        <button onClick={() => setShowLogModal(true)} className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"><Plus className="w-4 h-4" /><span>Log Period</span></button>
+        <div><h1 className="text-xl lg:text-2xl font-bold text-white mb-2">Period Tracker</h1><p className="text-sm lg:text-base text-gray-400">Track your menstrual cycle and gain health insights.</p></div>
+        <button onClick={() => setShowLogModal(true)} className="flex items-center space-x-2 px-4 py-3 lg:py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 touch-manipulation"><Plus className="w-4 h-4" /><span>Log Period</span></button>
       </div>

-      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
+      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
         {stats.map(stat => (
-          <div key={stat.title} className="bg-dark-800 rounded-xl p-6 border border-dark-700 flex items-center space-x-4">
-            <div className="p-3 rounded-lg bg-pink-500/10"><stat.icon className="w-6 h-6 text-pink-400" /></div>
-            <div><p className="text-gray-400 text-sm">{stat.title}</p><p className="text-white text-xl font-bold">{stat.value}</p></div>
+          <div key={stat.title} className="bg-dark-800 rounded-xl p-4 lg:p-6 border border-dark-700 flex items-center space-x-3 lg:space-x-4">
+            <div className="p-2 lg:p-3 rounded-lg bg-pink-500/10"><stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-pink-400" /></div>
+            <div><p className="text-gray-400 text-xs lg:text-sm">{stat.title}</p><p className="text-white text-lg lg:text-xl font-bold">{stat.value}</p></div>
           </div>
         ))}
       </div>

-      <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
+      <div className="bg-dark-800 rounded-xl border border-dark-700 p-4 lg:p-6">
         <div className="flex items-center justify-between mb-4">
-          <h2 className="text-xl font-semibold text-white">{format(currentDate, 'MMMM yyyy')}</h2>
+          <h2 className="text-lg lg:text-xl font-semibold text-white">{format(currentDate, 'MMMM yyyy')}</h2>
           <div className="flex items-center space-x-2">
-            <button onClick={() => setCurrentDate(d => subMonths(d, 1))} className="p-2 hover:bg-dark-700 rounded-lg"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
-            <button onClick={() => setCurrentDate(d => addMonths(d, 1))} className="p-2 hover:bg-dark-700 rounded-lg"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
+            <button onClick={() => setCurrentDate(d => subMonths(d, 1))} className="p-3 lg:p-2 hover:bg-dark-700 rounded-lg touch-manipulation"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
+            <button onClick={() => setCurrentDate(d => addMonths(d, 1))} className="p-3 lg:p-2 hover:bg-dark-700 rounded-lg touch-manipulation"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
           </div>
         </div>
-        <div className="grid grid-cols-7 gap-1 mb-4 text-center text-gray-400 text-sm font-semibold">
-          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
+        <div className="grid grid-cols-7 gap-1 mb-4 text-center text-gray-400 text-xs lg:text-sm font-semibold">
+          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, index) => (
+            <div key={d + index} className="p-2">
+              <span className="lg:hidden">{d}</span>
+              <span className="hidden lg:inline">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</span>
+            </div>
+          ))}
         </div>
         <div className="grid grid-cols-7 gap-1">
           {calendarDays.map(date => {
             const isCurrentMonth = isSameMonth(date, currentDate);
             const period = isPeriodDay(date);
             const fertile = isFertileDay(date);
             return (
-              <div key={date.toString()} className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-colors ${!isCurrentMonth ? 'text-gray-600' : 'text-gray-300'} ${period ? 'bg-red-500/30' : ''} ${fertile ? 'bg-blue-500/30' : ''} ${isToday(date) ? 'ring-2 ring-primary-500' : ''}`}>
+              <div key={date.toString()} className={`aspect-square flex items-center justify-center rounded-lg text-xs lg:text-sm transition-colors ${!isCurrentMonth ? 'text-gray-600' : 'text-gray-300'} ${period ? 'bg-red-500/30' : ''} ${fertile ? 'bg-blue-500/30' : ''} ${isToday(date) ? 'ring-2 ring-primary-500' : ''}`}>
                 {format(date, 'd')}
               </div>
             );
           })}
         </div>
-        <div className="flex justify-center gap-4 mt-4 text-sm"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500/30" />Period</div><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500/30" />Fertile Window</div></div>
+        <div className="flex justify-center gap-3 lg:gap-4 mt-4 text-xs lg:text-sm"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500/30" />Period</div><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500/30" />Fertile Window</div></div>
       </div>
-       <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
-            <h3 className="text-lg font-semibold text-white mb-2">AI Health Guidance</h3>
-            <p className="text-gray-400 text-sm">Based on your cycle, the AI can provide personalized nutrition, exercise, and wellness tips. <button onClick={handleGetAIAdvice} className="text-primary-400 font-semibold hover:underline">Ask AI</button></p>
+       <div className="bg-dark-800 rounded-xl border border-dark-700 p-4 lg:p-6">
+            <h3 className="text-base lg:text-lg font-semibold text-white mb-2">AI Health Guidance</h3>
+            <p className="text-gray-400 text-sm lg:text-base">Based on your cycle, the AI can provide personalized nutrition, exercise, and wellness tips. <button onClick={handleGetAIAdvice} className="text-primary-400 font-semibold hover:underline touch-manipulation">Ask AI</button></p>
         </div>