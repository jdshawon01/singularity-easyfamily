import React, { useState, useEffect } from 'react';
import { X, DollarSign } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Transaction } from '../../types';
import Select, { MultiValue } from 'react-select';
import { format } from 'date-fns';

interface TransactionModalProps {
  date: Date;
  transaction?: Transaction | null;
  onClose: () => void;
}

interface MemberOption {
  value: string;
  label: string;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ date: initialDate, transaction, onClose }) => {
  const { state, dispatch } = useApp();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(initialDate);
  const [selectedMembers, setSelectedMembers] = useState<MultiValue<MemberOption>>([]);

  const memberOptions: MemberOption[] = [
    { value: 'family', label: 'For Family' },
    ...state.members.map(m => ({ value: m.id, label: m.name }))
  ];

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setAmount(transaction.amount.toString());
      setCategory(transaction.category);
      setDescription(transaction.description);
      setDate(new Date(transaction.date));
      const currentMembers = memberOptions.filter(opt => transaction.memberIds?.includes(opt.value));
      setSelectedMembers(currentMembers);
    } else {
      setDate(initialDate);
    }
  }, [transaction, initialDate]);

  const categories = {
    income: ['Salary', 'Business', 'Investment', 'Freelance', 'Gift', 'Bonus', 'Other'],
    expense: ['Food & Dining', 'Transportation', 'Utilities', 'Healthcare', 'Education', 'Entertainment', 'Shopping', 'Bills', 'Other']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !description) return;

    const newTransaction: Transaction = {
      id: transaction ? transaction.id : Date.now().toString(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
      memberIds: selectedMembers.map(m => m.value)
    };

    if (transaction) {
      dispatch({ type: 'UPDATE_TRANSACTION', payload: newTransaction });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    }
    onClose();
  };
  
  const selectStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }),
    menu: (styles: any) => ({ ...styles, backgroundColor: '#1e293b', border: '1px solid #334155' }),
    option: (styles: any, { isFocused, isSelected }: any) => ({ ...styles, backgroundColor: isSelected ? '#2563eb' : isFocused ? '#334155' : '#1e293b', color: '#fff' }),
    multiValue: (styles: any) => ({ ...styles, backgroundColor: '#334155' }),
    multiValueLabel: (styles: any) => ({ ...styles, color: '#fff' }),
    multiValueRemove: (styles: any) => ({ ...styles, color: '#9ca3af', ':hover': { backgroundColor: '#ef4444', color: 'white' } }),
    placeholder: (styles: any) => ({ ...styles, color: '#9ca3af' }),
    input: (styles: any) => ({ ...styles, color: '#fff' }),
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-6 h-6 text-primary-400" />
            <h2 className="text-xl font-semibold text-white">{transaction ? 'Edit' : 'Add'} Transaction</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="flex space-x-2">
            <button type="button" onClick={() => setType('income')} className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${type === 'income' ? 'bg-green-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}>Income</button>
            <button type="button" onClick={() => setType('expense')} className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${type === 'expense' ? 'bg-red-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}>Expense</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount (৳)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" placeholder="0.00" step="0.01" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
              <input type="date" value={format(date, 'yyyy-MM-dd')} onChange={(e) => setDate(new Date(e.target.value))} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" required />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" required>
              <option value="">Select category</option>
              {categories[type].map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" placeholder="Brief description" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Involved Family Members</label>
            <Select isMulti options={memberOptions} value={selectedMembers} onChange={setSelectedMembers} styles={selectStyles} placeholder="Select members or 'For Family'" />
          </div>

          <div className="flex space-x-3 pt-4 border-t border-dark-700">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">{transaction ? 'Update' : 'Add'} Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
