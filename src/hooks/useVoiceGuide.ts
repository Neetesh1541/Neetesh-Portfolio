import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

const VOICE_SESSION_KEY = 'portfolio_voice_session';
const VOICE_ENABLED_KEY = 'portfolio_voice_enabled';

interface VoiceState {
  isEnabled: boolean;
  isSpeaking: boolean;
  isGlowing: boolean;
  hasPlayedGreeting: boolean;
  playedSections: Set<string>;
}

export const useVoiceGuide = () => {
  const [state, setState] = useState<VoiceState>({
    isEnabled: false, // Start disabled - user must click to enable
    isSpeaking: false,
    isGlowing: false,
    hasPlayedGreeting: false,
    playedSections: new Set(),
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sessionId = useRef<string>('');
  const stateRef = useRef(state);
  const isInitialized = useRef(false);
  
  // Keep ref in sync with state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Initialize from localStorage
  useEffect(() => {
    const storedEnabled = localStorage.getItem(VOICE_ENABLED_KEY);
    const storedSession = sessionStorage.getItem(VOICE_SESSION_KEY);
    
    if (storedEnabled !== null) {
      setState(prev => ({ ...prev, isEnabled: storedEnabled === 'true' }));
    }
    
    if (storedSession) {
      const session = JSON.parse(storedSession);
      sessionId.current = session.id;
      setState(prev => ({
        ...prev,
        hasPlayedGreeting: session.hasPlayedGreeting || false,
        playedSections: new Set(session.playedSections || []),
      }));
    } else {
      sessionId.current = Date.now().toString();
      sessionStorage.setItem(VOICE_SESSION_KEY, JSON.stringify({
        id: sessionId.current,
        hasPlayedGreeting: false,
        playedSections: [],
      }));
    }
    isInitialized.current = true;
  }, []);

  // Save session state
  const saveSession = useCallback((updates: Partial<VoiceState>) => {
    const currentSession = sessionStorage.getItem(VOICE_SESSION_KEY);
    const session = currentSession ? JSON.parse(currentSession) : { id: sessionId.current };
    
    if (updates.hasPlayedGreeting !== undefined) {
      session.hasPlayedGreeting = updates.hasPlayedGreeting;
    }
    if (updates.playedSections) {
      session.playedSections = Array.from(updates.playedSections);
    }
    
    sessionStorage.setItem(VOICE_SESSION_KEY, JSON.stringify(session));
  }, []);

  // Toggle voice enabled
  const toggleVoice = useCallback(() => {
    const newEnabled = !stateRef.current.isEnabled;
    localStorage.setItem(VOICE_ENABLED_KEY, String(newEnabled));
    
    // Stop any playing audio if disabling
    if (!newEnabled && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    // Stop browser speech too
    if (!newEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setState(prev => ({ ...prev, isEnabled: newEnabled, isSpeaking: false, isGlowing: false }));
    
    // Show toast
    toast({
      title: newEnabled ? "🔊 Voice Guide Enabled" : "🔇 Voice Guide Disabled",
      description: newEnabled 
        ? "I'll narrate as you explore the portfolio" 
        : "Voice narration turned off",
      duration: 2000,
    });
    
    return newEnabled;
  }, []);

  // Fallback to browser speech synthesis
  const speakWithBrowserTTS = useCallback((text: string, showFallbackToast: boolean = true): Promise<void> => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        setState(prev => ({ ...prev, isSpeaking: false, isGlowing: false }));
        resolve();
        return;
      }

      if (showFallbackToast) {
        toast({
          title: "🎙️ Using Browser Voice",
          description: "Premium voice unavailable, using browser synthesis",
          duration: 2000,
        });
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Try to get a good voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.name.includes('Google') || v.name.includes('Microsoft') || v.lang.startsWith('en')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        setState(prev => ({ ...prev, isSpeaking: false, isGlowing: false }));
        resolve();
      };

      utterance.onerror = () => {
        setState(prev => ({ ...prev, isSpeaking: false, isGlowing: false }));
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }, []);

  // Speak text using ElevenLabs with browser fallback
  const speak = useCallback(async (text: string): Promise<void> => {
    if (!stateRef.current.isEnabled) return;

    try {
      setState(prev => ({ ...prev, isSpeaking: true, isGlowing: true }));

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
        // Fallback to browser TTS
        await speakWithBrowserTTS(text, true);
        return;
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('audio')) {
        // Response is not audio, fallback to browser TTS
        await speakWithBrowserTTS(text, true);
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Stop any previous audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setState(prev => ({ ...prev, isSpeaking: false, isGlowing: false }));
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        setState(prev => ({ ...prev, isSpeaking: false, isGlowing: false }));
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      // Fallback to browser TTS on any error
      await speakWithBrowserTTS(text, true);
    }
  }, [speakWithBrowserTTS]);

  // Play greeting based on time
  const playGreeting = useCallback(async () => {
    if (stateRef.current.hasPlayedGreeting || !stateRef.current.isEnabled) return;

    const hour = new Date().getHours();
    let greeting: string;

    if (hour >= 5 && hour < 12) {
      greeting = "Good morning! I'm Neetesh.";
    } else if (hour >= 12 && hour < 17) {
      greeting = "Good afternoon! I'm Neetesh.";
    } else if (hour >= 17 && hour < 21) {
      greeting = "Good evening! I'm Neetesh.";
    } else {
      greeting = "Hey there! I'm Neetesh.";
    }

    const fullGreeting = `${greeting} Welcome to my portfolio. I'm a full stack developer who loves building intelligent products. Feel free to explore!`;

    setState(prev => {
      saveSession({ hasPlayedGreeting: true });
      return { ...prev, hasPlayedGreeting: true };
    });

    await speak(fullGreeting);
  }, [speak, saveSession]);

  // Play section guide
  const playSectionGuide = useCallback(async (sectionId: string, message: string) => {
    const currentState = stateRef.current;
    if (currentState.playedSections.has(sectionId) || !currentState.isEnabled || currentState.isSpeaking) return;

    setState(prev => {
      const newPlayedSections = new Set(prev.playedSections);
      newPlayedSections.add(sectionId);
      saveSession({ playedSections: newPlayedSections });
      return { ...prev, playedSections: newPlayedSections };
    });

    await speak(message);
  }, [speak, saveSession]);

  return {
    isEnabled: state.isEnabled,
    isSpeaking: state.isSpeaking,
    isGlowing: state.isGlowing,
    toggleVoice,
    playGreeting,
    playSectionGuide,
  };
};
