import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useApp } from '../../contexts/AppContext';
import { format, eachDayOfInterval, subDays } from 'date-fns';

const HealthAnalytics: React.FC = () => {
  const { state } = useApp();

  // Health logs trend for the last 30 days
  const last30Days = eachDayOfInterval({
    start: subDays(new Date(), 29),
    end: new Date()
  });

  const dailyHealthData = last30Days.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const dayLogs = state.healthLogs.filter(log => 
      format(log.date, 'yyyy-MM-dd') === dayStr
    );

    return {
      date: format(day, 'MMM dd'),
      logs: dayLogs.length
    };
  });

  // Health type distribution
  const healthTypeData = state.healthLogs.reduce((acc, log) => {
    acc[log.type] = (acc[log.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeChartData = Object.entries(healthTypeData)
    .map(([type, count]) => ({ 
      type: type.replace('_', ' ').toUpperCase(), 
      count 
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Daily Health Logs (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyHealthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line type="monotone" dataKey="logs" stroke="#ef4444" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Health Log Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="type" 
                stroke="#9ca3af" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="count" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-dark-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Health Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Total Logs</p>
            <p className="text-red-400 text-2xl font-bold">
              {state.healthLogs.length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Members Tracked</p>
            <p className="text-green-400 text-2xl font-bold">
              {new Set(state.healthLogs.map(log => log.memberId)).size}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">This Week</p>
            <p className="text-blue-400 text-2xl font-bold">
              {state.healthLogs.filter(log => {
                const logDate = new Date(log.date);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return logDate >= weekAgo;
              }).length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Most Common</p>
            <p className="text-yellow-400 text-2xl font-bold">
              {typeChartData[0]?.type || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthAnalytics;
