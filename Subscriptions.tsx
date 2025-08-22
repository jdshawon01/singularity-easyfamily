import React, { useState } from 'react';
import { Plus, CreditCard, Calendar, Tag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { motion } from 'framer-motion';
import { format, isBefore, addDays } from 'date-fns';
import { Subscription } from '../../types';
import SubscriptionForm from './SubscriptionForm';

const SubscriptionCard: React.FC<{ sub: Subscription, index: number }> = ({ sub, index }) => {
  const renewalDate = new Date(sub.renewalDate);
  const isDueSoon = isBefore(renewalDate, addDays(new Date(), 7));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-dark-800 rounded-xl border border-dark-700 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{sub.name}</h3>
        <div className={`px-2 py-1 text-xs rounded-full ${
          sub.category === 'Entertainment' ? 'bg-pink-500/20 text-pink-400' :
          sub.category === 'Utilities' ? 'bg-blue-500/20 text-blue-400' :
          sub.category === 'Work' ? 'bg-green-500/20 text-green-400' :
          'bg-gray-500/20 text-gray-400'
        }`}>
          {sub.category}
        </div>
      </div>
      <p className="text-3xl font-bold text-white mb-4">৳{sub.amount.toLocaleString()}</p>
      <div className={`flex items-center space-x-2 text-sm ${isDueSoon ? 'text-yellow-400' : 'text-gray-400'}`}>
        <Calendar className="w-4 h-4" />
        <span>Renews on: {format(renewalDate, 'MMM dd, yyyy')}</span>
      </div>
    </motion.div>
  );
};

const Subscriptions: React.FC = () => {
  const { state } = useApp();
  const [showForm, setShowForm] = useState(false);

  const totalMonthlyCost = state.subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const upcomingRenewals = state.subscriptions.filter(sub => isBefore(new Date(sub.renewalDate), addDays(new Date(), 14))).length;

  const stats = [
    { title: 'Total Subscriptions', value: state.subscriptions.length, icon: CreditCard, color: 'text-blue-400' },
    { title: 'Monthly Cost', value: `৳${totalMonthlyCost.toLocaleString()}`, icon: Tag, color: 'text-green-400' },
    { title: 'Upcoming Renewals', value: upcomingRenewals, icon: Calendar, color: 'text-yellow-400' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Subscriptions</h1>
          <p className="text-gray-400">Track all your recurring bills and subscriptions.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subscription</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-dark-800 rounded-xl p-6 border border-dark-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="p-3 rounded-lg bg-opacity-10"><Icon className={`w-6 h-6 ${stat.color}`} /></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.subscriptions
          .slice()
          .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
          .map((sub, index) => (
            <SubscriptionCard key={sub.id} sub={sub} index={index} />
        ))}
      </div>
      
      {showForm && <SubscriptionForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Subscriptions;
