@@ .. @@
   return (
   )
-    <div className="p-6 space-y-6">
+    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
-        <div><h1 className="text-2xl font-bold text-white mb-2">Rannaghor (Kitchen Hub)</h1><p className="text-gray-400">Discover recipes and plan your meals.</p></div>
-        <button onClick={handleGetRecipe} className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"><ChefHat className="w-4 h-4" /><span>Get AI Recipe Suggestion</span></button>
+        <div><h1 className="text-xl lg:text-2xl font-bold text-white mb-2">Rannaghor (Kitchen Hub)</h1><p className="text-sm lg:text-base text-gray-400">Discover recipes and plan your meals.</p></div>
+        <button onClick={handleGetRecipe} className="flex items-center space-x-2 px-4 py-3 lg:py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 touch-manipulation"><ChefHat className="w-4 h-4" /><span className="hidden sm:inline">Get AI Recipe Suggestion</span><span className="sm:hidden">AI Recipe</span></button>
       </div>
-      <div className="bg-dark-800 rounded-xl border border-dark-700 p-12 text-center">
+      <div className="bg-dark-800 rounded-xl border border-dark-700 p-8 lg:p-12 text-center">
         <ChefHat className="w-16 h-16 text-primary-400 mx-auto mb-4" />
-        <h3 className="text-xl font-semibold text-white mb-2">Welcome to your Kitchen Hub</h3>
-        <p className="text-gray-400 mb-6 max-w-md mx-auto">Generate recipes based on your pantry, save your favorite meals, and plan your weekly menu with the help of AI.</p>
-        <div className="flex justify-center gap-4">
-          <button onClick={handleGetRecipe} className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">AI Recipe Generator</button>
-          <button className="px-6 py-3 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 flex items-center gap-2"><Bookmark size={18} /> View Saved Recipes</button>
+        <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">Welcome to your Kitchen Hub</h3>
+        <p className="text-sm lg:text-base text-gray-400 mb-6 max-w-md mx-auto">Generate recipes based on your pantry, save your favorite meals, and plan your weekly menu with the help of AI.</p>
+        <div className="flex flex-col sm:flex-row justify-center gap-3 lg:gap-4">
+          <button onClick={handleGetRecipe} className="px-6 py-4 lg:py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 touch-manipulation">AI Recipe Generator</button>
+          <button className="px-6 py-4 lg:py-3 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 flex items-center justify-center gap-2 touch-manipulation"><Bookmark size={18} /> View Saved Recipes</button>
         </div>
       </div>