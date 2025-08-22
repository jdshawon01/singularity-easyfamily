import React from 'react';
import { Calendar, User, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { Task } from '../../types';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useApp } from '../../contexts/AppContext';

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const { state, dispatch } = useApp();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-500/10';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'low':
        return 'text-green-400 bg-green-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return AlertCircle;
      case 'medium':
        return Clock;
      case 'low':
        return CheckCircle;
      default:
        return Clock;
    }
  };

  const getAssignedMember = (memberId: string) => {
    return state.members.find(m => m.id === memberId);
  };

  const handleToggleComplete = () => {
    dispatch({ type: 'TOGGLE_TASK', payload: task.id });
  };

  const PriorityIcon = getPriorityIcon(task.priority);
  const assignedMember = task.assignedTo ? getAssignedMember(task.assignedTo) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-dark-800 rounded-xl border border-dark-700 p-6 ${
        task.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleComplete}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              task.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-400 hover:border-green-500'
            }`}
          >
            {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
          </button>
          <h3 className={`text-lg font-semibold ${
            task.completed ? 'text-gray-400 line-through' : 'text-white'
          }`}>
            {task.title}
          </h3>
        </div>
        <div className={`p-2 rounded-lg ${getPriorityColor(task.priority)}`}>
          <PriorityIcon className="w-4 h-4" />
        </div>
      </div>

      {task.description && (
        <p className="text-gray-400 text-sm mb-4">{task.description}</p>
      )}

      <div className="space-y-2">
        {task.dueDate && (
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Due: {format(task.dueDate, 'MMM dd, yyyy')}</span>
          </div>
        )}

        {assignedMember && (
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <User className="w-4 h-4" />
            <span>Assigned to: {assignedMember.name}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </span>
          
          {task.completed && (
            <span className="text-xs text-green-400">Completed</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
