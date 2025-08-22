import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, DollarSign, FileText, Heart, Eye } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { motion } from 'framer-motion';
import TransactionModal from './TransactionModal';
import NotesModal from './NotesModal';
import HealthModal from './HealthModal';
import DateDetailModal from './DateDetailModal';

const Calendar: React.FC = () => {
  const { state, dispatch } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const modes = [
    { type: 'show' as const, label: 'Show All', icon: Eye },
    { type: 'transaction' as const, label: 'Add Transaction', icon: DollarSign },
    { type: 'notes' as const, label: 'Add Note', icon: FileText },
    { type: 'health' as const, label: 'Add Health Log', icon: Heart }
  ];

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const getDateData = (date: Date) => {
    const transactions = state.transactions.filter(t => isSameDay(t.date, date));
    const notes = state.notes.filter(n => isSameDay(n.date, date));
    const healthLogs = state.healthLogs.filter(h => isSameDay(h.date, date));
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return { hasData: transactions.length > 0 || notes.length > 0 || healthLogs.length > 0, income, expense };
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const renderModal = () => {
    if (!isModalOpen || !selectedDate) return null;
    switch (state.calendarMode) {
      case 'transaction': return <TransactionModal date={selectedDate} onClose={closeModal} />;
      case 'notes': return <NotesModal date={selectedDate} onClose={closeModal} />;
      case 'health': return <HealthModal date={selectedDate} onClose={closeModal} />;
      case 'show': default: return <DateDetailModal date={selectedDate} onClose={closeModal} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Calendar</h1>
          <p className="text-gray-400">Current Mode: <span className="font-semibold text-primary-400 capitalize">{state.calendarMode}</span>. Click a date to interact.</p>
        </div>
        <div className="flex flex-wrap gap-2 bg-dark-800 p-2 rounded-lg border border-dark-700">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = state.calendarMode === mode.type;
            return (
              <button
                key={mode.type}
                onClick={() => dispatch({ type: 'SET_CALENDAR_MODE', payload: mode.type })}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-dark-800 rounded-xl border border-dark-700">
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <h2 className="text-xl font-semibold text-white">{format(currentDate, 'MMMM yyyy')}</h2>
          <div className="flex items-center space-x-2">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-dark-700 rounded-lg"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
            <button onClick={handleNextMonth} className="p-2 hover:bg-dark-700 rounded-lg"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-3 text-center text-gray-400 font-medium text-sm">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              const data = getDateData(date);
              const isCurrentMonth = isSameMonth(date, currentDate);
              const isTodayDate = isToday(date);
              return (
                <motion.button
                  key={date.toISOString()}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.01 }}
                  onClick={() => handleDateClick(date)}
                  className={`aspect-square p-2 rounded-lg text-sm transition-colors relative flex flex-col justify-between ${!isCurrentMonth ? 'text-gray-600' : 'text-gray-300 hover:bg-dark-700'} ${isTodayDate ? 'bg-primary-600/50' : ''} ${data.hasData ? 'border border-primary-500/50' : ''}`}
                  disabled={!isCurrentMonth}
                >
                  <span className={`self-start font-medium ${isTodayDate ? 'text-white' : ''}`}>{format(date, 'd')}</span>
                  {(data.income > 0 || data.expense > 0) && (
                    <div className="text-xs text-right">
                      {data.income > 0 && <p className="text-green-500 truncate">+${data.income.toFixed(0)}</p>}
                      {data.expense > 0 && <p className="text-red-500 truncate">-${data.expense.toFixed(0)}</p>}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
      {renderModal()}
    </div>
  );
};

export default Calendar;
