import React, { useState } from 'react';
import { ChefHat, Bot, Loader, Bookmark, Download, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { aiService } from '../../services/aiService';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const Rannaghor: React.FC = () => {
  const { state } = useApp();
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [recipeSuggestion, setRecipeSuggestion] = useState('');
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);

  const handleGetRecipe = async () => {
    setShowRecipeModal(true);
    setIsLoadingRecipe(true);
    const pantryList = state.pantryItems.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ');
    const prompt = `I have the following items in my pantry: ${pantryList}. Please suggest a simple and delicious Bengali recipe I can make with these. Provide a name, ingredients list, step-by-step instructions, nutritional breakdown (calories, protein, fat), and a health benefits explanation. Format it nicely using Markdown.`;
    const response = await aiService.chat(prompt);
    setRecipeSuggestion(response);
    setIsLoadingRecipe(false);
  };
  
  const handleDownloadRecipe = () => {
    // Create a blob from the markdown content
    const blob = new Blob([recipeSuggestion], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // Suggest a filename based on the recipe title (first line of markdown)
    const recipeTitle = recipeSuggestion.split('\n')[0].replace(/#/g, '').trim() || 'recipe';
    a.download = `${recipeTitle.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-white mb-2">Rannaghor (Kitchen Hub)</h1><p className="text-gray-400">Discover recipes and plan your meals.</p></div>
        <button onClick={handleGetRecipe} className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"><ChefHat className="w-4 h-4" /><span>Get AI Recipe Suggestion</span></button>
      </div>
      <div className="bg-dark-800 rounded-xl border border-dark-700 p-12 text-center">
        <ChefHat className="w-16 h-16 text-primary-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Welcome to your Kitchen Hub</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">Generate recipes based on your pantry, save your favorite meals, and plan your weekly menu with the help of AI.</p>
        <div className="flex justify-center gap-4">
          <button onClick={handleGetRecipe} className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">AI Recipe Generator</button>
          <button className="px-6 py-3 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 flex items-center gap-2"><Bookmark size={18} /> View Saved Recipes</button>
        </div>
      </div>
      {showRecipeModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-dark-700">
              <div className="flex items-center space-x-3"><Bot className="w-6 h-6 text-green-400" /><h2 className="text-xl font-semibold text-white">AI Recipe Suggestion</h2></div>
              <div className="flex items-center gap-2">
                {!isLoadingRecipe && (
                  <button onClick={handleDownloadRecipe} className="p-2 hover:bg-dark-700 rounded-lg" title="Download as .txt"><Download className="w-5 h-5 text-gray-400" /></button>
                )}
                <button onClick={() => setShowRecipeModal(false)} className="p-2 hover:bg-dark-700 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto">
              {isLoadingRecipe ? (
                <div className="flex items-center justify-center space-x-3 py-16"><Loader className="w-8 h-8 animate-spin text-primary-400" /><span className="text-lg text-gray-300">Generating your recipe...</span></div>
              ) : (
                <div className="prose prose-sm prose-invert max-w-none"><ReactMarkdown>{recipeSuggestion}</ReactMarkdown></div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Rannaghor;
