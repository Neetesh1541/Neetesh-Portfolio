import { useState, useEffect, useCallback, useRef } from 'react';

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
    isEnabled: true,
    isSpeaking: false,
    isGlowing: false,
    hasPlayedGreeting: false,
    playedSections: new Set(),
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sessionId = useRef<string>('');

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
    setState(prev => {
      const newEnabled = !prev.isEnabled;
      localStorage.setItem(VOICE_ENABLED_KEY, String(newEnabled));
      
      // Stop any playing audio if disabling
      if (!newEnabled && audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      return { ...prev, isEnabled: newEnabled, isSpeaking: false, isGlowing: false };
    });
  }, []);

  // Speak text using ElevenLabs
  const speak = useCallback(async (text: string): Promise<void> => {
    if (!state.isEnabled) return;

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
        throw new Error(`TTS request failed: ${response.status}`);
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
      console.error('Voice guide error:', error);
      setState(prev => ({ ...prev, isSpeaking: false, isGlowing: false }));
    }
  }, [state.isEnabled]);

  // Play greeting based on time
  const playGreeting = useCallback(async () => {
    if (state.hasPlayedGreeting || !state.isEnabled) return;

    const hour = new Date().getHours();
    let greeting: string;

    if (hour >= 5 && hour < 12) {
      greeting = "Good morning. I'm Neetesh. Welcome to my portfolio.";
    } else if (hour >= 12 && hour < 17) {
      greeting = "Good afternoon. I'm Neetesh. Welcome to my portfolio.";
    } else if (hour >= 17 && hour < 21) {
      greeting = "Good evening. I'm Neetesh. Welcome to my portfolio.";
    } else {
      greeting = "Good evening. Hope you're having a great night. I'm Neetesh. Welcome to my portfolio.";
    }

    const fullGreeting = `${greeting} I'm a full stack developer and AI enthusiast who loves building intelligent products and meaningful experiences. Feel free to explore my work. Let's build something amazing together.`;

    setState(prev => {
      const updated = { ...prev, hasPlayedGreeting: true };
      saveSession({ hasPlayedGreeting: true });
      return updated;
    });

    await speak(fullGreeting);
  }, [state.hasPlayedGreeting, state.isEnabled, speak, saveSession]);

  // Play section guide
  const playSectionGuide = useCallback(async (sectionId: string, message: string) => {
    if (state.playedSections.has(sectionId) || !state.isEnabled || state.isSpeaking) return;

    setState(prev => {
      const newPlayedSections = new Set(prev.playedSections);
      newPlayedSections.add(sectionId);
      saveSession({ playedSections: newPlayedSections });
      return { ...prev, playedSections: newPlayedSections };
    });

    await speak(message);
  }, [state.playedSections, state.isEnabled, state.isSpeaking, speak, saveSession]);

  return {
    isEnabled: state.isEnabled,
    isSpeaking: state.isSpeaking,
    isGlowing: state.isGlowing,
    toggleVoice,
    playGreeting,
    playSectionGuide,
  };
};
