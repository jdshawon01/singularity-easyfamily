import React, { useState, useEffect } from 'react';
import { Calculator, Scale, Flame, PiggyBank, Bot, X, Loader } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Member } from '../../types';
import { aiService } from '../../services/aiService';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const AIBrain: React.FC<{ prompt: string }> = ({ prompt }) => {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const getResponse = async () => {
      setIsLoading(true);
      const res = await aiService.chat(prompt);
      setResponse(res);
      setIsLoading(false);
    };
    getResponse();
  }, [prompt]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-dark-800 rounded-xl border border-dark-700 w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-dark-700"><div className="flex items-center gap-2"><Bot className="w-5 h-5 text-primary-400" /> <h3 className="text-lg font-semibold text-white">AI Explanation</h3></div><button onClick={() => setShowModal(false)} className="p-1 hover:bg-dark-700 rounded-full"><X size={18} /></button></div>
        <div className="p-6 overflow-y-auto">
          {isLoading ? <div className="flex items-center justify-center gap-2 py-8"><Loader className="animate-spin" /> Thinking...</div> : <div className="prose prose-sm prose-invert max-w-none"><ReactMarkdown>{response}</ReactMarkdown></div>}
        </div>
      </motion.div>
    </div>
  );
};

const BMICalculator: React.FC = () => {
  const { state } = useApp();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [aiPrompt, setAiPrompt] = useState<string | null>(null);

  useEffect(() => {
    if (selectedMember) {
      setHeight(selectedMember.height?.toString() || '');
      setWeight(selectedMember.weight?.toString() || '');
      setBmi(null);
      setAiPrompt(null);
    }
  }, [selectedMember]);

  const calculateBmi = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) setBmi(w / (h * h));
    else setBmi(null);
  };

  const getBmiCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { category: 'Underweight', color: 'text-blue-400' };
    if (bmiValue < 24.9) return { category: 'Normal weight', color: 'text-green-400' };
    if (bmiValue < 29.9) return { category: 'Overweight', color: 'text-yellow-400' };
    return { category: 'Obesity', color: 'text-red-400' };
  };
  
  const handleExplain = () => {
    if (bmi === null) return;
    const { category } = getBmiCategory(bmi);
    setAiPrompt(`My BMI is ${bmi.toFixed(1)}, which is considered '${category}'. Please explain what this means in simple terms and provide 3 actionable, personalized tips for a person of this profile to improve their health. Keep it concise and encouraging.`);
  };

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
      {aiPrompt && <AIBrain prompt={aiPrompt} />}
      <div className="flex items-center space-x-3 mb-4"><Scale className="w-6 h-6 text-primary-400" /><h3 className="text-lg font-semibold text-white">BMI Calculator</h3></div>
      <select onChange={(e) => setSelectedMember(state.members.find(m => m.id === e.target.value) || null)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white mb-4"><option value="">Select Member (Auto-fill)</option>{state.members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div><label className="block text-sm text-gray-400 mb-1">Height (cm)</label><input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" /></div>
        <div><label className="block text-sm text-gray-400 mb-1">Weight (kg)</label><input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" /></div>
      </div>
      <button onClick={calculateBmi} className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Calculate</button>
      {bmi !== null && (<div className="mt-4 text-center bg-dark-700 p-4 rounded-lg"><p className="text-gray-400">BMI</p><p className="text-4xl font-bold text-white my-2">{bmi.toFixed(1)}</p><p className={`font-semibold ${getBmiCategory(bmi).color}`}>{getBmiCategory(bmi).category}</p><button onClick={handleExplain} className="text-sm text-primary-400 mt-2 flex items-center justify-center gap-1 mx-auto"><Bot size={14} /> Explain with AI</button></div>)}
    </div>
  );
};

