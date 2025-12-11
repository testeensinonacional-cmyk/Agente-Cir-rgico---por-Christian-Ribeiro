import React, { useState } from 'react';
import { BrainCircuit, ArrowRight } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (name: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] bg-blue-600/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <BrainCircuit size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Agente Cirúrgico</h1>
          <p className="text-blue-200 text-sm font-medium tracking-wide">CRIADO POR CHRISTIAN RIBEIRO</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(name); }} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Identificação</label>
            <input
              required
              type="text"
              className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-white placeholder-gray-500"
              placeholder="Digite seu nome para iniciar"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 group"
          >
            <span>Acessar Ferramenta</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        <p className="text-[10px] text-center text-gray-500 mt-8 opacity-60">
          Ferramenta exclusiva baseada em neurociência aplicada a vendas.
        </p>
      </div>
    </div>
  );
};