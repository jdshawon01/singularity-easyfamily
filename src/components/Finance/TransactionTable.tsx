@@ .. @@
   if (transactions.length === 0) {
     return (
-      <div className="p-6">
-        <p className="text-dark-500 dark:text-gray-400 text-center py-8">No transactions match your filters.</p>
+      <div className="p-4 lg:p-6">
+        <p className="text-dark-500 dark:text-gray-400 text-center py-8 text-sm lg:text-base">No transactions match your filters.</p>
       </div>
     );
   }

   return (
-    <div className="overflow-x-auto">
-      <table className="w-full text-sm text-left text-dark-600 dark:text-gray-400">
-        <thead className="text-xs text-dark-500 dark:text-gray-400 uppercase bg-dark-100 dark:bg-dark-700">
+    <div className="overflow-x-auto">
+      {/* Mobile Card View */}
+      <div className="lg:hidden space-y-3 p-4">
+        {transactions.map((transaction) => {
+          const memberNames = getMemberNames(transaction.memberIds);
+          const isIncome = transaction.type === 'income';
+          return (
+            <div key={transaction.id} className="bg-dark-700 rounded-lg p-4 space-y-3">
+              <div className="flex items-center justify-between">
+                <div className="flex items-center space-x-3">
+                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${isIncome ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
+                    {transaction.type}
+                  </span>
+                  <span className="text-gray-400 text-xs">{transaction.category}</span>
+                </div>
+                <div className="flex items-center space-x-2">
+                  <button onClick={() => onEdit(transaction)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-full touch-manipulation"><Edit size={16} /></button>
+                  <button onClick={() => onDelete(transaction.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full touch-manipulation"><Trash2 size={16} /></button>
+                </div>
+              </div>
+              <div>
+                <p className="text-white font-medium text-base">{transaction.description}</p>
+                <p className="text-gray-400 text-sm mt-1">{formatDate(new Date(transaction.date))}</p>
+                {memberNames !== 'N/A' && (
+                  <p className="text-gray-400 text-sm">{memberNames}</p>
+                )}
+              </div>
+              <div className={`text-right font-bold text-lg ${isIncome ? 'text-green-400' : 'text-red-400'}`}>
+                {isIncome ? '+' : '-'}৳{transaction.amount.toLocaleString()}
+              </div>
+            </div>
+          );
+        })}
+      </div>
+      
+      {/* Desktop Table View */}
+      <table className="hidden lg:table w-full text-sm text-left text-dark-600 dark:text-gray-400">
+        <thead className="text-xs text-dark-500 dark:text-gray-400 uppercase bg-dark-100 dark:bg-dark-700">
           <tr>
             <th scope="col" className="px-6 py-3">Date</th>
             <th scope="col" className="px-6 py-3">Type</th>
             <th scope="col" className="px-6 py-3">Description</th>
             <th scope="col" className="px-6 py-3">Category</th>
             <th scope="col" className="px-6 py-3 text-right">Amount</th>
             <th scope="col" className="px-6 py-3">Members</th>
             <th scope="col" className="px-6 py-3 text-center">Actions</th>
           </tr>
         </thead>
         <tbody>
           {transactions.map((transaction) => {
             const memberNames = getMemberNames(transaction.memberIds);
             const isIncome = transaction.type === 'income';
             return (
               <tr key={transaction.id} className="bg-white dark:bg-dark-800 border-b border-dark-200 dark:border-dark-700 hover:bg-dark-50 dark:hover:bg-dark-600/50">
                 <td className="px-6 py-4">{formatDate(new Date(transaction.date))}</td>
                 <td className="px-6 py-4">
                   <span className={`px-2 py-1 text-xs font-medium rounded-full ${isIncome ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                     {transaction.type}
                   </span>
                 </td>
                 <td className="px-6 py-4 font-medium text-dark-800 dark:text-white whitespace-nowrap">{transaction.description}</td>
                 <td className="px-6 py-4">{transaction.category}</td>
                 <td className={`px-6 py-4 text-right font-semibold ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
                   {isIncome ? '+' : '-'}৳{transaction.amount.toLocaleString()}
                 </td>
                 <td className="px-6 py-4">{memberNames}</td>
                 <td className="px-6 py-4 text-center">
                   <div className="flex items-center justify-center space-x-3">
                     <button onClick={() => onEdit(transaction)} className="text-blue-500 hover:text-blue-700"><Edit size={16} /></button>
                     <button onClick={() => onDelete(transaction.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                   </div>
                 </td>
               </tr>
             );
           })}
         </tbody>
       </table>
     </div>
   );