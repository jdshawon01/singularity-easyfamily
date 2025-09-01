@@ .. @@
   return (
-    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
-      <div className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-lg">
+    <div className="fixed inset-0 bg-black/50 flex items-end lg:items-center justify-center p-0 lg:p-4 z-50">
+      <div className="bg-dark-800 rounded-t-xl lg:rounded-xl border border-dark-700 w-full max-w-lg lg:max-h-[90vh] flex flex-col">
         <div className="flex items-center justify-between p-6 border-b border-dark-700">
           <div className="flex items-center space-x-3">
             <DollarSign className="w-6 h-6 text-primary-400" />
             <h2 className="text-xl font-semibold text-white">Add Transaction</h2>
           </div>
-          <button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
+          <button onClick={onClose} className="p-3 lg:p-2 hover:bg-dark-700 rounded-lg transition-colors touch-manipulation">
             <X className="w-5 h-5 text-gray-400" />
           </button>
         </div>

-        <form onSubmit={handleSubmit} className="p-6 space-y-4">
+        <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-4 overflow-y-auto flex-1">
           <div className="flex space-x-2">
-            <button type="button" onClick={() => setType('income')} className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${type === 'income' ? 'bg-green-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}>Income</button>
-            <button type="button" onClick={() => setType('expense')} className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${type === 'expense' ? 'bg-red-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}>Expense</button>
+            <button type="button" onClick={() => setType('income')} className={`flex-1 py-4 lg:py-3 px-4 rounded-lg text-sm font-medium transition-colors touch-manipulation ${type === 'income' ? 'bg-green-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}>Income</button>
+            <button type="button" onClick={() => setType('expense')} className={`flex-1 py-4 lg:py-3 px-4 rounded-lg text-sm font-medium transition-colors touch-manipulation ${type === 'expense' ? 'bg-red-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}>Expense</button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-300 mb-2">Amount (৳)</label>
-              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="0.00" step="0.01" required />
+              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-3 lg:py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-base" placeholder="0.00" step="0.01" required />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
-              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500" required />
+              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-3 lg:py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-base" required />
             </div>
           </div>
           
           <div>
             <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
-            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500" required>
+            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-3 lg:py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-base" required>
               <option value="">Select category</option>
               {categories[type].map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
             </select>
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
-            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Brief description" required />
+            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-3 lg:py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-base" placeholder="Brief description" required />
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-300 mb-2">For Member(s)</label>
             <Select
               isMulti
               options={memberOptions}
               value={selectedMembers}
               onChange={setSelectedMembers}
               styles={selectStyles}
               placeholder="Select members or 'For Family'"
               classNamePrefix="react-select"
             />
           </div>

-          <div className="flex space-x-3 pt-4">
-            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors">Cancel</button>
-            <button type="submit" className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">Add Transaction</button>
+          <div className="flex space-x-3 pt-4 pb-2 lg:pb-0">
+            <button type="button" onClick={onClose} className="flex-1 px-4 py-4 lg:py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors touch-manipulation font-medium">Cancel</button>
+            <button type="submit" className="flex-1 px-4 py-4 lg:py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors touch-manipulation font-medium">Add Transaction</button>
           </div>
         </form>
       </div>