import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const VOICE_ENABLED_KEY = 'portfolio_voice_enabled';
const VOICE_SESSION_KEY = 'portfolio_voice_session';

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
  
  const hasPlayedGreeting = useRef(false);
  const playedSections = useRef(new Set<string>());
  const speakingRef = useRef(false);
  const enabledRef = useRef(false);

  // Load saved preference
  useEffect(() => {
    const storedEnabled = localStorage.getItem(VOICE_ENABLED_KEY);
    if (storedEnabled === 'true') {
      setIsEnabled(true);
      enabledRef.current = true;
    }

    const storedSession = sessionStorage.getItem(VOICE_SESSION_KEY);
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        hasPlayedGreeting.current = session.hasPlayedGreeting || false;
        playedSections.current = new Set(session.playedSections || []);
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  const saveSession = useCallback(() => {
    sessionStorage.setItem(VOICE_SESSION_KEY, JSON.stringify({
      hasPlayedGreeting: hasPlayedGreeting.current,
      playedSections: Array.from(playedSections.current),
    }));
  }, []);

  const speakWithBrowserTTS = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        setIsSpeaking(false);
        setIsGlowing(false);
        speakingRef.current = false;
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Try to get a better voice
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

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsGlowing(false);
        speakingRef.current = false;
        resolve();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsGlowing(false);
        speakingRef.current = false;
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const speak = useCallback(async (text: string, showFallbackToast = false) => {
    if (!enabledRef.current || speakingRef.current) return;

    speakingRef.current = true;
    setIsSpeaking(true);
    setIsGlowing(true);

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

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      await new Promise<void>((resolve) => {
        audio.onended = () => {
          setIsSpeaking(false);
          setIsGlowing(false);
          speakingRef.current = false;
          URL.revokeObjectURL(audioUrl);
          resolve();
        };

        audio.onerror = () => {
          setIsSpeaking(false);
          setIsGlowing(false);
          speakingRef.current = false;
          URL.revokeObjectURL(audioUrl);
          resolve();
        };

        audio.play().catch(() => {
          // If autoplay fails, fall back to browser TTS
          speakWithBrowserTTS(text);
          resolve();
        });
      });
    } catch {
      // Ensure we unlock future speech even if the backend TTS fails (quota/key issues)
      speakingRef.current = false;
      setIsSpeaking(false);
      setIsGlowing(false);

      if (showFallbackToast) {
        toast({
          title: 'Using Browser Voice',
          description: 'Voice credits are exhausted, switching to built-in voice.',
          duration: 2500,
        });
      }

      await speakWithBrowserTTS(text);
    }
  }, [speakWithBrowserTTS]);

  const toggleVoice = useCallback(() => {
    const newEnabled = !enabledRef.current;
    enabledRef.current = newEnabled;
    setIsEnabled(newEnabled);
    localStorage.setItem(VOICE_ENABLED_KEY, String(newEnabled));

    if (!newEnabled) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsGlowing(false);
      speakingRef.current = false;

      // Allow greeting + section guides to trigger again next time user enables voice
      hasPlayedGreeting.current = false;
      playedSections.current.clear();
      saveSession();
    }

    toast({
      title: newEnabled ? "Voice Guide Enabled" : "Voice Guide Disabled",
      description: newEnabled ? "I'll narrate as you explore" : "Voice narration turned off",
      duration: 2000,
    });

    return newEnabled;
  }, [saveSession]);

  const playGreeting = useCallback(async () => {
    // Greeting should play every time the user enables voice (user expects it on toggle)
    if (!enabledRef.current) return;

    const hour = new Date().getHours();
    const greeting =
      hour < 12 ? "Good morning!" :
      hour < 17 ? "Good afternoon!" :
      hour < 21 ? "Good evening!" : "Hey there!";

    const fullGreeting = `${greeting} I'm Neetesh Kumar. Welcome to my portfolio.`;

    hasPlayedGreeting.current = true;
    saveSession();

    await speak(fullGreeting, true);
  }, [speak, saveSession]);

  const playSectionGuide = useCallback((sectionId: string, message: string) => {
    if (!enabledRef.current || speakingRef.current) return;
    if (playedSections.current.has(sectionId)) return;

    playedSections.current.add(sectionId);
    saveSession();

    speak(message);
  }, [speak, saveSession]);

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
