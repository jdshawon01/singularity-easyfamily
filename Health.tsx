import React, { useState } from 'react';
import { Plus, Heart, Activity, Thermometer, Scale } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { motion } from 'framer-motion';
import HealthForm from './HealthForm';
import HealthCard from './HealthCard';

const Health: React.FC = () => {
  const { state } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  const filteredLogs = state.healthLogs.filter(log => {
    if (filter === 'all') return true;
    return log.type === filter;
  });

  const totalLogs = state.healthLogs.length;
  const recentLogs = state.healthLogs.filter(log => {
    const logDate = new Date(log.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return logDate >= weekAgo;
  }).length;

  const stats = [
    {
      title: 'Total Logs',
      value: totalLogs.toString(),
      icon: Heart,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    },
    {
      title: 'This Week',
      value: recentLogs.toString(),
      icon: Activity,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Members Tracked',
      value: new Set(state.healthLogs.map(log => log.memberId)).size.toString(),
      icon: Scale,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    }
  ];

  const healthTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'weight', label: 'Weight' },
    { value: 'blood_pressure', label: 'Blood Pressure' },
    { value: 'temperature', label: 'Temperature' },
    { value: 'period', label: 'Period' },
    { value: 'medication', label: 'Medication' },
    { value: 'exercise', label: 'Exercise' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Health</h1>
          <p className="text-gray-400">Monitor your family's health and wellness</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {healthTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Health Log</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-800 rounded-xl p-6 border border-dark-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredLogs.length === 0 ? (
        <div className="bg-dark-800 rounded-xl border border-dark-700 p-12 text-center">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No health logs found</h3>
          <p className="text-gray-400 mb-4">
            {filter === 'all' ? 'Start tracking your family\'s health data' : `No ${filter} logs available`}
          </p>
          {filter === 'all' && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add First Log
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLogs.slice().reverse().map((log, index) => (
            <HealthCard key={log.id} log={log} index={index} />
          ))}
        </div>
      )}

      {showForm && (
        <HealthForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default Health;
