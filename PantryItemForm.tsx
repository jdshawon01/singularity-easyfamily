import React, { useState } from 'react';
import { X, Package } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { PantryItem } from '../../types';

interface PantryItemFormProps {
  onClose: () => void;
}

const PantryItemForm: React.FC<PantryItemFormProps> = ({ onClose }) => {
  const { dispatch } = useApp();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<PantryItem['unit']>('pcs');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quantity) return;

    const item: PantryItem = {
      id: Date.now().toString(),
      name,
      quantity: parseFloat(quantity),
      unit,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
    };

    dispatch({ type: 'ADD_PANTRY_ITEM', payload: item });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-dark-700"><div className="flex items-center space-x-3"><Package className="w-6 h-6 text-primary-400" /><h2 className="text-xl font-semibold text-white">Add Pantry Item</h2></div><button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Item Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" required /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-300 mb-2">Quantity</label><input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" required /></div>
            <div><label className="block text-sm font-medium text-gray-300 mb-2">Unit</label><select value={unit} onChange={(e) => setUnit(e.target.value as any)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"><option value="pcs">Pieces</option><option value="kg">kg</option><option value="g">g</option><option value="l">Litre</option><option value="ml">ml</option><option value="unit">Unit</option></select></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date (Optional)</label><input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" /></div>
          <div className="flex space-x-3 pt-4"><button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600">Cancel</button><button type="submit" className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Add Item</button></div>
        </form>
      </div>
    </div>
  );
};

export default PantryItemForm;
