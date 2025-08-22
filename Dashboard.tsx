import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Users, Bot, Trash2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { motion } from 'framer-motion';
import TransactionFeed from '../Finance/TransactionFeed';
import DashboardCharts from './DashboardCharts';
import ConfirmationModal from '../common/ConfirmationModal';

const Dashboard: React.FC = () => {
  const { state, dispatch, t } = useApp();
  const [showClearMockDataModal, setShowClearMockDataModal] = useState(false);

  const totalIncome = state.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const wellbeingScore = (() => {
    const financialHealth = totalIncome > 0 ? Math.max(0, (balance / totalIncome)) * 50 : 0;
    const taskHealth = state.tasks.length > 0 ? (state.tasks.filter(t => t.completed).length / state.tasks.length) * 30 : 30;
    const healthLogHealth = state.healthLogs.length > 5 ? 20 : (state.healthLogs.length / 5) * 20;
    return Math.min(100, Math.round(financialHealth + taskHealth + healthLogHealth));
  })();

  const stats = [
    { title: 'Monthly Income', value: `৳${totalIncome.toLocaleString()}`, icon: TrendingUp, color: 'text-green-400 dark:text-green-400', bgColor: 'bg-green-500/10' },
    { title: 'Monthly Expenses', value: `৳${totalExpenses.toLocaleString()}`, icon: TrendingDown, color: 'text-red-400 dark:text-red-400', bgColor: 'bg-red-500/10' },
    { title: 'Balance', value: `৳${balance.toLocaleString()}`, icon: DollarSign, color: balance >= 0 ? 'text-green-400 dark:text-green-400' : 'text-red-400 dark:text-red-400', bgColor: balance >= 0 ? 'bg-green-500/10' : 'bg-red-500/10' },
    { title: 'Family Members', value: state.members.length.toString(), icon: Users, color: 'text-blue-400 dark:text-blue-400', bgColor: 'bg-blue-500/10' }
  ];

  const handleClearMockData = () => {
    dispatch({ type: 'CLEAR_MOCK_DATA' });
    setShowClearMockDataModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-800 dark:text-white mb-2">{t('dashboard.welcome')} {state.members[0]?.name || 'User'}!</h1>
          <p className="text-dark-500 dark:text-gray-400">{t('dashboard.overview')}</p>
        </div>
        {state.isInitialMockData && (
          <button onClick={() => setShowClearMockDataModal(true)} className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg hover:bg-red-500/20">
            <Trash2 size={14} /> {t('dashboard.clearMockData')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-dark-200 dark:border-dark-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-500 dark:text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-dark-800 dark:text-white text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <DashboardCharts />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-dark-200 dark:border-dark-700 flex flex-col">
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-dark-800 dark:text-white mb-4">Family Wellbeing</h3>
                <div className="flex items-center justify-center my-6">
                    <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" className="text-dark-200 dark:text-dark-700" strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={wellbeingScore > 75 ? '#10b981' : wellbeingScore > 40 ? '#f59e0b' : '#ef4444'} strokeWidth="3" strokeDasharray={`${wellbeingScore}, 100`} strokeLinecap="round" transform="rotate(-90 18 18)" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-dark-800 dark:text-white">{wellbeingScore}</span>
                        <span className="text-sm text-dark-500 dark:text-gray-400">Score</span>
                    </div>
                    </div>
                </div>
                <div className="text-center text-sm text-dark-600 dark:text-gray-300">
                    A score based on financial health, task completion, and health activities.
                </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-4 mt-6 border border-purple-500">
                <div className="flex items-center space-x-3 mb-3">
                    <Bot className="w-6 h-6 text-white" />
                    <h3 className="text-lg font-semibold text-white">Singularity AI Assistant</h3>
                </div>
                <p className="text-sm text-blue-200 mb-4">
                    Need help? Ask me to analyze your spending or suggest a budget plan.
                </p>
                <button 
                    onClick={() => dispatch({ type: 'SET_ACTIVE_SECTION', payload: 'ai' })}
                    className="w-full text-center bg-white/20 text-white font-semibold py-2 rounded-lg hover:bg-white/30 transition-colors"
                >
                    Ask AI
                </button>
            </motion.div>
        </motion.div>
      </div>

      <TransactionFeed title="Recent Financial Activities" />
      {showClearMockDataModal && (
        <ConfirmationModal
          title="Clear All Mock Data"
          message={<p>This will permanently delete all sample data and allow you to start fresh. <br/> <strong className="text-red-400">This action cannot be undone.</strong></p>}
          onClose={() => setShowClearMockDataModal(false)}
          onConfirm={handleClearMockData}
          confirmText="Delete Mock Data"
          confirmRequiresTyping="DeleTe"
        />
      )}
    </div>
  );
};

export default Dashboard;
