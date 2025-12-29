import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/gemini';
import { ChatMessage } from '../types';

const DigitalTwin: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Ahoj! Jsem Tomik. Zeptej se mě na cokoliv ohledně projektů, ceny nebo Břetislavova života!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [
      ...prev, 
      { role: 'model', text: responseText, timestamp: new Date() }
    ]);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[600px] shadow-2xl">
      {/* Header */}
      <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">Tomik</h3>
            <div className="flex items-center text-xs text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
              Online
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-white/10' : 'bg-primary/20'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-accent" />}
              </div>
              
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-white text-black rounded-tr-none' 
                  : 'bg-white/5 border border-white/10 rounded-tl-none'
              }`}>
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <span className="text-[10px] opacity-50 mt-2 block">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
             <div className="flex items-center space-x-2 bg-white/5 p-4 rounded-2xl rounded-tl-none">
                <Loader2 size={16} className="animate-spin text-accent" />
                <span className="text-xs text-gray-400">Přemýšlím...</span>
             </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/10">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Zeptej se na přibližnou cenu, technologie nebo na cokoli co tě napadne..."
            className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-accent hover:text-black rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default DigitalTwin;