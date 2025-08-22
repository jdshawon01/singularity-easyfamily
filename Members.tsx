import React, { useState } from 'react';
import { Plus, Users, Heart, Edit, Trash2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { motion } from 'framer-motion';
import MemberForm from './MemberForm';
import { Member } from '../../types';
import ConfirmationModal from '../common/ConfirmationModal';

const MemberCard: React.FC<{ member: Member; index: number; onEdit: (member: Member) => void; onDelete: (id: string) => void; }> = ({ member, index, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-dark-800 rounded-xl border border-dark-200 dark:border-dark-700 p-6 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-semibold">
            {member.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
          <button onClick={() => onEdit(member)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-full"><Edit size={16} /></button>
          <button onClick={() => onDelete(member.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full"><Trash2 size={16} /></button>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-dark-800 dark:text-white mb-1">{member.name}</h3>
      <p className="text-dark-500 dark:text-gray-400 text-sm capitalize mb-3">{member.relationship}</p>
      
      {member.age && (
        <div className="flex items-center space-x-2 text-dark-600 dark:text-gray-300 text-sm">
          <Users className="w-4 h-4" />
          <span>{member.age} years old</span>
        </div>
      )}
    </motion.div>
  );
};

const Members: React.FC = () => {
  const { state, dispatch, t } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMemberId, setDeletingMemberId] = useState<string | null>(null);

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setDeletingMemberId(id);
  };

  const confirmDelete = () => {
    if (deletingMemberId) {
      dispatch({ type: 'DELETE_MEMBER', payload: deletingMemberId });
      setDeletingMemberId(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMember(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-800 dark:text-white mb-2">Family Members</h1>
          <p className="text-dark-500 dark:text-gray-400">Manage your family member profiles</p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      {state.members.length === 0 ? (
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-200 dark:border-dark-700 p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-dark-800 dark:text-white mb-2">No family members yet</h3>
          <p className="text-dark-500 dark:text-gray-400 mb-4">Start by adding your family members to manage their profiles</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Add First Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.members.map((member, index) => (
            <MemberCard key={member.id} member={member} index={index} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {showForm && (
        <MemberForm member={editingMember} onClose={handleCloseForm} />
      )}
      {deletingMemberId && (
        <ConfirmationModal
          title="Delete Member"
          message={<p>Are you sure you want to delete this member? All associated data might be affected. This action cannot be undone.</p>}
          onClose={() => setDeletingMemberId(null)}
          onConfirm={confirmDelete}
          confirmText="Delete"
        />
      )}
    </div>
  );
};

export default Members;
