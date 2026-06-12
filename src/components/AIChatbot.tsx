import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Bot, User, Loader2 } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo-new.png';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

type Mode = 'text' | 'voice';

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('text');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm NeeteshAI 🤖 — ask me anything about Neetesh: his work, projects, skills, or how to collaborate!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open && mode === 'text') {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, mode]);

  const stopSpeaking = useCallback(() => {
    try {
      audioRef.current?.pause();
      audioRef.current = null;
    } catch {}
    try {
      window.speechSynthesis?.cancel();
    } catch {}
    setSpeaking(false);
  }, []);

  const speakText = useCallback(async (text: string) => {
    if (voiceMuted) return;
    stopSpeaking();
    setSpeaking(true);

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    try {
      if (supabaseUrl && supabaseKey) {
        const res = await fetch(`${supabaseUrl}/functions/v1/elevenlabs-tts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({ text }),
        });
        const ct = res.headers.get('content-type') || '';
        if (res.ok && ct.includes('audio')) {
          const blob = await res.blob();
          if (blob.size > 0) {
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audioRef.current = audio;
            await new Promise<void>((resolve) => {
              audio.onended = () => {
                URL.revokeObjectURL(url);
                resolve();
              };
              audio.onerror = () => {
                URL.revokeObjectURL(url);
                resolve();
              };
              audio.play().catch(() => resolve());
            });
            setSpeaking(false);
            return;
          }
        }
      }
    } catch {}

    // Fallback to browser TTS
    try {
      if (window.speechSynthesis) {
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        utter.rate = 1;
        const voices = window.speechSynthesis.getVoices();
        const v = voices.find((x) => x.lang.startsWith('en') && /male|google|microsoft/i.test(x.name)) || voices.find((x) => x.lang.startsWith('en'));
        if (v) utter.voice = v;
        await new Promise<void>((resolve) => {
          utter.onend = () => resolve();
          utter.onerror = () => resolve();
          window.speechSynthesis.speak(utter);
        });
      }
    } catch {}
    setSpeaking(false);
  }, [voiceMuted, stopSpeaking]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/portfolio-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ messages: next.map((m) => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json().catch(() => ({}));
      const reply = res.ok ? data.reply || "Sorry, I couldn't respond." : data.error || 'Something went wrong. Try again.';
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
      if (mode === 'voice' && res.ok) {
        speakText(reply);
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Network error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading, mode, speakText]);

  const toggleListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setMessages((m) => [...m, { role: 'assistant', content: "Voice input isn't supported in this browser. Please type your question." }]);
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    try {
      const rec = new SR();
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.continuous = false;
      rec.onresult = (e: any) => {
        const transcript = e.results[0]?.[0]?.transcript || '';
        if (transcript) sendMessage(transcript);
      };
      rec.onend = () => setListening(false);
      rec.onerror = () => setListening(false);
      recognitionRef.current = rec;
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }, [listening, sendMessage]);

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    stopSpeaking();
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
    }
    setMode(m);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 shadow-[0_0_30px_rgba(139,92,246,0.6)] flex items-center justify-center text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={open ? 'Close chatbot' : 'Open chatbot'}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-violet-400/50"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-44 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[560px] rounded-2xl glass-card border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-gradient-to-r from-violet-500/20 to-cyan-500/20">
              <div className="relative">
                <img src={profilePhoto} alt="Neetesh" className="w-10 h-10 rounded-full object-cover border-2 border-violet-400/60" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-background animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">NeeteshAI</p>
                <p className="text-xs text-muted-foreground">Ask me about Neetesh</p>
              </div>
              <div className="flex items-center gap-1 p-1 rounded-full bg-background/40 border border-white/10">
                <button
                  onClick={() => switchMode('text')}
                  className={`px-2.5 py-1 text-xs rounded-full transition ${mode === 'text' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Text
                </button>
                <button
                  onClick={() => switchMode('voice')}
                  className={`px-2.5 py-1 text-xs rounded-full transition ${mode === 'voice' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Voice
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-muted/60 text-foreground rounded-bl-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <User size={14} className="text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {loading && (
                <div className="flex gap-2 items-center text-muted-foreground text-sm">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="flex gap-1 px-3 py-2 bg-muted/60 rounded-2xl">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-white/10 bg-background/40">
              {mode === 'text' ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about Neetesh..."
                    className="flex-1 bg-muted/40 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white flex items-center justify-center disabled:opacity-50"
                    aria-label="Send"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setVoiceMuted((v) => !v)}
                      className="w-9 h-9 rounded-full bg-muted/60 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                      aria-label={voiceMuted ? 'Unmute replies' : 'Mute replies'}
                      title={voiceMuted ? 'Unmute replies' : 'Mute replies'}
                    >
                      {voiceMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <button
                      onClick={toggleListening}
                      disabled={loading}
                      className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white transition disabled:opacity-50 ${
                        listening
                          ? 'bg-gradient-to-br from-red-500 to-pink-500'
                          : 'bg-gradient-to-br from-violet-500 to-cyan-500'
                      }`}
                      aria-label={listening ? 'Stop listening' : 'Start listening'}
                    >
                      {listening && (
                        <motion.span
                          className="absolute inset-0 rounded-full bg-red-400/50"
                          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        />
                      )}
                      {listening ? <MicOff size={22} /> : <Mic size={22} />}
                    </button>
                    <button
                      onClick={stopSpeaking}
                      disabled={!speaking}
                      className="w-9 h-9 rounded-full bg-muted/60 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30"
                      aria-label="Stop speaking"
                      title="Stop speaking"
                    >
                      <VolumeX size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {listening ? 'Listening… speak now' : speaking ? 'Speaking…' : 'Tap mic to ask'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
