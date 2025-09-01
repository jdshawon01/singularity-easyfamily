@@ .. @@
   return (
-    <div className="p-6 space-y-6">
+    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
         <div>
-          <h1 className="text-2xl font-bold text-white mb-2">Documents</h1>
-          <p className="text-gray-400">Store and organize your important family documents.</p>
+          <h1 className="text-xl lg:text-2xl font-bold text-white mb-2">Documents</h1>
+          <p className="text-sm lg:text-base text-gray-400">Store and organize your important family documents.</p>
         </div>
-        <div className="flex gap-3">
-          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
+        <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 w-full sm:w-auto">
+          <button className="flex items-center justify-center space-x-2 px-4 py-3 lg:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors touch-manipulation">
             <ScanLine className="w-4 h-4" />
-            <span>Scan with AI OCR</span>
+            <span className="text-sm lg:text-base">AI OCR Scan</span>
           </button>
           <button
             onClick={() => setShowForm(true)}
-            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
+            className="flex items-center justify-center space-x-2 px-4 py-3 lg:py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors touch-manipulation"
           >
             <Plus className="w-4 h-4" />
-            <span>Add Document</span>
+            <span className="text-sm lg:text-base">Add Document</span>
           </button>
         </div>
       </div>

-      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
+      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
         {state.documents.map((doc, index) => (
           <DocumentCard key={doc.id} doc={doc} index={index} />
         ))}
       </div>