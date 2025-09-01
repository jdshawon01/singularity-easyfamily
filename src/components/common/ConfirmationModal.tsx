@@ .. @@
   return (
-    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
+    <div className="fixed inset-0 bg-black/60 flex items-end lg:items-center justify-center p-0 lg:p-4 z-50">
       <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
-        className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-md"
+        className="bg-dark-800 rounded-t-xl lg:rounded-xl border border-dark-700 w-full max-w-md"
       >
-        <div className="flex items-center justify-between p-6 border-b border-dark-700">
+        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-dark-700">
           <div className="flex items-center space-x-3">
             <AlertTriangle className="w-6 h-6 text-red-400" />
-            <h2 className="text-xl font-semibold text-white">{title}</h2>
+            <h2 className="text-lg lg:text-xl font-semibold text-white">{title}</h2>
           </div>
-          <button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg">
+          <button onClick={onClose} className="p-3 lg:p-2 hover:bg-dark-700 rounded-lg touch-manipulation">
             <X className="w-5 h-5 text-gray-400" />
           </button>
         </div>

-        <div className="p-6 space-y-4">
-          <div className="text-gray-300">{message}</div>
+        <div className="p-4 lg:p-6 space-y-4">
+          <div className="text-gray-300 text-sm lg:text-base">{message}</div>

           {confirmRequiresTyping && (
             <div>
               <label className="block text-sm font-medium text-gray-300 mb-2">
                 To confirm, please type "<span className="font-bold text-red-400">{confirmRequiresTyping}</span>" below:
               </label>
               <input
                 type="text"
                 value={typedConfirmation}
                 onChange={(e) => setTypedConfirmation(e.target.value)}
-                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"
+                className="w-full px-3 py-3 lg:py-2 bg-dark-700 border border-dark-600 rounded-lg text-white text-base"
               />
             </div>
           )}
         </div>

-        <div className="flex space-x-3 p-6 bg-dark-900/50 rounded-b-xl">
+        <div className="flex space-x-3 p-4 lg:p-6 bg-dark-900/50 rounded-b-xl">
           <button
             onClick={onClose}
-            className="flex-1 px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 font-semibold"
+            className="flex-1 px-4 py-4 lg:py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 font-semibold touch-manipulation"
           >
             Cancel
           </button>
           <button
             onClick={onConfirm}
             disabled={!canConfirm}
-            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
+            className="flex-1 px-4 py-4 lg:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
           >
             {confirmText}
           </button>
         </div>
       </motion.div>
     </div>
   );