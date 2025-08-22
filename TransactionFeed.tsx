import React, { useState, useMemo } from 'react';
import { Search, Calendar, Users, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Transaction, Member } from '../../types';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval } from 'date-fns';
import Select, { MultiValue } from 'react-select';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import TransactionTable from './TransactionTable';
import TransactionModal from '../Calendar/TransactionModal';
import ConfirmationModal from '../common/ConfirmationModal';

interface TransactionFeedProps {
  title: string;
}

interface MemberOption {
  value: string;
  label: string;
}

const TransactionFeed: React.FC<TransactionFeedProps> = ({ title }) => {
  const { state, dispatch, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<MultiValue<MemberOption>>([]);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [activeDateFilter, setActiveDateFilter] = useState<string>('all');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransactionId, setDeletingTransactionId] = useState<string | null>(null);

  const memberOptions: MemberOption[] = state.members.map(m => ({ value: m.id, label: m.name }));

  const getMemberName = (id: string) => state.members.find(m => m.id === id)?.name || 'Family';

  const filteredTransactions = useMemo(() => {
    return state.transactions.filter(transaction => {
      const searchMatch = searchTerm.toLowerCase() === '' ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (transaction.memberIds && transaction.memberIds.some(id => getMemberName(id).toLowerCase().includes(searchTerm.toLowerCase())));

      const memberMatch = selectedMembers.length === 0 ||
        (transaction.memberIds && transaction.memberIds.some(id => selectedMembers.some(sm => sm.value === id))) ||
        (transaction.memberIds?.includes('family') && selectedMembers.some(sm => sm.value === 'family'));

      const dateMatch = activeDateFilter === 'all' || (dateRange.from && isWithinInterval(new Date(transaction.date), { start: dateRange.from, end: dateRange.to || dateRange.from }));

      return searchMatch && memberMatch && dateMatch;
    });
  }, [searchTerm, selectedMembers, dateRange, activeDateFilter, state.transactions]);

  const setDateFilter = (filter: string) => {
    setActiveDateFilter(filter);
    const today = new Date();
    switch (filter) {
      case 'week': setDateRange({ from: startOfWeek(today), to: endOfWeek(today) }); break;
      case 'month': setDateRange({ from: startOfMonth(today), to: endOfMonth(today) }); break;
      case 'year': setDateRange({ from: startOfYear(today), to: endOfYear(today) }); break;
      default: setDateRange({ from: undefined, to: undefined });
    }
    setShowDatePicker(false);
  };

  const handleDaySelect = (range: { from: Date | undefined; to: Date | undefined } | undefined) => {
    if (range) {
      setDateRange(range);
      if (range.from && range.to) {
        setShowDatePicker(false);
        setActiveDateFilter('custom');
      }
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = (id: string) => {
    setDeletingTransactionId(id);
  };

  const confirmDelete = () => {
    if (deletingTransactionId) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: deletingTransactionId });
      setDeletingTransactionId(null);
    }
  };

  const selectStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }),
    menu: (styles: any) => ({ ...styles, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }),
    option: (styles: any, { isFocused, isSelected }: any) => ({ ...styles, backgroundColor: isSelected ? 'var(--primary-color)' : isFocused ? 'var(--bg-tertiary)' : 'var(--bg-secondary)', color: 'var(--text-primary)' }),
    multiValue: (styles: any) => ({ ...styles, backgroundColor: 'var(--bg-tertiary)' }),
    multiValueLabel: (styles: any) => ({ ...styles, color: 'var(--text-primary)' }),
    multiValueRemove: (styles: any) => ({ ...styles, color: '#9ca3af', ':hover': { backgroundColor: '#ef4444', color: 'white' } }),
    placeholder: (styles: any) => ({ ...styles, color: '#64748b' }),
    input: (styles: any) => ({ ...styles, color: 'var(--text-primary)' }),
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-200 dark:border-dark-700">
      <div className="p-6 border-b border-dark-200 dark:border-dark-700">
        <h3 className="text-lg font-semibold text-dark-800 dark:text-white mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-dark-100 dark:bg-dark-700 border border-dark-200 dark:border-dark-600 rounded-lg pl-10 pr-4 py-2 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <Select
            isMulti
            options={memberOptions}
            value={selectedMembers}
            onChange={setSelectedMembers}
            styles={selectStyles}
            placeholder={
              <div className="flex items-center gap-2 text-gray-400">
                <Users size={16} /> Filter by member...
              </div>
            }
            classNamePrefix="react-select"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button onClick={() => setDateFilter('all')} className={`px-3 py-1 text-sm rounded-full ${activeDateFilter === 'all' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>All Time</button>
          <button onClick={() => setDateFilter('week')} className={`px-3 py-1 text-sm rounded-full ${activeDateFilter === 'week' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>This Week</button>
          <button onClick={() => setDateFilter('month')} className={`px-3 py-1 text-sm rounded-full ${activeDateFilter === 'month' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>This Month</button>
          <button onClick={() => setDateFilter('year')} className={`px-3 py-1 text-sm rounded-full ${activeDateFilter === 'year' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>This Year</button>
          <div className="relative">
            <button onClick={() => setShowDatePicker(!showDatePicker)} className={`flex items-center gap-2 px-3 py-1 text-sm rounded-full ${activeDateFilter === 'custom' ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-gray-300'}`}>
              <Calendar size={14} />
              {dateRange.from && dateRange.to ? `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'MMM d')}` : 'Custom'}
            </button>
            {showDatePicker && (
              <div className="absolute top-full right-0 mt-2 z-10 bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-lg p-2 shadow-lg">
                <style>{`
                  .rdp { 
                    --rdp-cell-size: 35px; 
                    --rdp-background-color: var(--bg-primary); 
                    --rdp-accent-color: #3b82f6; 
                    --rdp-color: var(--text-primary); 
                    --rdp-border: 1px solid var(--border-color);
                  }
                  .rdp-day_selected { background-color: #3b82f6 !important; color: white !important; }
                `}</style>
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDaySelect as any}
                  numberOfMonths={1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <TransactionTable transactions={filteredTransactions} onEdit={handleEdit} onDelete={handleDelete} />
      {editingTransaction && (
        <TransactionModal
          date={editingTransaction.date}
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}
      {deletingTransactionId && (
        <ConfirmationModal
          title="Delete Transaction"
          message="Are you sure you want to delete this transaction? This action cannot be undone."
          onClose={() => setDeletingTransactionId(null)}
          onConfirm={confirmDelete}
          confirmText="Delete"
        />
      )}
    </div>
  );
};

export default TransactionFeed;
