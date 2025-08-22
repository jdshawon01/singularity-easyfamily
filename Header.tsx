import React from 'react';
import { format } from 'date-fns';
import { enUS, bn } from 'date-fns/locale';
import { Menu } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { state } = useApp();
  const currentDate = format(new Date(), 'EEEE, MMMM dd, yyyy', {
    locale: state.language === 'bn' ? bn : enUS,
  });

  return (
    <header className="bg-white dark:bg-dark-800 border-b border-dark-200 dark:border-dark-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 text-dark-500 dark:text-gray-400 hover:text-dark-800 dark:hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
