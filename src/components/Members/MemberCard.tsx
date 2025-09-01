@@ .. @@
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: index * 0.1 }}
-      className="bg-dark-800 rounded-xl border border-dark-700 p-6"
+      className="bg-dark-800 rounded-xl border border-dark-700 p-4 lg:p-6"
     >
       <div className="flex items-center justify-between mb-4">
-        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
+        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
           <span className="text-white text-lg font-semibold">
             {member.name.charAt(0).toUpperCase()}
           </span>
         </div>
         <div className={`p-2 rounded-lg ${getRoleColor(member.role)}`}>
-          <Icon className="w-4 h-4" />
+          <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
         </div>
       </div>
       
-      <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
-      <p className="text-gray-400 text-sm capitalize mb-3">{member.role}</p>
+      <h3 className="text-base lg:text-lg font-semibold text-white mb-1">{member.name}</h3>
+      <p className="text-gray-400 text-xs lg:text-sm capitalize mb-3">{member.role}</p>
       
       {member.age && (
-        <div className="flex items-center space-x-2 text-gray-300 text-sm">
+        <div className="flex items-center space-x-2 text-gray-300 text-xs lg:text-sm">
           <Calendar className="w-4 h-4" />
           <span>{member.age} years old</span>
         </div>
       )}
     </motion.div>
   );