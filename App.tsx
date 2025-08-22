import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Calendar from './components/Calendar/Calendar';
import AIChat from './components/AI/AIChat';
import Finance from './components/Finance/Finance';
import BudgetPlanner from './components/Budget/BudgetPlanner';
import Subscriptions from './components/Subscriptions/Subscriptions';
import Health from './components/Health/Health';
import Pantry from './components/Pantry/Pantry';
import Documents from './components/Documents/Documents';
import Members from './components/Members/Members';
import Tasks from './components/Tasks/Tasks';
import Analytics from './components/Analytics/Analytics';
import Rannaghor from './components/Rannaghor/Rannaghor';
import Calculators from './components/Calculators/Calculators';
import Reminders from './components/Reminders/Reminders';
import PeriodTracker from './components/PeriodTracker/PeriodTracker';
import Auth from './components/Auth/Auth';
import { supabase } from './lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { Loader } from 'lucide-react';

const AppContent: React.FC = () => {
  const { state } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderActiveSection = () => {
    switch (state.activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'calendar': return <Calendar />;
      case 'finance': return <Finance />;
      case 'budget': return <BudgetPlanner />;
      case 'subscriptions': return <Subscriptions />;
      case 'health': return <Health />;
      case 'period': return <PeriodTracker />;
      case 'pantry': return <Pantry />;
      case 'documents': return <Documents />;
      case 'members': return <Members />;
      case 'tasks': return <Tasks />;
      case 'analytics': return <Analytics />;
      case 'ai': return <AIChat />;
      case 'rannaghor': return <Rannaghor />;
      case 'calculators': return <Calculators />;
      case 'reminders': return <Reminders />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen bg-dark-100 dark:bg-dark-900 text-dark-800 dark:text-gray-300`}>
      <div className="flex h-screen">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <main className="flex-1 overflow-y-auto">
            {renderActiveSection()}
          </main>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <Loader className="w-12 h-12 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <AppProvider>
      {!session ? <Auth /> : <AppContent />}
    </AppProvider>
  );
}

export default App;
