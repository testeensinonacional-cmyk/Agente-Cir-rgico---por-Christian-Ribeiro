import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Sparkles, BrainCircuit, Trash2 } from 'lucide-react';
import { Message } from '../types';
import { sendMessage } from '../services/geminiService';
import { loadChatFromDB, saveChatToDB, clearChatDB } from '../services/storageService';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  userName: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ userName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial Message Template
  const initialMessage: Message = {
    role: 'model',
    text: `Olá ${userName}, eu sou o **Agente Cirúrgico**. \n\nEstou aqui para aplicar a metodologia SPIN com precisão cirúrgica na sua negociação.\n\nPara começarmos, preciso calibrar a estratégia:\n\n1. **Você vai abordar o cliente** ou **o cliente vai abordar você**?\n2. **Qual é a sua profissão** ou nicho de atuação?`,
    timestamp: new Date(),
  };

  // Load from DB on mount
  useEffect(() => {
    const savedMessages = loadChatFromDB();
    if (savedMessages && savedMessages.length > 0) {
      setMessages(savedMessages);
    } else {
      setMessages([initialMessage]);
    }
  }, [userName]);

  // Save to DB whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveChatToDB(messages);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessage(inputText);
      
      const botMsg: Message = {
        role: 'model',
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        role: 'model',
        text: "⚠️ **Modo Offline Detectado** ou Erro de Conexão.\n\nMinha inteligência reside na nuvem e preciso de internet para *criar* novas respostas. Verifique sua conexão.\n\nNo entanto, todo o nosso histórico anterior está salvo no seu Banco de Dados Local.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Tem certeza que deseja apagar toda a memória desta conversa?')) {
      clearChatDB();
      setMessages([initialMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-md relative group overflow-hidden">
                    <BrainCircuit size={20} className="relative z-10" />
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </div>
                <div>
                    <h2 className="font-bold text-slate-800">Agente Cirúrgico</h2>
                    <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Memória Ativa
                    </p>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <button 
                  onClick={handleClearHistory}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Limpar Memória da Conversa"
                >
                  <Trash2 size={18} />
                </button>
                <div className="bg-slate-100 p-2 rounded-lg">
                    <Sparkles size={18} className="text-slate-400" />
                </div>
            </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                msg.role === 'user' 
                ? 'bg-slate-800 text-white' 
                : 'bg-white border border-gray-100 text-blue-600'
              }`}
            >
              {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>

            <div
              className={`max-w-[85%] md:max-w-[75%] p-5 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-slate-800 text-white rounded-tr-none'
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-slate-200'
              }`}
            >
              <ReactMarkdown 
                components={{
                    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-2 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="" {...props} />,
                    strong: ({node, ...props}) => <span className="font-bold text-current" {...props} />
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-100 text-blue-600 flex items-center justify-center shadow-sm">
              <Bot size={18} />
            </div>
            <div className="bg-white px-6 py-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-3">
              <Loader2 size={18} className="animate-spin text-blue-600" />
              <span className="text-sm font-medium text-slate-400">Processando resposta...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200 sticky bottom-0 z-20">
        <div className="max-w-4xl mx-auto relative flex items-end gap-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua mensagem aqui..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all resize-none scrollbar-hide shadow-inner"
            rows={1}
            style={{ minHeight: '56px', maxHeight: '160px' }}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            className={`h-[56px] w-[56px] flex items-center justify-center rounded-2xl transition-all duration-200 flex-shrink-0 ${
              !inputText.trim() || isLoading
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg shadow-blue-500/30'
            }`}
          >
            <Send size={22} className={isLoading ? 'opacity-0' : 'opacity-100'} />
            {isLoading && <Loader2 size={22} className="animate-spin absolute" />}
          </button>
        </div>
        <div className="text-center mt-3">
           <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Agente Cirúrgico • Christian Bot • Memória Ativa</p>
        </div>
      </div>
    </div>
  );
};