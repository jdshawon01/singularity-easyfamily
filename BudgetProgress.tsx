import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  period: 'monthly' | 'yearly';
}

interface BudgetProgressProps {
  budgets: Budget[];
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({ budgets }) => {
  return (
    <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Budget Progress</h3>
      
      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.allocated) * 100;
          const isOverBudget = budget.spent > budget.allocated;
          const remaining = budget.allocated - budget.spent;
          
          return (
            <div key={budget.id} className="p-4 bg-dark-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">{budget.category}</span>
                  {isOverBudget ? (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  ) : percentage >= 90 ? (
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <span className="text-gray-400 text-sm capitalize">{budget.period}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-300">
                  ৳{budget.spent.toLocaleString()} / ৳{budget.allocated.toLocaleString()}
                </span>
                <span className={`font-medium ${
                  isOverBudget ? 'text-red-400' : percentage >= 90 ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {percentage.toFixed(1)}%
                </span>
              </div>
              
              <div className="w-full bg-dark-600 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isOverBudget ? 'bg-red-500' : percentage >= 90 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className={`${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {remaining >= 0 ? `৳${remaining.toLocaleString()} remaining` : `৳${Math.abs(remaining).toLocaleString()} over budget`}
                </span>
                <span className="text-gray-400">
                  {isOverBudget ? 'Over Budget' : percentage >= 90 ? 'Almost Exceeded' : 'On Track'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetProgress;
