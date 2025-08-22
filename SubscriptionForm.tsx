import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Subscription } from '../../types';

interface SubscriptionFormProps {
  onClose: () => void;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onClose }) => {
  const { dispatch } = useApp();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [renewalDate, setRenewalDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<'Entertainment' | 'Utilities' | 'Work' | 'Other'>('Entertainment');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    const subscription: Subscription = {
      id: Date.now().toString(),
      name,
      amount: parseFloat(amount),
      renewalDate: new Date(renewalDate),
      category,
    };

    dispatch({ type: 'ADD_SUBSCRIPTION', payload: subscription });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-6 h-6 text-primary-400" />
            <h2 className="text-xl font-semibold text-white">Add Subscription</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Amount (৳)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Renewal Date</label>
            <input type="date" value={renewalDate} onChange={(e) => setRenewalDate(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white">
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Add Subscription</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
