import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Download } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { motion } from 'framer-motion';
import FinancialAnalytics from './FinancialAnalytics';
import HealthAnalytics from './HealthAnalytics';
import TaskAnalytics from './TaskAnalytics';

const Analytics: React.FC = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('financial');

  const tabs = [
    { id: 'financial', label: 'Financial', icon: TrendingUp },
    { id: 'health', label: 'Health', icon: BarChart3 },
    { id: 'tasks', label: 'Tasks', icon: PieChart }
  ];

  const stats = [
    {
      title: 'Total Transactions',
      value: state.transactions.length.toString(),
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Health Logs',
      value: state.healthLogs.length.toString(),
      icon: BarChart3,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    },
    {
      title: 'Tasks Completed',
      value: state.tasks.filter(t => t.completed).length.toString(),
      icon: PieChart,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">Insights and analytics for your family data</p>
        </div>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-800 rounded-xl p-6 border border-dark-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-dark-800 rounded-xl border border-dark-700">
        <div className="border-b border-dark-700">
          <div className="flex space-x-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary-400 border-b-2 border-primary-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'financial' && <FinancialAnalytics />}
          {activeTab === 'health' && <HealthAnalytics />}
          {activeTab === 'tasks' && <TaskAnalytics />}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
