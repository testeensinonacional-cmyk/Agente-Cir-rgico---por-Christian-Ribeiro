import React, { useState } from 'react';
import { EBOOK_CONTENT } from '../constants';
import { ChevronDown, ChevronRight, Star } from 'lucide-react';

export const EbookReader: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<string | null>(EBOOK_CONTENT[0].id);

  return (
    <div className="flex flex-col h-full bg-slate-50 md:bg-gray-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 md:p-10 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">O Código SPIN</h1>
            <p className="text-lg text-slate-600 font-medium">Domine a ciência da influência.</p>
          </div>

          {/* Chapters List */}
          <div className="space-y-4">
            {EBOOK_CONTENT.map((chapter) => {
              const isActive = activeChapter === chapter.id;
              return (
                <div
                  key={chapter.id}
                  className={`bg-white rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'shadow-xl shadow-blue-900/5 ring-1 ring-blue-100 transform scale-[1.01]' 
                      : 'border border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => setActiveChapter(isActive ? null : chapter.id)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
                        isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {chapter.id}
                      </div>
                      <h3 className={`font-bold text-lg md:text-xl ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                        {chapter.title}
                      </h3>
                    </div>
                    {isActive ? (
                      <ChevronDown className="text-blue-600" size={24} />
                    ) : (
                      <ChevronRight className="text-gray-300" size={24} />
                    )}
                  </button>

                  {isActive && (
                    <div className="px-6 pb-8 pt-0 animate-fadeIn">
                      <div className="w-full h-px bg-gray-100 mb-6" />
                      
                      {chapter.imageUrl && (
                        <div className="mb-8 rounded-xl overflow-hidden shadow-lg shadow-slate-200">
                          <img 
                            src={chapter.imageUrl} 
                            alt={chapter.title}
                            className="w-full h-48 md:h-80 object-cover transform hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      )}

                      <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line font-light">
                        {chapter.content}
                      </div>
                      <div className="mt-8 flex items-start gap-3 text-sm text-blue-700 bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <Star size={18} className="mt-0.5 flex-shrink-0" fill="currentColor" />
                        <span className="font-medium">Missão: Use o Agente Cirúrgico na aba ao lado para simular este cenário agora mesmo.</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};