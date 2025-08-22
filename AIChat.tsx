import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, Edit, X, Upload, Mic, Copy, Check, AlertTriangle, Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { aiService } from '../../services/aiService';
import { useApp } from '../../contexts/AppContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  suggestions?: string[];
  timestamp: Date;
  isError?: boolean;
}

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const code = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code-snippet.${match ? match[1] : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handlePreview = () => {
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open();
    if (newWindow) newWindow.location.href = url;
    // Do not revoke URL immediately for preview
  };

  return !inline && match ? (
    <div className="relative my-2 bg-dark-800 rounded-lg border border-dark-700">
      <div className="flex items-center justify-between px-4 py-1 bg-dark-900 rounded-t-lg text-xs text-gray-400">
        <span>{match[1]}</span>
        <div className="flex items-center gap-3">
          {['html', 'javascript', 'css'].includes(match[1]) && (
            <button onClick={handlePreview} className="flex items-center gap-1 hover:text-white"><ExternalLink size={14} /> Preview</button>
          )}
          <button onClick={handleDownload} className="flex items-center gap-1 hover:text-white"><Download size={14} /> Download</button>
          <button onClick={handleCopy} className="flex items-center gap-1 hover:text-white">
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
        {code}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const AIChat: React.FC = () => {
  const { state } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m Singularity ∞ AI. How can I assist you today?',
      suggestions: ['Create a budget plan for me', 'What\'s a healthy dinner recipe?', 'Summarize my tasks for this week'],
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (messageContent: string, messageHistory: Message[]) => {
    setIsLoading(true);
    try {
      const context = `Current Section: Singularity ∞ AI Chat. Family Members: ${state.members.length}`;
      const response = await aiService.chat(messageContent, context);
      const isError = response.startsWith('Sorry,') || response.startsWith('It looks like');
      
      const contentParts = response.split('SUGGESTIONS:');
      const mainContent = contentParts[0].trim();
      const suggestions = contentParts[1] ? contentParts[1].split('\n').map(s => s.replace(/^- /, '').trim()).filter(Boolean) : [];

      const aiMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        type: 'ai', 
        content: mainContent, 
        suggestions,
        timestamp: new Date(), 
        isError 
      };
      setMessages([...messageHistory, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { id: (Date.now() + 1).toString(), type: 'ai', content: 'Sorry, I encountered an unexpected error.', timestamp: new Date(), isError: true };
      setMessages([...messageHistory, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitialSend = (content: string) => {
    if (!content.trim() || isLoading) return;
    const userMessage: Message = { id: Date.now().toString(), type: 'user', content, timestamp: new Date() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    handleSend(content, newMessages);
  };

  const handleEditSend = (editedContent: string) => {
    if (!editingMessage) return;
    const messageIndex = messages.findIndex(m => m.id === editingMessage.id);
    const updatedMessages = messages.slice(0, messageIndex);
    const editedMessage: Message = { ...editingMessage, content: editedContent };
    updatedMessages.push(editedMessage);
    setMessages(updatedMessages);
    setEditingMessage(null);
    handleSend(editedContent, updatedMessages);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-2xl font-bold text-white mb-2">Singularity ∞ AI</h1>
      <p className="text-gray-400 mb-6">Your intelligent family assistant with advanced capabilities</p>

      <div className="flex-1 bg-dark-800 rounded-xl border border-dark-700 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <motion.div key={message.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`flex group ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-primary-600' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
                  {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                {editingMessage?.id === message.id ? (
                  <div className="flex-1">
                    <textarea defaultValue={editingMessage.content} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleEditSend(e.currentTarget.value); } }} autoFocus className="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-white" />
                    <div className="text-xs mt-1">
                      <button onClick={() => handleEditSend((document.querySelector(`textarea`) as HTMLTextAreaElement).value)} className="text-primary-400">Save & Submit</button> · <button onClick={() => setEditingMessage(null)} className="text-gray-400">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className={`px-4 py-3 rounded-xl ${message.type === 'user' ? 'bg-primary-600 text-white' : message.isError ? 'bg-red-900/50 border border-red-500/30 text-red-300' : 'bg-dark-700 text-gray-100'}`}>
                    {message.isError ? (
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 mt-1 text-red-400 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold mb-1">AI Assistant Error</h4>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={{ code: CodeBlock }}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )}
                    <p className="text-xs mt-2 opacity-70">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                        {message.suggestions.map((s, i) => (
                          <button key={i} onClick={() => handleInitialSend(s)} className="px-3 py-1 text-xs bg-dark-600 hover:bg-dark-500 rounded-full">{s}</button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {message.type === 'user' && !editingMessage && (
                  <button onClick={() => setEditingMessage(message)} className="p-1 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start"><div className="flex items-start space-x-3"><div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div><div className="bg-dark-700 px-4 py-3 rounded-xl"><div className="flex items-center space-x-2"><Loader className="w-4 h-4 animate-spin text-primary-400" /><span className="text-gray-300">Thinking...</span></div></div></div></motion.div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-dark-700">
          <div className="bg-dark-700 border border-dark-600 rounded-xl flex items-center p-2">
            <button className="p-2 text-gray-400 hover:text-white"><Upload size={18} /></button>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleInitialSend(input); } }} placeholder="Ask me anything..." className="flex-1 px-2 py-1 bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none" rows={1} disabled={isLoading} />
            <button className="p-2 text-gray-400 hover:text-white"><Mic size={18} /></button>
            <button onClick={() => handleInitialSend(input)} disabled={!input.trim() || isLoading} className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"><Send size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
