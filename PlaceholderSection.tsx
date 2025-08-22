import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderSectionProps {
  title: string;
  description: string;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ title, description }) => {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[600px]">
      <div className="text-center">
        <div className="w-24 h-24 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction className="w-12 h-12 text-primary-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-400 mb-6">{description}</p>
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 max-w-md">
          <p className="text-gray-300 text-sm">
            This section is currently under development. All the exciting features will be available soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderSection;
