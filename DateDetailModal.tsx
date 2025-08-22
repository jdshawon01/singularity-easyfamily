import React from 'react';
import { X, DollarSign, FileText, Heart, TrendingUp, TrendingDown } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { format, isSameDay } from 'date-fns';

interface DateDetailModalProps {
  date: Date;
  onClose: () => void;
}

const DateDetailModal: React.FC<DateDetailModalProps> = ({ date, onClose }) => {
  const { state } = useApp();

  const transactions = state.transactions.filter(t => isSameDay(t.date, date));
  const notes = state.notes.filter(n => isSameDay(n.date, date));
  const healthLogs = state.healthLogs.filter(h => isSameDay(h.date, date));

  const getMemberName = (memberId: string) => state.members.find(m => m.id === memberId)?.name || 'Unknown';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <h2 className="text-xl font-semibold text-white">{format(date, 'EEEE, MMMM dd, yyyy')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Transactions */}
          <div>
            <div className="flex items-center space-x-2 mb-3"><DollarSign className="w-5 h-5 text-primary-400" /><h3 className="text-lg font-semibold text-white">Transactions</h3></div>
            {transactions.length > 0 ? (
              <div className="space-y-2">
                {transactions.map(t => (
                  <div key={t.id} className="p-3 bg-dark-700 rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {t.type === 'income' ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
                      <div>
                        <p className="text-white">{t.description}</p>
                        <p className="text-xs text-gray-400">{t.category}</p>
                      </div>
                    </div>
                    <p className={`font-medium ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {t.type === 'income' ? '+' : '-'}৳{t.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-500 text-sm pl-7">No transactions on this day.</p>}
          </div>

          {/* Health Logs */}
          <div>
            <div className="flex items-center space-x-2 mb-3"><Heart className="w-5 h-5 text-red-400" /><h3 className="text-lg font-semibold text-white">Health Logs</h3></div>
            {healthLogs.length > 0 ? (
              <div className="space-y-2">
                {healthLogs.map(h => (
                  <div key={h.id} className="p-3 bg-dark-700 rounded-lg">
                    <p className="text-white capitalize">{h.type.replace('_', ' ')}: <span className="font-bold">{h.value}</span></p>
                    <p className="text-xs text-gray-400">For: {getMemberName(h.memberId)}</p>
                    {h.notes && <p className="text-sm text-gray-300 mt-1">{h.notes}</p>}
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-500 text-sm pl-7">No health logs on this day.</p>}
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center space-x-2 mb-3"><FileText className="w-5 h-5 text-blue-400" /><h3 className="text-lg font-semibold text-white">Notes</h3></div>
            {notes.length > 0 ? (
              <div className="space-y-2">
                {notes.map(n => (
                  <div key={n.id} className="p-3 bg-dark-700 rounded-lg">
                    <p className="text-white font-semibold">{n.title}</p>
                    <p className="text-sm text-gray-300">{n.content}</p>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-500 text-sm pl-7">No notes on this day.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateDetailModal;
