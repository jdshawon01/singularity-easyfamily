@@ .. @@
   return (
-    <div className="p-6 h-full flex flex-col">
-      <h1 className="text-2xl font-bold text-white mb-2">Singularity ∞ AI</h1>
-      <p className="text-gray-400 mb-6">Your intelligent family assistant with advanced capabilities</p>
+    <div className="p-4 lg:p-6 h-full flex flex-col">
+      <h1 className="text-xl lg:text-2xl font-bold text-white mb-2">Singularity ∞ AI</h1>
+      <p className="text-sm lg:text-base text-gray-400 mb-4 lg:mb-6">Your intelligent family assistant with advanced capabilities</p>

-      <div className="flex-1 bg-dark-800 rounded-xl border border-dark-700 flex flex-col overflow-hidden">
-        <div className="flex-1 overflow-y-auto p-6 space-y-4">
+      <div className="flex-1 bg-dark-800 rounded-xl border border-dark-700 flex flex-col overflow-hidden min-h-0">
+        <div className="flex-1 overflow-y-auto p-3 lg:p-6 space-y-3 lg:space-y-4">
           {messages.map((message) => (
-            <motion.div key={message.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`flex group ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
-              <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
-                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-primary-600' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
+            <motion.div key={message.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`flex group ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
+              <div className={`flex items-start space-x-2 lg:space-x-3 max-w-full lg:max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
+                <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-primary-600' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
                   {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                 </div>
                 {editingMessage?.id === message.id ? (
                   <div className="flex-1">
-                    <textarea defaultValue={editingMessage.content} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleEditSend(e.currentTarget.value); } }} autoFocus className="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-white" />
+                    <textarea defaultValue={editingMessage.content} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleEditSend(e.currentTarget.value); } }} autoFocus className="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-white text-sm lg:text-base" />
                     <div className="text-xs mt-1">
-                      <button onClick={() => handleEditSend((document.querySelector(`textarea`) as HTMLTextAreaElement).value)} className="text-primary-400">Save & Submit</button> · <button onClick={() => setEditingMessage(null)} className="text-gray-400">Cancel</button>
+                      <button onClick={() => handleEditSend((document.querySelector(`textarea`) as HTMLTextAreaElement).value)} className="text-primary-400 touch-manipulation">Save & Submit</button> · <button onClick={() => setEditingMessage(null)} className="text-gray-400 touch-manipulation">Cancel</button>
                     </div>
                   </div>
                 ) : (
-                  <div className={`px-4 py-3 rounded-xl ${message.type === 'user' ? 'bg-primary-600 text-white' : message.isError ? 'bg-red-900/50 border border-red-500/30 text-red-300' : 'bg-dark-700 text-gray-100'}`}>
+                  <div className={`px-3 lg:px-4 py-2 lg:py-3 rounded-xl max-w-[85%] lg:max-w-none ${message.type === 'user' ? 'bg-primary-600 text-white' : message.isError ? 'bg-red-900/50 border border-red-500/30 text-red-300' : 'bg-dark-700 text-gray-100'}`}>
                     {message.isError ? (
                       <div className="flex items-start gap-3">
                         <AlertTriangle className="w-5 h-5 mt-1 text-red-400 flex-shrink-0" />
                         <div>
-                          <h4 className="font-bold mb-1">AI Assistant Error</h4>
-                          <p className="text-sm">{message.content}</p>
+                          <h4 className="font-bold mb-1 text-sm lg:text-base">AI Assistant Error</h4>
+                          <p className="text-xs lg:text-sm">{message.content}</p>
                         </div>
                       </div>
                     ) : (
-                      <div className="prose prose-sm prose-invert max-w-none">
+                      <div className="prose prose-xs lg:prose-sm prose-invert max-w-none">
                         <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={{ code: CodeBlock }}>
                           {message.content}
                         </ReactMarkdown>
                       </div>
                     )}
-                    <p className="text-xs mt-2 opacity-70">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
+                    <p className="text-xs mt-1 lg:mt-2 opacity-70">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                     {message.suggestions && message.suggestions.length > 0 && (
-                      <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
+                      <div className="mt-2 lg:mt-3 pt-2 lg:pt-3 border-t border-white/10 flex flex-wrap gap-1 lg:gap-2">
                         {message.suggestions.map((s, i) => (
-                          <button key={i} onClick={() => handleInitialSend(s)} className="px-3 py-1 text-xs bg-dark-600 hover:bg-dark-500 rounded-full">{s}</button>
+                          <button key={i} onClick={() => handleInitialSend(s)} className="px-2 lg:px-3 py-1 text-xs bg-dark-600 hover:bg-dark-500 rounded-full touch-manipulation">{s}</button>
                         ))}
                       </div>
                     )}
                   </div>
                 )}
                 {message.type === 'user' && !editingMessage && (
-                  <button onClick={() => setEditingMessage(message)} className="p-1 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
+                  <button onClick={() => setEditingMessage(message)} className="p-2 lg:p-1 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity touch-manipulation">
                     <Edit size={14} />
                   </button>
                 )}
               </div>
             </motion.div>
           ))}
-          {isLoading && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start"><div className="flex items-start space-x-3"><div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div><div className="bg-dark-700 px-4 py-3 rounded-xl"><div className="flex items-center space-x-2"><Loader className="w-4 h-4 animate-spin text-primary-400" /><span className="text-gray-300">Thinking...</span></div></div></div></motion.div>}
+          {isLoading && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start"><div className="flex items-start space-x-2 lg:space-x-3"><div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div><div className="bg-dark-700 px-3 lg:px-4 py-2 lg:py-3 rounded-xl"><div className="flex items-center space-x-2"><Loader className="w-4 h-4 animate-spin text-primary-400" /><span className="text-sm lg:text-base text-gray-300">Thinking...</span></div></div></div></motion.div>}
           <div ref={messagesEndRef} />
         </div>

-        <div className="p-4 border-t border-dark-700">
-          <div className="bg-dark-700 border border-dark-600 rounded-xl flex items-center p-2">
-            <button className="p-2 text-gray-400 hover:text-white"><Upload size={18} /></button>
-            <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleInitialSend(input); } }} placeholder="Ask me anything..." className="flex-1 px-2 py-1 bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none" rows={1} disabled={isLoading} />
-            <button className="p-2 text-gray-400 hover:text-white"><Mic size={18} /></button>
-            <button onClick={() => handleInitialSend(input)} disabled={!input.trim() || isLoading} className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"><Send size={18} /></button>
+        <div className="p-3 lg:p-4 border-t border-dark-700">
+          <div className="bg-dark-700 border border-dark-600 rounded-xl flex items-end p-2 lg:p-2">
+            <button className="p-3 lg:p-2 text-gray-400 hover:text-white touch-manipulation"><Upload size={20} className="lg:w-[18px] lg:h-[18px]" /></button>
+            <textarea 
+              value={input} 
+              onChange={(e) => setInput(e.target.value)} 
+              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleInitialSend(input); } }} 
+              placeholder="Ask me anything..." 
+              className="flex-1 px-2 py-2 lg:py-1 bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none text-base lg:text-sm" 
+              rows={1} 
+              disabled={isLoading}
+              style={{ minHeight: '44px' }}
+            />
+            <button className="p-3 lg:p-2 text-gray-400 hover:text-white touch-manipulation"><Mic size={20} className="lg:w-[18px] lg:h-[18px]" /></button>
+            <button onClick={() => handleInitialSend(input)} disabled={!input.trim() || isLoading} className="p-3 lg:p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 touch-manipulation"><Send size={20} className="lg:w-[18px] lg:h-[18px]" /></button>
           </div>
         </div>
       </div>