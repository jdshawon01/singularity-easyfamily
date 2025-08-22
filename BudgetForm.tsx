import React, { useState } from 'react';
import { X, Target } from 'lucide-react';

interface BudgetFormProps {
  onClose: () => void;
  onAdd: (budget: { category: string; allocated: number; spent: number; period: 'monthly' | 'yearly' }) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ onClose, onAdd }) => {
  const [category, setCategory] = useState('');
  const [allocated, setAllocated] = useState('');
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const categories = [
    'Food & Dining', 'Transportation', 'Utilities', 'Healthcare', 
    'Education', 'Entertainment', 'Shopping', 'Bills', 'Savings', 'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !allocated) return;

    onAdd({
      category,
      allocated: parseFloat(allocated),
      spent: 0,
      period
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-primary-400" />
            <h2 className="text-xl font-semibold text-white">Add Budget</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Allocated Amount (৳)</label>
            <input
              type="number"
              value={allocated}
              onChange={(e) => setAllocated(e.target.value)}
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Period</label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setPeriod('monthly')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  period === 'monthly'
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setPeriod('yearly')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  period === 'yearly'
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;
