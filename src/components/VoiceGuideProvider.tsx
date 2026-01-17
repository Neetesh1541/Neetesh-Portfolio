import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

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
    const storedEnabled = localStorage.getItem(VOICE_ENABLED_KEY);
    if (storedEnabled === 'true') {
      // We keep preference saved but don't auto-enable; user must click to enable
    }
  }, []);

  const speakWithBrowserTTS = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
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
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => 
          v.name.includes('Google') || 
          v.name.includes('Microsoft') || 
          (v.lang.startsWith('en') && v.name.includes('Male'))
        ) || voices.find(v => v.lang.startsWith('en'));
        
        if (preferredVoice) utterance.voice = preferredVoice;
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      } else {
        loadVoices();
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
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
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
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
          audio.play().catch(() => resolve());
        });
      } catch {
        // Switch to browser TTS for this session
        useBrowserTTS.current = true;
        toast({
          title: 'Using Browser Voice',
          description: 'Premium voice unavailable, using built-in voice.',
          duration: 3000,
        });
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
    processQueue();
  }, [processQueue]);

  const toggleVoice = useCallback(() => {
    const newEnabled = !enabledRef.current;
    enabledRef.current = newEnabled;
    setIsEnabled(newEnabled);
    localStorage.setItem(VOICE_ENABLED_KEY, String(newEnabled));

    if (!newEnabled) {
      // Stop everything
      window.speechSynthesis.cancel();
      speechQueue.current = [];
      isProcessingQueue.current = false;
      speakingRef.current = false;
      setIsSpeaking(false);
      setIsGlowing(false);
      playedSections.current.clear();
    }

    toast({
      title: newEnabled ? "Voice Guide Enabled" : "Voice Guide Disabled",
      description: newEnabled ? "I'll narrate as you explore" : "Voice narration turned off",
      duration: 2000,
    });

    return newEnabled;
  }, []);

  const playGreeting = useCallback(async () => {
    if (!enabledRef.current) return;

    const hour = new Date().getHours();
    const greeting =
      hour < 12 ? "Good morning!" :
      hour < 17 ? "Good afternoon!" :
      hour < 21 ? "Good evening!" : "Hey there!";

    const fullGreeting = `${greeting} I'm Neetesh Kumar. Welcome to my portfolio. Feel free to scroll and explore!`;

    queueSpeech(fullGreeting);
  }, [queueSpeech]);

  const playSectionGuide = useCallback((sectionId: string, message: string) => {
    if (!enabledRef.current) return;
    if (playedSections.current.has(sectionId)) return;

    playedSections.current.add(sectionId);
    queueSpeech(message);
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