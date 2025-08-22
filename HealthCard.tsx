import React from 'react';
import { Heart, Activity, Thermometer, Scale, Calendar, User } from 'lucide-react';
import { HealthLog } from '../../types';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useApp } from '../../contexts/AppContext';

interface HealthCardProps {
  log: HealthLog;
  index: number;
}

const HealthCard: React.FC<HealthCardProps> = ({ log, index }) => {
  const { state } = useApp();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weight':
        return Scale;
      case 'blood_pressure':
        return Heart;
      case 'temperature':
        return Thermometer;
      case 'exercise':
        return Activity;
      default:
        return Heart;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'weight':
        return 'text-blue-400 bg-blue-500/10';
      case 'blood_pressure':
        return 'text-red-400 bg-red-500/10';
      case 'temperature':
        return 'text-orange-400 bg-orange-500/10';
      case 'exercise':
        return 'text-green-400 bg-green-500/10';
      case 'period':
        return 'text-pink-400 bg-pink-500/10';
      case 'medication':
        return 'text-purple-400 bg-purple-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getMemberName = (memberId: string) => {
    if (memberId === 'default') return 'Default User';
    const member = state.members.find(m => m.id === memberId);
    return member ? member.name : 'Unknown Member';
  };

  const Icon = getTypeIcon(log.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-dark-800 rounded-xl border border-dark-700 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getTypeColor(log.type)}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-2xl font-bold text-white">{log.value}</span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 capitalize">
        {log.type.replace('_', ' ')}
      </h3>

      {log.notes && (
        <p className="text-gray-400 text-sm mb-4">{log.notes}</p>
      )}

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-gray-300 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{format(log.date, 'MMM dd, yyyy')}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-300 text-sm">
          <User className="w-4 h-4" />
          <span>{getMemberName(log.memberId)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HealthCard;
