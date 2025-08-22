import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Reminder } from '../../types';

interface ReminderFormProps {
  onClose: () => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ onClose }) => {
  const { dispatch } = useApp();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    const reminder: Reminder = {
      id: Date.now().toString(),
      title,
      date: new Date(`${date}T${time}`),
      completed: false,
    };

    dispatch({ type: 'ADD_REMINDER', payload: reminder });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-dark-700"><div className="flex items-center space-x-3"><Bell className="w-6 h-6 text-primary-400" /><h2 className="text-xl font-semibold text-white">Add Reminder</h2></div><button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" required /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-300 mb-2">Date</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" required /></div>
            <div><label className="block text-sm font-medium text-gray-300 mb-2">Time</label><input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" required /></div>
          </div>
          <div className="flex space-x-3 pt-4"><button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600">Cancel</button><button type="submit" className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Add Reminder</button></div>
        </form>
      </div>
    </div>
  );
};

export default ReminderForm;
