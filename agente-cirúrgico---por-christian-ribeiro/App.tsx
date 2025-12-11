import React, { useState, useEffect } from 'react';
import { UserState, Screen } from './types';
import { AuthScreen } from './components/AuthScreen';
import Layout from './components/Layout';
import { EbookReader } from './components/EbookReader';
import { ChatInterface } from './components/ChatInterface';
import { Bot, BookOpen, ArrowRight, BrainCircuit, Play } from 'lucide-react';
import { loadUserFromDB, saveUserToDB, clearUserDB, clearChatDB } from './services/storageService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserState>({
    isAuthenticated: false,
    name: '',
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');

  // Load state from local DB on mount
  useEffect(() => {
    const savedUser = loadUserFromDB();
    if (savedUser && savedUser.isAuthenticated) {
      setUser(savedUser);
    }
  }, []);

  // Update screen based on auth state
  useEffect(() => {
    if (!user.isAuthenticated) {
      setCurrentScreen('auth');
    } else if (currentScreen === 'auth') {
      setCurrentScreen('dashboard');
    }
  }, [user, currentScreen]);

  const handleLogin = (name: string) => {
    const newUser = { isAuthenticated: true, name };
    setUser(newUser);
    saveUserToDB(newUser);
  };

  const handleLogout = () => {
    clearUserDB();
    // Optional: Clear chat on logout or keep it? 
    // Usually safer to clear session data, but keeping chat for "offline db" feel might be better.
    // Let's keep chat in DB, only clear user session.
    setUser({ isAuthenticated: false, name: '' });
    setCurrentScreen('auth');
  };

  if (currentScreen === 'auth') {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // Dashboard / Home View Component
  const DashboardHome = () => (
    <div className="p-6 md:p-12 h-full overflow-y-auto bg-slate-50 scrollbar-hide">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Olá, <span className="text-blue-600">{user.name}</span>.
            </h1>
            <p className="text-lg text-slate-500">
              Sua central de comando para vendas de alta complexidade está pronta.
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Chat */}
          <div 
            onClick={() => setCurrentScreen('chat')}
            className="group relative bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <BrainCircuit size={120} />
            </div>
            
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              <Bot size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">Iniciar Consultoria</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Ative o Agente Cirúrgico para estruturar seus scripts, analisar objeções e guiar suas negociações em tempo real.
            </p>
            <div className="flex items-center text-blue-600 font-bold text-sm tracking-wide uppercase">
              Acessar IA <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          {/* Card Ebook */}
          <div 
            onClick={() => setCurrentScreen('ebook')}
            className="group relative bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <BookOpen size={120} />
            </div>

            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
              <BookOpen size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">Metodologia SPIN</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Acesse o material de apoio. Da Caverna de Platão à Mentalidade de Kobe Bryant. A base teórica da sua prática.
            </p>
            <div className="flex items-center text-indigo-600 font-bold text-sm tracking-wide uppercase">
              Ler Conteúdo <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>

        <div className="mt-12 relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
           <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
               <div className="flex-1">
                   <h3 className="font-bold text-xl md:text-2xl mb-3 text-white">Insight Diário</h3>
                   <p className="text-blue-100 text-lg leading-relaxed font-light">
                     "A venda não é ganha na reunião. Ela é vencida no treinamento. Sua grandeza deve ser forjada, não dada."
                   </p>
                   <p className="mt-4 text-sm font-bold text-blue-400 uppercase tracking-widest">— Christian Ribeiro</p>
               </div>
               <div className="flex-shrink-0">
                    <button 
                        onClick={() => setCurrentScreen('chat')}
                        className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-lg"
                    >
                        <Play size={18} fill="currentColor" /> Praticar Agora
                    </button>
               </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout
      currentScreen={currentScreen}
      onNavigate={setCurrentScreen}
      onLogout={handleLogout}
      userName={user.name}
    >
      {currentScreen === 'dashboard' && <DashboardHome />}
      {currentScreen === 'ebook' && <EbookReader />}
      {currentScreen === 'chat' && <ChatInterface userName={user.name} />}
    </Layout>
  );
};

export default App;