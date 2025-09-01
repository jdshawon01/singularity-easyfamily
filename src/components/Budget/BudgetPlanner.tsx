@@ .. @@
   return (
   )
-    <div className="p-6 space-y-6">
+    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
         <div>
-          <h1 className="text-2xl font-bold text-white mb-2">Budget Planner</h1>
-          <p className="text-gray-400">Plan and track your family budget effectively</p>
+          <h1 className="text-xl lg:text-2xl font-bold text-white mb-2">Budget Planner</h1>
+          <p className="text-sm lg:text-base text-gray-400">Plan and track your family budget effectively</p>
         </div>
       </div>
       <PreBudgetPlanner />
     </div>
   );