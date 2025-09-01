@@ .. @@
   return (
-    <div className="p-6 space-y-6">
+    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
         <div>
-          <h1 className="text-2xl font-bold text-white mb-2">Calendar</h1>
-          <p className="text-gray-400">Current Mode: <span className="font-semibold text-primary-400 capitalize">{state.calendarMode}</span>. Click a date to interact.</p>
+          <h1 className="text-xl lg:text-2xl font-bold text-white mb-2">Calendar</h1>
+          <p className="text-sm lg:text-base text-gray-400">Current Mode: <span className="font-semibold text-primary-400 capitalize">{state.calendarMode}</span>. Tap a date to interact.</p>
         </div>
-        <div className="flex flex-wrap gap-2 bg-dark-800 p-2 rounded-lg border border-dark-700">
+        <div className="flex flex-wrap gap-1 lg:gap-2 bg-dark-800 p-2 rounded-lg border border-dark-700 overflow-x-auto">
           {modes.map((mode) => {
             const Icon = mode.icon;
             const isActive = state.calendarMode === mode.type;
             return (
               <button
                 key={mode.type}
                 onClick={() => dispatch({ type: 'SET_CALENDAR_MODE', payload: mode.type })}
-                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
+                className={`flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-3 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors touch-manipulation whitespace-nowrap ${isActive ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
               >
-                <Icon className="w-4 h-4" />
+                <Icon className="w-4 h-4 flex-shrink-0" />
                 <span className="hidden sm:inline">{mode.label}</span>
               </button>
             );
           })}
         </div>
       </div>

       <div className="bg-dark-800 rounded-xl border border-dark-700">
-        <div className="flex items-center justify-between p-6 border-b border-dark-700">
-          <h2 className="text-xl font-semibold text-white">{format(currentDate, 'MMMM yyyy')}</h2>
+        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-dark-700">
+          <h2 className="text-lg lg:text-xl font-semibold text-white">{format(currentDate, 'MMMM yyyy')}</h2>
           <div className="flex items-center space-x-2">
-            <button onClick={handlePrevMonth} className="p-2 hover:bg-dark-700 rounded-lg"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
-            <button onClick={handleNextMonth} className="p-2 hover:bg-dark-700 rounded-lg"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
+            <button onClick={handlePrevMonth} className="p-3 lg:p-2 hover:bg-dark-700 rounded-lg touch-manipulation"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
+            <button onClick={handleNextMonth} className="p-3 lg:p-2 hover:bg-dark-700 rounded-lg touch-manipulation"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
           </div>
         </div>

-        <div className="p-6">
+        <div className="p-3 lg:p-6">
           <div className="grid grid-cols-7 gap-1 mb-4">
-            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
-              <div key={day} className="p-3 text-center text-gray-400 font-medium text-sm">{day}</div>
+            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
+              <div key={day + index} className="p-2 lg:p-3 text-center text-gray-400 font-medium text-xs lg:text-sm">
+                <span className="lg:hidden">{day}</span>
+                <span className="hidden lg:inline">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</span>
+              </div>
             ))}
           </div>
-          <div className="grid grid-cols-7 gap-1">
+          <div className="grid grid-cols-7 gap-1 lg:gap-1">
             {calendarDays.map((date, index) => {
               const data = getDateData(date);
               const isCurrentMonth = isSameMonth(date, currentDate);
               const isTodayDate = isToday(date);
               return (
                 <motion.button
                   key={date.toISOString()}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: index * 0.01 }}
                   onClick={() => handleDateClick(date)}
-                  className={`aspect-square p-2 rounded-lg text-sm transition-colors relative flex flex-col justify-between ${!isCurrentMonth ? 'text-gray-600' : 'text-gray-300 hover:bg-dark-700'} ${isTodayDate ? 'bg-primary-600/50' : ''} ${data.hasData ? 'border border-primary-500/50' : ''}`}
+                  className={`aspect-square p-1 lg:p-2 rounded-lg text-xs lg:text-sm transition-colors relative flex flex-col justify-between touch-manipulation ${!isCurrentMonth ? 'text-gray-600' : 'text-gray-300 hover:bg-dark-700 active:bg-dark-600'} ${isTodayDate ? 'bg-primary-600/50' : ''} ${data.hasData ? 'border border-primary-500/50' : ''}`}
                   disabled={!isCurrentMonth}
                 >
                   <span className={`self-start font-medium ${isTodayDate ? 'text-white' : ''}`}>{format(date, 'd')}</span>
                   {(data.income > 0 || data.expense > 0) && (
-                    <div className="text-xs text-right">
-                      {data.income > 0 && <p className="text-green-500 truncate">+${data.income.toFixed(0)}</p>}
-                      {data.expense > 0 && <p className="text-red-500 truncate">-${data.expense.toFixed(0)}</p>}
+                    <div className="text-xs lg:text-xs text-right">
+                      {data.income > 0 && <p className="text-green-500 truncate text-xs">+{data.income.toFixed(0)}</p>}
+                      {data.expense > 0 && <p className="text-red-500 truncate text-xs">-{data.expense.toFixed(0)}</p>}
                     </div>
                   )}
                 </motion.button>
               );
             })}
           </div>
         </div>
       </div>
       {renderModal()}
     </div>
   );