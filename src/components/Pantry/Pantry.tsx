@@ .. @@
   return (
   )
-    <div className="p-6 space-y-6">
+    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
         <div>
-          <h1 className="text-2xl font-bold text-white mb-2">Pantry</h1>
-          <p className="text-gray-400">Manage your kitchen inventory and shopping list.</p>
+          <h1 className="text-xl lg:text-2xl font-bold text-white mb-2">Pantry</h1>
+          <p className="text-sm lg:text-base text-gray-400">Manage your kitchen inventory and shopping list.</p>
         </div>
-        <div className="flex gap-3">
-          <button onClick={handleGetRecipe} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
+        <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 w-full sm:w-auto">
+          <button onClick={handleGetRecipe} className="flex items-center justify-center space-x-2 px-4 py-3 lg:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors touch-manipulation">
             <ChefHat className="w-4 h-4" />
-            <span>AI Recipe Suggestion</span>
+            <span className="text-sm lg:text-base">AI Recipe</span>
           </button>
-          <button onClick={() => setShowForm(true)} className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
+          <button onClick={() => setShowForm(true)} className="flex items-center justify-center space-x-2 px-4 py-3 lg:py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors touch-manipulation">
             <Plus className="w-4 h-4" />
-            <span>Add Item</span>
+            <span className="text-sm lg:text-base">Add Item</span>
           </button>
         </div>
       </div>

-      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
-        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 flex items-center justify-between"><div className="flex items-center space-x-4"><div className="p-3 rounded-lg bg-blue-500/10"><Package className="w-6 h-6 text-blue-400" /></div><div><p className="text-gray-400 text-sm">Total Items</p><p className="text-white text-2xl font-bold">{state.pantryItems.length}</p></div></div></div>
-        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 flex items-center justify-between"><div className="flex items-center space-x-4"><div className="p-3 rounded-lg bg-yellow-500/10"><AlertTriangle className="w-6 h-6 text-yellow-400" /></div><div><p className="text-gray-400 text-sm">Expiring Soon</p><p className="text-white text-2xl font-bold">{expiringSoonCount}</p></div></div></div>
+      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
+        <div className="bg-dark-800 rounded-xl p-4 lg:p-6 border border-dark-700 flex items-center justify-between"><div className="flex items-center space-x-3 lg:space-x-4"><div className="p-2 lg:p-3 rounded-lg bg-blue-500/10"><Package className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" /></div><div><p className="text-gray-400 text-xs lg:text-sm">Total Items</p><p className="text-white text-lg lg:text-2xl font-bold">{state.pantryItems.length}</p></div></div></div>
+        <div className="bg-dark-800 rounded-xl p-4 lg:p-6 border border-dark-700 flex items-center justify-between"><div className="flex items-center space-x-3 lg:space-x-4"><div className="p-2 lg:p-3 rounded-lg bg-yellow-500/10"><AlertTriangle className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400" /></div><div><p className="text-gray-400 text-xs lg:text-sm">Expiring Soon</p><p className="text-white text-lg lg:text-2xl font-bold">{expiringSoonCount}</p></div></div></div>
       </div>

-      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
+      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
         {state.pantryItems.map((item, index) => (<PantryItemCard key={item.id} item={item} index={index} />))}
       </div>