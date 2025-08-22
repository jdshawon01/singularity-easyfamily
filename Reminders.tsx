import React, { useState } from 'react';
import { Plus, Bell, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Reminder } from '../../types';
import ReminderForm from './ReminderForm';

const ReminderCard: React.FC<{ reminder: Reminder, index: number }> = ({ reminder, index }) => {
  const { dispatch } = useApp();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className={`bg-dark-800 rounded-xl border border-dark-700 p-4 flex items-center space-x-4 ${reminder.completed ? 'opacity-60' : ''}`}>
      <button onClick={() => dispatch({ type: 'TOGGLE_REMINDER', payload: reminder.id })} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${reminder.completed ? 'border-green-500 bg-green-500' : 'border-gray-400'}`}>
        {reminder.completed && <CheckCircle className="w-4 h-4 text-white" />}
      </button>
      <div className="flex-1">
        <h3 className={`font-semibold text-white ${reminder.completed ? 'line-through' : ''}`}>{reminder.title}</h3>
        <p className="text-gray-400 text-sm">{format(new Date(reminder.date), 'MMM dd, yyyy \'at\' hh:mm a')}</p>
      </div>
    </motion.div>
  );
};

const Reminders: React.FC = () => {
  const { state } = useApp();
  const [showForm, setShowForm] = useState(false);
  const pendingReminders = state.reminders.filter(r => !r.completed).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-white mb-2">Reminders</h1><p className="text-gray-400">Set and manage important reminders.</p></div>
        <button onClick={() => setShowForm(true)} className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"><Plus className="w-4 h-4" /><span>Add Reminder</span></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 flex items-center justify-between"><div className="flex items-center space-x-4"><div className="p-3 rounded-lg bg-blue-500/10"><Bell className="w-6 h-6 text-blue-400" /></div><div><p className="text-gray-400 text-sm">Total Reminders</p><p className="text-white text-2xl font-bold">{state.reminders.length}</p></div></div></div>
        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 flex items-center justify-between"><div className="flex items-center space-x-4"><div className="p-3 rounded-lg bg-yellow-500/10"><Clock className="w-6 h-6 text-yellow-400" /></div><div><p className="text-gray-400 text-sm">Pending</p><p className="text-white text-2xl font-bold">{pendingReminders}</p></div></div></div>
      </div>
      <div className="space-y-4">
        {state.reminders.slice().sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((r, i) => <ReminderCard key={r.id} reminder={r} index={i} />)}
      </div>
      {showForm && <ReminderForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Reminders;
