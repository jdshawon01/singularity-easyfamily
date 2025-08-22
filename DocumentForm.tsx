import React, { useState } from 'react';
import { X, FileText, Upload } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Document } from '../../types';

interface DocumentFormProps {
  onClose: () => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ onClose }) => {
  const { dispatch } = useApp();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Document['category']>('Other');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const doc: Document = {
      id: Date.now().toString(),
      name,
      category,
      uploadDate: new Date(),
    };

    dispatch({ type: 'ADD_DOCUMENT', payload: doc });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-dark-700"><div className="flex items-center space-x-3"><FileText className="w-6 h-6 text-primary-400" /><h2 className="text-xl font-semibold text-white">Add Document</h2></div><button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Document Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" required /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Category</label><select value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"><option value="ID">ID</option><option value="Passport">Passport</option><option value="Medical">Medical</option><option value="Financial">Financial</option><option value="Education">Education</option><option value="Other">Other</option></select></div>
          <div className="mt-4"><div className="flex justify-center items-center w-full px-6 py-10 border-2 border-dashed border-dark-600 rounded-lg"><div className="text-center"><Upload className="mx-auto h-10 w-10 text-gray-500" /><p className="mt-2 text-sm text-gray-400">File upload coming soon!</p></div></div></div>
          <div className="flex space-x-3 pt-4"><button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600">Cancel</button><button type="submit" className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Add Document</button></div>
        </form>
      </div>
    </div>
  );
};

export default DocumentForm;
