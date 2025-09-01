@@ .. @@
   return (
     <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-200 dark:border-dark-700">
-      <div className="p-6 border-b border-dark-200 dark:border-dark-700">
-        <h3 className="text-lg font-semibold text-dark-800 dark:text-white mb-4">{title}</h3>
-        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
+      <div className="p-4 lg:p-6 border-b border-dark-200 dark:border-dark-700">
+        <h3 className="text-base lg:text-lg font-semibold text-dark-800 dark:text-white mb-4">{title}</h3>
+        <div className="grid grid-cols-1 gap-4">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
             <input
               type="text"
               placeholder="Search transactions..."
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
-              className="w-full bg-dark-100 dark:bg-dark-700 border border-dark-200 dark:border-dark-600 rounded-lg pl-10 pr-4 py-2 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
+              className="w-full bg-dark-100 dark:bg-dark-700 border border-dark-200 dark:border-dark-600 rounded-lg pl-10 pr-4 py-3 lg:py-2 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-base"
             />
           </div>
-          <Select
-            isMulti
-            options={memberOptions}
-            value={selectedMembers}
-            onChange={setSelectedMembers}
-            styles={selectStyles}
-            placeholder={
-              <div className="flex items-center gap-2 text-gray-400">
-                <Users size={16} /> Filter by member...
-              </div>
-            }
-            classNamePrefix="react-select"
-          />
+          <div className="lg:hidden">
+            <Select
+              isMulti
+              options={memberOptions}
+              value={selectedMembers}
+              onChange={setSelectedMembers}
+              styles={selectStyles}
+              placeholder="Filter by member..."
+              classNamePrefix="react-select"
+            />
+          </div>
+          <div className="hidden lg:block">
+            <Select
+              isMulti
+              options={memberOptions}
+              value={selectedMembers}
+              onChange={setSelectedMembers}
+              styles={selectStyles}
+              placeholder={
+                <div className="flex items-center gap-2 text-gray-400">
+                  <Users size={16} /> Filter by member...
+                </div>
+              }
+              classNamePrefix="react-select"
+            />
+          </div>
         </div>
-        <div className="flex flex-wrap items-center gap-2 mt-4">
-          <button onClick={() => setDateFilter('all')} className={`px-3 py-1 text-sm rounded-full ${activeDateFilter === 'all' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>All Time</button>
-          <button onClick={() => setDateFilter('week')} className={`px-3 py-1 text-sm rounded-full ${activeDateFilter === 'week' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>This Week</button>
-          <button onClick={() => setDateFilter('month')} className={`px-3 py-1 text-sm rounded-full ${activeDateFilter === 'month' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>This Month</button>
-          <button onClick={() => setDateFilter('year')} className={`px-3 py-1 text-sm rounded-full ${activeDateFilter === 'year' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>This Year</button>
+        <div className="flex flex-wrap items-center gap-1 lg:gap-2 mt-4 overflow-x-auto pb-2">
+          <button onClick={() => setDateFilter('all')} className={`px-3 py-2 lg:py-1 text-xs lg:text-sm rounded-full whitespace-nowrap touch-manipulation ${activeDateFilter === 'all' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>All Time</button>
+          <button onClick={() => setDateFilter('week')} className={`px-3 py-2 lg:py-1 text-xs lg:text-sm rounded-full whitespace-nowrap touch-manipulation ${activeDateFilter === 'week' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>This Week</button>
+          <button onClick={() => setDateFilter('month')} className={`px-3 py-2 lg:py-1 text-xs lg:text-sm rounded-full whitespace-nowrap touch-manipulation ${activeDateFilter === 'month' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>This Month</button>
+          <button onClick={() => setDateFilter('year')} className={`px-3 py-2 lg:py-1 text-xs lg:text-sm rounded-full whitespace-nowrap touch-manipulation ${activeDateFilter === 'year' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>This Year</button>
           <div className="relative">
-            <button onClick={() => setShowDatePicker(!showDatePicker)} className={`flex items-center gap-2 px-3 py-1 text-sm rounded-full ${activeDateFilter === 'custom' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>
+            <button onClick={() => setShowDatePicker(!showDatePicker)} className={`flex items-center gap-2 px-3 py-2 lg:py-1 text-xs lg:text-sm rounded-full whitespace-nowrap touch-manipulation ${activeDateFilter === 'custom' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>
               <Calendar size={14} />
               {dateRange.from && dateRange.to ? `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'MMM d')}` : 'Custom'}
             </button>
             {showDatePicker && (
-              <div className="absolute top-full right-0 mt-2 z-10 bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-lg p-2 shadow-lg">
+              <div className="absolute top-full right-0 mt-2 z-10 bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-lg p-2 shadow-lg max-w-xs">
                 <style>{`
                   .rdp { 
-                    --rdp-cell-size: 35px; 
+                    --rdp-cell-size: 32px; 
                     --rdp-background-color: var(--bg-primary); 
                     --rdp-accent-color: #3b82f6; 
                     --rdp-color: var(--text-primary); 
                     --rdp-border: 1px solid var(--border-color);
                   }
                   .rdp-day_selected { background-color: #3b82f6 !important; color: white !important; }
+                  @media (max-width: 768px) {
+                    .rdp { --rdp-cell-size: 28px; }
+                  }
                 `}</style>
                 <DayPicker
                   mode="range"
                   selected={dateRange}
                   onSelect={handleDaySelect as any}
                   numberOfMonths={1}
                 />
               </div>
             )}
           </div>
         </div>
       </div>