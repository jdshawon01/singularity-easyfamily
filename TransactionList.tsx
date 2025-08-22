import React from 'react';
import { format } from 'date-fns';
import { Transaction } from '../../types';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const { state } = useApp();

  const getMemberNames = (memberIds?: string[]) => {
    if (!memberIds || memberIds.length === 0) return null;
    if (memberIds.includes('family')) return 'For Family';
    return memberIds.map(id => state.members.find(m => m.id === id)?.name).filter(Boolean).join(', ');
  };

  if (transactions.length === 0) {
    return (
      <div className="p-6">
        <p className="text-gray-400 text-center py-8">No transactions match your filters.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-3 max-h-[500px] overflow-y-auto">
      {transactions.map((transaction) => {
        const memberNames = getMemberNames(transaction.memberIds);
        return (
          <div key={transaction.id} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                {transaction.type === 'income' ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
              </div>
              <div>
                <p className="text-white font-medium">{transaction.description}</p>
                <div className="flex items-center flex-wrap gap-x-2 text-sm text-gray-400">
                  <span>{transaction.category}</span>
                  <span>•</span>
                  <span>{format(new Date(transaction.date), 'MMM dd, yyyy')}</span>
                  {memberNames && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Users size={12} /> {memberNames}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={`font-semibold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
              {transaction.type === 'income' ? '+' : '-'}৳{transaction.amount.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;