const BMRCalculator: React.FC = () => {
    const { state } = useApp();
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [bmr, setBmr] = useState<number | null>(null);
    const [aiPrompt, setAiPrompt] = useState<string | null>(null);
  
    useEffect(() => {
      if (selectedMember && selectedMember.weight && selectedMember.height && selectedMember.age && selectedMember.gender) {
        const { weight, height, age, gender } = selectedMember;
        let bmrCalc = 10 * weight + 6.25 * height - 5 * age;
        bmrCalc += gender === 'male' ? 5 : -161;
        setBmr(bmrCalc);
      } else {
        setBmr(null);
      }
      setAiPrompt(null);
    }, [selectedMember]);
    
    const handleExplain = () => {
      if (bmr === null) return;
      setAiPrompt(`My BMR (Basal Metabolic Rate) is ${bmr.toFixed(0)} calories per day. Explain what this means for my daily diet and activity level. Provide simple examples of daily calorie needs for different activity levels (sedentary, light, moderate).`);
    };
  
    return (
      <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
        {aiPrompt && <AIBrain prompt={aiPrompt} />}
        <div className="flex items-center space-x-3 mb-4"><Flame className="w-6 h-6 text-orange-400" /><h3 className="text-lg font-semibold text-white">BMR Calculator</h3></div>
        <select onChange={(e) => setSelectedMember(state.members.find(m => m.id === e.target.value) || null)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white mb-4"><option value="">Select Member (Auto-calculate)</option>{state.members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select>
        {bmr !== null ? (<div className="mt-4 text-center bg-dark-700 p-4 rounded-lg"><p className="text-gray-400">Basal Metabolic Rate</p><p className="text-4xl font-bold text-white my-2">{bmr.toFixed(0)}</p><p className="text-sm text-gray-400">Calories/day at rest</p><button onClick={handleExplain} className="text-sm text-primary-400 mt-2 flex items-center justify-center gap-1 mx-auto"><Bot size={14} /> Explain with AI</button></div>) : <p className="text-center text-gray-500 text-sm py-8">Select a member with complete physical info (age, gender, height, weight) to calculate BMR.</p>}
      </div>
    );
};

const SavingsCalculator: React.FC = () => {
    const [initial, setInitial] = useState(10000);
    const [contribution, setContribution] = useState(5000);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(8);
    const [futureValue, setFutureValue] = useState<number | null>(null);
    const [aiPrompt, setAiPrompt] = useState<string | null>(null);
  
    const calculateSavings = () => {
      const i = rate / 100 / 12;
      const n = years * 12;
      const fv = initial * Math.pow(1 + i, n) + contribution * (Math.pow(1 + i, n) - 1) / i;
      setFutureValue(fv);
    };
    
    const handleExplain = () => {
      if (futureValue === null) return;
      setAiPrompt(`My savings calculation shows a future value of ৳${futureValue.toLocaleString(undefined, {maximumFractionDigits: 0})} after ${years} years with a monthly contribution of ৳${contribution}. Explain the power of compound interest using this example and suggest one key takeaway for long-term financial planning.`);
    };
  
    return (
      <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
        {aiPrompt && <AIBrain prompt={aiPrompt} />}
        <div className="flex items-center space-x-3 mb-4"><PiggyBank className="w-6 h-6 text-green-400" /><h3 className="text-lg font-semibold text-white">Savings Calculator</h3></div>
        <div className="space-y-3 mb-4">
          <div><label className="text-sm text-gray-400">Initial Amount (৳)</label><input type="number" value={initial} onChange={e => setInitial(Number(e.target.value))} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" /></div>
          <div><label className="text-sm text-gray-400">Monthly Contribution (৳)</label><input type="number" value={contribution} onChange={e => setContribution(Number(e.target.value))} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-gray-400">Years</label><input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" /></div>
            <div><label className="text-sm text-gray-400">Est. Rate (%)</label><input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white" /></div>
          </div>
        </div>
        <button onClick={calculateSavings} className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Calculate</button>
        {futureValue !== null && (<div className="mt-4 text-center bg-dark-700 p-4 rounded-lg"><p className="text-gray-400">Future Value</p><p className="text-4xl font-bold text-white my-2">৳{futureValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</p><button onClick={handleExplain} className="text-sm text-primary-400 mt-2 flex items-center justify-center gap-1 mx-auto"><Bot size={14} /> Explain with AI</button></div>)}
      </div>
    );
};

const Calculators: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div><h1 className="text-2xl font-bold text-white mb-2">Calculators</h1><p className="text-gray-400">Useful tools for health and finance.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BMICalculator />
        <BMRCalculator />
        <SavingsCalculator />
      </div>
    </div>
  );
};

export default Calculators;
