import React, { useState } from 'react';
import { Plus, Package, AlertTriangle, ChefHat, Bot, Loader } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { motion } from 'framer-motion';
import { format, isBefore, addDays } from 'date-fns';
import { PantryItem } from '../../types';
import PantryItemForm from './PantryItemForm';
import { aiService } from '../../services/aiService';
import ReactMarkdown from 'react-markdown';

const PantryItemCard: React.FC<{ item: PantryItem, index: number }> = ({ item, index }) => {
  const isExpiringSoon = item.expiryDate && isBefore(new Date(item.expiryDate), addDays(new Date(), 3));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-dark-800 rounded-xl border ${isExpiringSoon ? 'border-yellow-500/50' : 'border-dark-700'} p-4 flex items-center justify-between`}
    >
      <div>
        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
        <p className="text-gray-400 text-sm">{item.quantity} {item.unit}</p>
      </div>
      {item.expiryDate && (
        <div className={`text-sm flex items-center space-x-2 ${isExpiringSoon ? 'text-yellow-400' : 'text-gray-400'}`}>
          {isExpiringSoon && <AlertTriangle className="w-4 h-4" />}
          <span>Expires: {format(new Date(item.expiryDate), 'MMM dd')}</span>
        </div>
      )}
    </motion.div>
  );
};

const Pantry: React.FC = () => {
  const { state } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [recipeSuggestion, setRecipeSuggestion] = useState('');
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
  
  const expiringSoonCount = state.pantryItems.filter(item => item.expiryDate && isBefore(new Date(item.expiryDate), addDays(new Date(), 3))).length;

  const handleGetRecipe = async () => {
    setShowRecipeModal(true);
    setIsLoadingRecipe(true);
    const pantryList = state.pantryItems.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ');
    const prompt = `I have the following items in my pantry: ${pantryList}. Please suggest a simple and delicious Bengali recipe I can make with these. Provide ingredients and step-by-step instructions.`;
    const response = await aiService.chat(prompt);
    setRecipeSuggestion(response);
    setIsLoadingRecipe(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Pantry</h1>
          <p className="text-gray-400">Manage your kitchen inventory and shopping list.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleGetRecipe} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <ChefHat className="w-4 h-4" />
            <span>AI Recipe Suggestion</span>
          </button>
          <button onClick={() => setShowForm(true)} className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 flex items-center justify-between"><div className="flex items-center space-x-4"><div className="p-3 rounded-lg bg-blue-500/10"><Package className="w-6 h-6 text-blue-400" /></div><div><p className="text-gray-400 text-sm">Total Items</p><p className="text-white text-2xl font-bold">{state.pantryItems.length}</p></div></div></div>
        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 flex items-center justify-between"><div className="flex items-center space-x-4"><div className="p-3 rounded-lg bg-yellow-500/10"><AlertTriangle className="w-6 h-6 text-yellow-400" /></div><div><p className="text-gray-400 text-sm">Expiring Soon</p><p className="text-white text-2xl font-bold">{expiringSoonCount}</p></div></div></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.pantryItems.map((item, index) => (<PantryItemCard key={item.id} item={item} index={index} />))}
      </div>
      
      {showForm && <PantryItemForm onClose={() => setShowForm(false)} />}
      
      {showRecipeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-dark-700"><div className="flex items-center space-x-3"><Bot className="w-6 h-6 text-green-400" /><h2 className="text-xl font-semibold text-white">AI Recipe Suggestion</h2></div><button onClick={() => setShowRecipeModal(false)} className="p-2 hover:bg-dark-700 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button></div>
            <div className="p-6 overflow-y-auto">
              {isLoadingRecipe ? (
                <div className="flex items-center justify-center space-x-3 py-16"><Loader className="w-8 h-8 animate-spin text-primary-400" /><span className="text-lg text-gray-300">Generating your recipe...</span></div>
              ) : (
                <div className="prose prose-sm prose-invert max-w-none"><ReactMarkdown>{recipeSuggestion}</ReactMarkdown></div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pantry;
