import React, { useState } from 'react';
import { X, Heart } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { HealthLog } from '../../types';

interface HealthFormProps {
  onClose: () => void;
}

const HealthForm: React.FC<HealthFormProps> = ({ onClose }) => {
  const { state, dispatch } = useApp();
  const [type, setType] = useState<HealthLog['type']>('weight');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [memberId, setMemberId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const healthTypes = [
    { value: 'weight', label: 'Weight (kg)' },
    { value: 'blood_pressure', label: 'Blood Pressure' },
    { value: 'temperature', label: 'Temperature (°F)' },
    { value: 'period', label: 'Period' },
    { value: 'medication', label: 'Medication' },
    { value: 'exercise', label: 'Exercise' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || !memberId) return;

    const healthLog: HealthLog = {
      id: Date.now().toString(),
      type,
      value,
      notes: notes || undefined,
      date: new Date(date),
      memberId
    };

    dispatch({ type: 'ADD_HEALTH_LOG', payload: healthLog });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-red-400" />
            <h2 className="text-xl font-semibold text-white">Add Health Log</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Health Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as HealthLog['type'])}
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                {healthTypes.map((healthType) => (
                  <option key={healthType.value} value={healthType.value}>
                    {healthType.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Member</label>
            <select
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select member</option>
              {state.members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
              <option value="default">Default User</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Value</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder={
                type === 'weight' ? '70.5' :
                type === 'blood_pressure' ? '120/80' :
                type === 'temperature' ? '98.6' :
                'Enter value'
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              placeholder="Additional notes..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthForm;
