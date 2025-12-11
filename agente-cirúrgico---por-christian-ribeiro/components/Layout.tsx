import React from 'react';
import { Bot, BookOpen, LogOut, Menu, Sparkles, BrainCircuit } from 'lucide-react';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  userName: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onNavigate, onLogout, userName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavItem = ({ screen, icon: Icon, label }: { screen: Screen; icon: any; label: string }) => (
    <button
      onClick={() => {
        onNavigate(screen);
        setIsMobileMenuOpen(false);
      }}
      className={`group flex items-center space-x-3 w-full p-3.5 rounded-xl transition-all duration-200 ${
        currentScreen === screen
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
          : 'text-gray-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon size={20} className={currentScreen === screen ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'} />
      <span className="font-medium tracking-wide text-sm">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900 text-white border-r border-slate-800 shadow-2xl z-10">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center space-x-3 text-blue-500 mb-1">
            <BrainCircuit size={32} />
            <h1 className="font-bold text-xl text-white tracking-tight">Agente Cirúrgico</h1>
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest pl-1">Criado por Christian Ribeiro</p>
        </div>

        <nav className="flex-1 p-6 space-y-3">
          <NavItem screen="dashboard" icon={Bot} label="Central de Comando" />
          <NavItem screen="chat" icon={Sparkles} label="Agente IA" />
          <NavItem screen="ebook" icon={BookOpen} label="Metodologia SPIN" />
        </nav>

        <div className="p-6 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center space-x-3 mb-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-white truncate">{userName}</span>
              <span className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
              </span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center justify-center space-x-2 w-full p-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900 text-white z-20 flex justify-between items-center p-4 shadow-md">
        <div className="flex items-center space-x-2">
          <BrainCircuit size={24} className="text-blue-500" />
          <span className="font-bold">Agente Cirúrgico</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden transition-opacity">
          <div className="absolute right-0 top-0 h-full w-72 bg-slate-900 shadow-2xl flex flex-col p-6 animate-slideIn">
            <div className="flex justify-end mb-8">
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>
            <nav className="space-y-3 flex-1">
              <NavItem screen="dashboard" icon={Bot} label="Central de Comando" />
              <NavItem screen="chat" icon={Sparkles} label="Agente IA" />
              <NavItem screen="ebook" icon={BookOpen} label="Metodologia SPIN" />
            </nav>
            <button
              onClick={onLogout}
              className="flex items-center space-x-3 w-full p-4 text-red-400 hover:bg-red-900/20 rounded-xl transition-colors mt-auto border border-slate-800"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative pt-16 md:pt-0 overflow-hidden bg-slate-50">
        {children}
      </main>
    </div>
  );
};

export default Layout;