import React, { useState, useEffect } from 'react';
import { X, User, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Member } from '../../types';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberFormProps {
  member: Member | null;
  onClose: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ member, onClose }) => {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState<Partial<Member> & { heightUnit?: 'cm' | 'ft-in', heightFt?: string, heightIn?: string, phoneNumbers?: string[] }>({ gender: 'male', heightUnit: 'cm', phoneNumbers: [''] });

  useEffect(() => {
    if (member) {
      const phones = member.phone ? member.phone.split(', ') : [''];
      let heightUnit: 'cm' | 'ft-in' = 'cm';
      let heightFt = '';
      let heightIn = '';
      
      // A simple heuristic to guess if height was stored in ft-in
      // This could be improved if units were stored in the model
      if (member.height && member.height < 10) { 
        heightUnit = 'ft-in';
        heightFt = Math.floor(member.height * 3.28084).toString();
        heightIn = ( (member.height * 3.28084 - Math.floor(member.height * 3.28084)) * 12 ).toFixed(1);
      }
      
      setFormData({
        ...member,
        phoneNumbers: phones,
        heightUnit,
        heightFt,
        heightIn,
      });
    }
  }, [member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name: string, selectedOptions: any) => {
    setFormData(prev => ({ ...prev, [name]: selectedOptions.map((o: any) => o.value) }));
  };
  
  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...(formData.phoneNumbers || [''])];
    newPhones[index] = value;
    setFormData(prev => ({ ...prev, phoneNumbers: newPhones }));
  };

  const addPhoneField = () => {
    setFormData(prev => ({ ...prev, phoneNumbers: [...(prev.phoneNumbers || []), ''] }));
  };
  
  const removePhoneField = (index: number) => {
    if (formData.phoneNumbers && formData.phoneNumbers.length > 1) {
      const newPhones = formData.phoneNumbers.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, phoneNumbers: newPhones }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.relationship) return;
    
    let heightInCm = formData.height;
    if (formData.heightUnit === 'ft-in') {
      const feet = parseFloat(formData.heightFt || '0');
      const inches = parseFloat(formData.heightIn || '0');
      heightInCm = (feet * 30.48) + (inches * 2.54);
    }

    const finalData: Member = {
      id: member ? member.id : Date.now().toString(),
      name: formData.name,
      relationship: formData.relationship,
      age: formData.age ? Number(formData.age) : undefined,
      gender: formData.gender,
      height: heightInCm ? Number(heightInCm) : undefined,
      weight: formData.weight ? Number(formData.weight) : undefined,
      bloodGroup: formData.bloodGroup,
      bloodPressure: formData.bloodPressure,
      healthStatus: formData.healthStatus,
      diseases: formData.diseases,
      allergies: formData.allergies,
      healthGoals: formData.healthGoals,
      foodPreferences: formData.foodPreferences,
      tastePreferences: formData.tastePreferences,
      hobbies: formData.hobbies,
      phone: formData.phoneNumbers?.filter(p => p).join(', '),
    };

    if (member) {
      dispatch({ type: 'UPDATE_MEMBER', payload: finalData });
    } else {
      dispatch({ type: 'ADD_MEMBER', payload: finalData });
    }
    onClose();
  };

  const multiSelectStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', minHeight: '42px' }),
    menu: (styles: any) => ({ ...styles, backgroundColor: '#1e293b', border: '1px solid #334155' }),
    option: (styles: any, { isFocused, isSelected }: any) => ({ ...styles, backgroundColor: isSelected ? '#2563eb' : isFocused ? '#334155' : '#1e293b', color: '#fff' }),
    multiValue: (styles: any) => ({ ...styles, backgroundColor: '#334155' }),
    multiValueLabel: (styles: any) => ({ ...styles, color: '#fff' }),
    multiValueRemove: (styles: any) => ({ ...styles, color: '#9ca3af', ':hover': { backgroundColor: '#ef4444', color: 'white' } }),
    placeholder: (styles: any) => ({ ...styles, color: '#64748b' }),
    input: (styles: any) => ({ ...styles, color: '#fff' }),
  };

  const foodPrefs = [{value: 'Vegetarian', label: 'Vegetarian'}, {value: 'Meat Lover', label: 'Meat Lover'}, {value: 'Fish Lover', label: 'Fish Lover'}, {value: 'Eats Eggs', label: 'Eats Eggs'}, {value: 'Dairy Products', label: 'Dairy Products'}, {value: 'Fast Food', label: 'Fast Food'}, {value: 'Home Cooked', label: 'Home Cooked'}, {value: 'Traditional Food', label: 'Traditional Food'}, {value: 'International Food', label: 'International Food'}];
  const tastePrefs = [{value: 'Sweet', label: 'Sweet'}, {value: 'Spicy', label: 'Spicy'}, {value: 'Sour', label: 'Sour'}, {value: 'Salty', label: 'Salty'}, {value: 'Bitter', label: 'Bitter'}, {value: 'Low Salt', label: 'Low Salt'}, {value: 'Low Oil', label: 'Low Oil'}, {value: 'Low Spice', label: 'Low Spice'}];
  const hobbies = [{value: 'Reading', label: 'Reading'}, {value: 'Sports', label: 'Sports'}, {value: 'Music', label: 'Music'}, {value: 'Movies', label: 'Movies'}, {value: 'Cooking', label: 'Cooking'}, {value: 'Gardening', label: 'Gardening'}, {value: 'Yoga', label: 'Yoga'}, {value: 'Meditation', label: 'Meditation'}];

  const toMultiSelectValue = (options: any[], values?: string[]) => {
    if (!values) return [];
    return options.filter(opt => values.includes(opt.value));
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-dark-700 flex-shrink-0"><div className="flex items-center space-x-3"><User className="w-6 h-6 text-primary-400" /><h2 className="text-xl font-semibold text-white">{member ? 'Edit' : 'Add'} Family Member</h2></div><button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          
          <section><h4 className="text-lg font-semibold text-primary-400 mb-3">Basic Information</h4><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="text-sm text-gray-300">Name *</label><input name="name" value={formData.name || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" required /></div><div><label className="text-sm text-gray-300">Relationship *</label><input name="relationship" value={formData.relationship || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" required /></div><div><label className="text-sm text-gray-300">Age</label><input name="age" type="number" value={formData.age || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" /></div><div><label className="text-sm text-gray-300">Gender</label><select name="gender" value={formData.gender} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div></div></section>
          
          <section><h4 className="text-lg font-semibold text-primary-400 mb-3">Physical Information</h4><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm text-gray-300">Height Unit</label><select name="heightUnit" value={formData.heightUnit} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"><option value="cm">Centimeter</option><option value="ft-in">Feet-Inches</option></select></div>
            {formData.heightUnit === 'cm' ? <div><label className="text-sm text-gray-300">Height (cm)</label><input name="height" type="number" value={formData.height || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" /></div> : <div className="flex gap-2"><div><label className="text-sm text-gray-300">Feet</label><input name="heightFt" type="number" value={formData.heightFt || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" /></div><div><label className="text-sm text-gray-300">Inches</label><input name="heightIn" type="number" value={formData.heightIn || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" /></div></div>}
            <div><label className="text-sm text-gray-300">Weight (kg)</label><input name="weight" type="number" value={formData.weight || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" /></div><div><label className="text-sm text-gray-300">Blood Group</label><input name="bloodGroup" value={formData.bloodGroup || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" /></div><div><label className="text-sm text-gray-300">Blood Pressure</label><input name="bloodPressure" value={formData.bloodPressure || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" placeholder="e.g., 120/80" /></div></div></section>

          <section><h4 className="text-lg font-semibold text-primary-400 mb-3">Health Information</h4><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm text-gray-300">Health Status</label><input name="healthStatus" value={formData.healthStatus || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" placeholder="e.g., Good, Diabetes" /></div>
            <div><label className="text-sm text-gray-300">Health Goals</label><textarea name="healthGoals" value={formData.healthGoals || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" rows={2}></textarea></div>
            <div><label className="text-sm text-gray-300">Diseases & Problems</label><textarea name="diseases" value={formData.diseases || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" rows={2}></textarea></div>
            <div><label className="text-sm text-gray-300">Allergies & Restrictions</label><textarea name="allergies" value={formData.allergies || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" rows={2}></textarea></div>
          </div></section>

          <section><h4 className="text-lg font-semibold text-primary-400 mb-3">Preferences</h4><div className="space-y-4">
            <div><label className="text-sm text-gray-300">Food Preferences</label><Select isMulti options={foodPrefs} value={toMultiSelectValue(foodPrefs, formData.foodPreferences)} onChange={(val) => handleMultiSelectChange('foodPreferences', val)} styles={multiSelectStyles} /></div>
            <div><label className="text-sm text-gray-300">Taste Preferences</label><Select isMulti options={tastePrefs} value={toMultiSelectValue(tastePrefs, formData.tastePreferences)} onChange={(val) => handleMultiSelectChange('tastePreferences', val)} styles={multiSelectStyles} /></div>
            <div><label className="text-sm text-gray-300">Hobbies & Interests</label><Select isMulti options={hobbies} value={toMultiSelectValue(hobbies, formData.hobbies)} onChange={(val) => handleMultiSelectChange('hobbies', val)} styles={multiSelectStyles} /></div>
          </div></section>

          <section><h4 className="text-lg font-semibold text-primary-400 mb-3">Contact Information</h4><div className="space-y-2">
            <AnimatePresence>
              {(formData.phoneNumbers || ['']).map((phone, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="flex items-center gap-2">
                  <input type="tel" value={phone} onChange={(e) => handlePhoneChange(index, e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" placeholder={`Phone Number ${index + 1}`} />
                  {formData.phoneNumbers && formData.phoneNumbers.length > 1 && <button type="button" onClick={() => removePhoneField(index)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-full"><Trash2 size={16} /></button>}
                </motion.div>
              ))}
            </AnimatePresence>
            <button type="button" onClick={addPhoneField} className="text-sm text-primary-400 flex items-center gap-1 hover:underline"><Plus size={14} /> Add more phone numbers</button>
          </div></section>

          <div className="flex space-x-3 pt-4 border-t border-dark-700 flex-shrink-0">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 font-semibold">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold">{member ? 'Update' : 'Add'} Member</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default MemberForm;
