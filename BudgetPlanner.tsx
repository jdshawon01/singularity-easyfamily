import React, { useState, useEffect } from 'react';
import { Plus, Target, AlertTriangle, TrendingUp, Info, RefreshCw } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { motion } from 'framer-motion';
import BudgetForm from './BudgetForm';
import BudgetProgress from './BudgetProgress';
import { format } from 'date-fns';

interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  period: 'monthly' | 'yearly';
}

const budgetConfig = [
  { name: 'Rent', range: '25-30%', defaultPercent: 27.1 },
  { name: 'Food & Groceries', range: '30-35%', defaultPercent: 32.0 },
  { name: 'Transportation', range: '8-10%', defaultPercent: 9.0 },
  { name: 'Utilities', range: '5-7%', defaultPercent: 6.3 },
  { name: 'Education', range: '8-12%', defaultPercent: 10.4 },
  { name: 'Healthcare', range: '5-8%', defaultPercent: 8.0 },
  { name: 'Emergency Fund', range: '0-3%', defaultPercent: 3.1 },
  { name: 'Entertainment', range: '0-2%', defaultPercent: 0.0 },
];

const PreBudgetPlanner: React.FC = () => {
  const [totalIncome, setTotalIncome] = useState(24999);
  const [allocations, setAllocations] = useState<Record<string, number>>({});

  const calculateDefaults = (income: number) => {
    const newAllocations: Record<string, number> = {};
    budgetConfig.forEach(cat => {
      newAllocations[cat.name] = (income * cat.defaultPercent) / 100;
    });
    setAllocations(newAllocations);
  };

  useEffect(() => {
    calculateDefaults(totalIncome);
  }, []);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const income = Number(e.target.value);
    setTotalIncome(income);
    calculateDefaults(income);
  };
  
  const handleAllocationChange = (category: string, value: number) => {
    setAllocations(prev => ({ ...prev, [category]: value }));
  };

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-2">Pre-Budget Planner</h3>
      <p className="text-gray-400 mb-4">Plan your monthly budget based on your total income for {format(new Date(), 'MMMM yyyy')}.</p>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Enter Your Total Monthly Income (৳)</label>
        <input type="number" value={totalIncome} onChange={handleIncomeChange} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-primary-400"><Info size={18} /><h4 className="font-semibold">Smart Recommendations</h4></div>
        <div className="flex items-center gap-4">
          <button onClick={() => calculateDefaults(totalIncome)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"><RefreshCw size={14} /> Reset</button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700">Save Plan</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {budgetConfig.map(cat => {
          const allocatedAmount = allocations[cat.name] || 0;
          const percentage = totalIncome > 0 ? (allocatedAmount / totalIncome) * 100 : 0;
          return (
            <div key={cat.name} className="bg-dark-900/50 border border-dark-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">Recommended: {cat.range}</p>
              <h5 className="text-white font-semibold my-1">{cat.name}</h5>
              <p className="text-2xl font-bold text-primary-400 my-2">৳{Math.round(allocatedAmount).toLocaleString()}</p>
              <div className="flex items-center gap-2">
                <input type="range" min="0" max={totalIncome/2} value={allocatedAmount} onChange={(e) => handleAllocationChange(cat.name, Number(e.target.value))} className="w-full h-1 bg-dark-600 rounded-lg appearance-none cursor-pointer" />
                <span className="text-sm text-gray-300 w-16 text-right">{percentage.toFixed(1)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const BudgetPlanner: React.FC = () => {
  const { state } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Budget Planner</h1>
          <p className="text-gray-400">Plan and track your family budget effectively</p>
        </div>
      </div>
      <PreBudgetPlanner />
    </div>
  );
};

export default BudgetPlanner;
