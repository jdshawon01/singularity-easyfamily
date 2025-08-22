import React, { useState } from 'react';
import { Plus, FileText, ScanLine, Tag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Document } from '../../types';
import DocumentForm from './DocumentForm';

const DocumentCard: React.FC<{ doc: Document, index: number }> = ({ doc, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-dark-800 rounded-xl border border-dark-700 p-4 flex items-center space-x-4"
    >
      <div className="p-3 rounded-lg bg-primary-500/10">
        <FileText className="w-6 h-6 text-primary-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-md font-semibold text-white">{doc.name}</h3>
        <p className="text-gray-400 text-sm">Uploaded: {format(new Date(doc.uploadDate), 'MMM dd, yyyy')}</p>
      </div>
      <div className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-300">{doc.category}</div>
    </motion.div>
  );
};

const Documents: React.FC = () => {
  const { state } = useApp();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Documents</h1>
          <p className="text-gray-400">Store and organize your important family documents.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <ScanLine className="w-4 h-4" />
            <span>Scan with AI OCR</span>
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Document</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.documents.map((doc, index) => (
          <DocumentCard key={doc.id} doc={doc} index={index} />
        ))}
      </div>
      
      {showForm && <DocumentForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Documents;
