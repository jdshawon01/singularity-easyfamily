import React, { useState, useMemo } from 'react';
import { Droplet, Heart, Activity, Calendar, Bot, X, Plus, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfWeek, endOfWeek, isSameDay, addDays, differenceInDays, subMonths, addMonths } from 'date-fns';
import { PeriodLog } from '../../types';
import { aiService } from '../../services/aiService';
import ReactMarkdown from 'react-markdown';

const PeriodTracker: React.FC = () => {
  const { state, dispatch } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showLogModal, setShowLogModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const { avgCycleLength, nextPeriodStart } = useMemo(() => {
    if (state.periodLogs.length < 2) return { avgCycleLength: 28, nextPeriodStart: null };
    const sortedLogs = [...state.periodLogs].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    let totalCycleLength = 0;
    for (let i = 1; i < sortedLogs.length; i++) {
      totalCycleLength += differenceInDays(new Date(sortedLogs[i].startDate), new Date(sortedLogs[i-1].startDate));
    }
    const avg = Math.round(totalCycleLength / (sortedLogs.length - 1));
    const avgCycleLength = isNaN(avg) || avg < 15 ? 28 : avg;
    const lastPeriodStart = new Date(sortedLogs[sortedLogs.length - 1].startDate);
    const nextPeriodStart = addDays(lastPeriodStart, avgCycleLength);
    return { avgCycleLength, nextPeriodStart };
  }, [state.periodLogs]);

  const isPeriodDay = (date: Date) => state.periodLogs.some(log => date >= new Date(log.startDate) && date <= new Date(log.endDate));
  const isFertileDay = (date: Date) => {
    if (!nextPeriodStart) return false;
    const ovulationDay = addDays(nextPeriodStart, -14);
    return differenceInDays(date, ovulationDay) >= -5 && differenceInDays(date, ovulationDay) <= 1;
  };

  const handleGetAIAdvice = async () => {
    setShowAIModal(true);
    setIsLoadingAI(true);
    const lastPeriod = state.periodLogs.length > 0 ? state.periodLogs[0] : null;
    const prompt = `I am using a period tracker. My average cycle is ${avgCycleLength} days. My next predicted period is on ${nextPeriodStart ? format(nextPeriodStart, 'MMMM dd') : 'not available'}. ${lastPeriod ? `My last period had these symptoms: ${lastPeriod.symptoms.join(', ')}.` : ''} Based on this, provide some personalized health guidance covering nutrition, exercise, and stress management for my current cycle phase. Keep it encouraging and supportive.`;
    const response = await aiService.chat(prompt);
    setAiResponse(response);
    setIsLoadingAI(false);
  };

  const stats = [
    { title: 'Avg. Cycle Length', value: `${avgCycleLength} Days`, icon: Calendar },
    { title: 'Next Predicted Period', value: nextPeriodStart ? format(nextPeriodStart, 'MMM dd') : 'N/A', icon: Droplet },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-white mb-2">Period Tracker</h1><p className="text-gray-400">Track your menstrual cycle and gain health insights.</p></div>
        <button onClick={() => setShowLogModal(true)} className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"><Plus className="w-4 h-4" /><span>Log Period</span></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map(stat => (
          <div key={stat.title} className="bg-dark-800 rounded-xl p-6 border border-dark-700 flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-pink-500/10"><stat.icon className="w-6 h-6 text-pink-400" /></div>
            <div><p className="text-gray-400 text-sm">{stat.title}</p><p className="text-white text-xl font-bold">{stat.value}</p></div>
          </div>
        ))}
      </div>

      <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">{format(currentDate, 'MMMM yyyy')}</h2>
          <div className="flex items-center space-x-2">
            <button onClick={() => setCurrentDate(d => subMonths(d, 1))} className="p-2 hover:bg-dark-700 rounded-lg"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
            <button onClick={() => setCurrentDate(d => addMonths(d, 1))} className="p-2 hover:bg-dark-700 rounded-lg"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-4 text-center text-gray-400 text-sm font-semibold">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map(date => {
            const isCurrentMonth = isSameMonth(date, currentDate);
            const period = isPeriodDay(date);
            const fertile = isFertileDay(date);
            return (
              <div key={date.toString()} className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-colors ${!isCurrentMonth ? 'text-gray-600' : 'text-gray-300'} ${period ? 'bg-red-500/30' : ''} ${fertile ? 'bg-blue-500/30' : ''} ${isToday(date) ? 'ring-2 ring-primary-500' : ''}`}>
                {format(date, 'd')}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-4 mt-4 text-sm"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500/30" />Period</div><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500/30" />Fertile Window</div></div>
      </div>
       <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">AI Health Guidance</h3>
            <p className="text-gray-400 text-sm">Based on your cycle, the AI can provide personalized nutrition, exercise, and wellness tips. <button onClick={handleGetAIAdvice} className="text-primary-400 font-semibold hover:underline">Ask AI</button></p>
        </div>
        {showLogModal && <LogPeriodModal onClose={() => setShowLogModal(false)} />}
        {showAIModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-lg max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-dark-700"><div className="flex items-center gap-2"><Bot className="w-5 h-5 text-pink-400" /> <h3 className="text-lg font-semibold text-white">AI Health Guidance</h3></div><button onClick={() => setShowAIModal(false)} className="p-1 hover:bg-dark-700 rounded-full"><X size={18} /></button></div>
              <div className="p-6 overflow-y-auto">
                {isLoadingAI ? <div className="flex items-center justify-center gap-2 py-8"><Loader className="animate-spin" /> Thinking...</div> : <div className="prose prose-sm prose-invert max-w-none"><ReactMarkdown>{aiResponse}</ReactMarkdown></div>}
              </div>
            </motion.div>
          </div>
        )}
    </div>
  );
};

const LogPeriodModal: React.FC<{onClose: () => void}> = ({ onClose }) => {
  const { dispatch } = useApp();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const symptomOptions = ['Cramps', 'Bloating', 'Headache', 'Fatigue', 'Mood Swings', 'Acne'];

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;
    const newLog: PeriodLog = {
      id: Date.now().toString(),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      symptoms,
    };
    dispatch({ type: 'ADD_PERIOD_LOG', payload: newLog });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-dark-700"><h2 className="text-xl font-semibold text-white">Log Period</h2><button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg"><X size={18} /></button></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-gray-300">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full mt-1 p-2 bg-dark-700 border border-dark-600 rounded-lg" required /></div>
            <div><label className="text-sm text-gray-300">End Date</label><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full mt-1 p-2 bg-dark-700 border border-dark-600 rounded-lg" required /></div>
          </div>
          <div>
            <label className="text-sm text-gray-300">Symptoms</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {symptomOptions.map(s => <button key={s} type="button" onClick={() => handleSymptomToggle(s)} className={`px-3 py-1 text-sm rounded-full ${symptoms.includes(s) ? 'bg-pink-500 text-white' : 'bg-dark-700 text-gray-300'}`}>{s}</button>)}
            </div>
          </div>
          <div className="flex gap-3 pt-4"><button type="button" onClick={onClose} className="flex-1 py-2 bg-dark-700 rounded-lg">Cancel</button><button type="submit" className="flex-1 py-2 bg-primary-600 text-white rounded-lg">Save Log</button></div>
        </form>
      </motion.div>
    </div>
  );
};

export default PeriodTracker;
