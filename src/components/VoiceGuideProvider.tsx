import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

const VOICE_ENABLED_KEY = 'portfolio_voice_enabled';

interface VoiceGuideContextProps {
  isEnabled: boolean;
  isSpeaking: boolean;
  isGlowing: boolean;
  toggleVoice: () => boolean;
  playGreeting: () => Promise<void>;
  playSectionGuide: (sectionId: string, message: string) => void;
}

const VoiceGuideContext = createContext<VoiceGuideContextProps>({
  isEnabled: false,
  isSpeaking: false,
  isGlowing: false,
  toggleVoice: () => false,
  playGreeting: async () => {},
  playSectionGuide: () => {},
});

export const useVoiceGuideContext = () => useContext(VoiceGuideContext);

export const VoiceGuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  
  const playedSections = useRef(new Set<string>());
  const speakingRef = useRef(false);
  const enabledRef = useRef(false);
  const speechQueue = useRef<string[]>([]);
  const isProcessingQueue = useRef(false);
  const useBrowserTTS = useRef(false);

  // Load saved preference (but don't auto-enable to respect browser autoplay policies)
  useEffect(() => {
    try {
      const storedEnabled = localStorage.getItem(VOICE_ENABLED_KEY);
      if (storedEnabled === 'true') {
        // We keep preference saved but don't auto-enable; user must click to enable
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const speakWithBrowserTTS = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      try {
        if (!window.speechSynthesis) {
          resolve();
          return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        const loadVoices = () => {
          try {
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => 
              v.name.includes('Google') || 
              v.name.includes('Microsoft') || 
              (v.lang.startsWith('en') && v.name.includes('Male'))
            ) || voices.find(v => v.lang.startsWith('en'));
            
            if (preferredVoice) utterance.voice = preferredVoice;
          } catch {
            // Ignore voice loading errors
          }
        };

        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = loadVoices;
        } else {
          loadVoices();
        }

        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();

        window.speechSynthesis.speak(utterance);
      } catch {
        resolve();
      }
    });
  }, []);

  const processQueue = useCallback(async () => {
    if (isProcessingQueue.current || speechQueue.current.length === 0) return;
    if (!enabledRef.current) {
      speechQueue.current = [];
      return;
    }

    isProcessingQueue.current = true;
    speakingRef.current = true;
    setIsSpeaking(true);
    setIsGlowing(true);

    while (speechQueue.current.length > 0 && enabledRef.current) {
      const text = speechQueue.current.shift()!;

      // If we already know ElevenLabs is down, skip to browser TTS
      if (useBrowserTTS.current) {
        await speakWithBrowserTTS(text);
        continue;
      }

      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        
        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Missing Supabase config');
        }

        const response = await fetch(
          `${supabaseUrl}/functions/v1/elevenlabs-tts`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({ text }),
          }
        );

        if (!response.ok) {
          throw new Error('TTS API failed');
        }

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('audio')) {
          throw new Error('Invalid response type');
        }

        const audioBlob = await response.blob();
        if (audioBlob.size === 0) {
          throw new Error('Empty audio blob');
        }
        
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        await new Promise<void>((resolve) => {
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            resolve();
          };
          audio.onerror = () => {
            URL.revokeObjectURL(audioUrl);
            resolve();
          };
          audio.play().catch(() => {
            URL.revokeObjectURL(audioUrl);
            resolve();
          });
        });
      } catch {
        // Switch to browser TTS for this session (silently)
        useBrowserTTS.current = true;
        await speakWithBrowserTTS(text);
      }
    }

    speakingRef.current = false;
    isProcessingQueue.current = false;
    setIsSpeaking(false);
    setIsGlowing(false);
  }, [speakWithBrowserTTS]);

  const queueSpeech = useCallback((text: string) => {
    if (!enabledRef.current) return;
    speechQueue.current.push(text);
    // Use setTimeout to avoid potential stack issues
    setTimeout(() => {
      processQueue().catch(() => {
        // Silently handle any queue processing errors
      });
    }, 0);
  }, [processQueue]);

  const toggleVoice = useCallback(() => {
    const newEnabled = !enabledRef.current;
    enabledRef.current = newEnabled;
    setIsEnabled(newEnabled);
    
    try {
      localStorage.setItem(VOICE_ENABLED_KEY, String(newEnabled));
    } catch {
      // Ignore localStorage errors
    }

    if (!newEnabled) {
      // Stop everything
      try {
        window.speechSynthesis?.cancel();
      } catch {
        // Ignore speech synthesis errors
      }
      speechQueue.current = [];
      isProcessingQueue.current = false;
      speakingRef.current = false;
      setIsSpeaking(false);
      setIsGlowing(false);
      playedSections.current.clear();
    }

    return newEnabled;
  }, []);

  const playGreeting = useCallback(async () => {
    if (!enabledRef.current) return;

    try {
      const hour = new Date().getHours();
      const greeting =
        hour < 12 ? "Good morning!" :
        hour < 17 ? "Good afternoon!" :
        hour < 21 ? "Good evening!" : "Hey there!";

      const fullGreeting = `${greeting} I'm Neetesh Kumar. Welcome to my portfolio. Feel free to scroll and explore!`;

      queueSpeech(fullGreeting);
    } catch {
      // Silently ignore greeting errors
    }
  }, [queueSpeech]);

  const playSectionGuide = useCallback((sectionId: string, message: string) => {
    if (!enabledRef.current) return;
    
    try {
      if (playedSections.current.has(sectionId)) return;
      playedSections.current.add(sectionId);
      queueSpeech(message);
    } catch {
      // Silently ignore section guide errors
    }
  }, [queueSpeech]);

  return (
    <VoiceGuideContext.Provider value={{ 
      isEnabled, 
      isSpeaking, 
      isGlowing, 
      toggleVoice, 
      playGreeting,
      playSectionGuide 
    }}>
      {children}
    </VoiceGuideContext.Provider>
  );
};