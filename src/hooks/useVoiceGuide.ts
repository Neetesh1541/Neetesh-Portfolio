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
    isEnabled: false,
    isSpeaking: false,
    isGlowing: false,
    hasPlayedGreeting: false,
    playedSections: new Set(),
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sessionId = useRef<string>('');
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

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

  const saveSession = useCallback((updates: Partial<VoiceState>) => {
    const currentSession = sessionStorage.getItem(VOICE_SESSION_KEY);
    const session = currentSession ? JSON.parse(currentSession) : { id: sessionId.current };

    if (updates.hasPlayedGreeting !== undefined) session.hasPlayedGreeting = updates.hasPlayedGreeting;
    if (updates.playedSections) session.playedSections = Array.from(updates.playedSections);

    sessionStorage.setItem(VOICE_SESSION_KEY, JSON.stringify(session));
  }, []);

  const toggleVoice = useCallback(() => {
    const newEnabled = !stateRef.current.isEnabled;
    localStorage.setItem(VOICE_ENABLED_KEY, String(newEnabled));

    if (!newEnabled && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      window.speechSynthesis.cancel();
    }

    setState(prev => ({ ...prev, isEnabled: newEnabled, isSpeaking: false, isGlowing: false }));

    toast({
      title: newEnabled ? "🔊 Voice Guide Enabled" : "🔇 Voice Guide Disabled",
      description: newEnabled ? "I'll narrate as you explore the portfolio" : "Voice narration turned off",
      duration: 2000,
    });

    return newEnabled;
  }, []);

  const speakWithBrowserTTS = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        setState(prev => ({ ...prev, isSpeaking: false, isGlowing: false }));
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Microsoft') || v.lang.startsWith('en'));
      if (preferredVoice) utterance.voice = preferredVoice;

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

  const speak = useCallback(async (text: string) => {
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
        await speakWithBrowserTTS(text);
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) audioRef.current.pause();

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
    } catch {
      await speakWithBrowserTTS(text);
    }
  }, [speakWithBrowserTTS]);

  const playGreeting = useCallback(async () => {
    if (stateRef.current.hasPlayedGreeting || !stateRef.current.isEnabled) return;

    const hour = new Date().getHours();
    const greeting =
      hour < 12 ? "Good morning!" :
      hour < 17 ? "Good afternoon!" :
      hour < 21 ? "Good evening!" : "Hey there!";

    const fullGreeting = `${greeting} I'm Neetesh. Welcome to my portfolio. Feel free to explore.`;

    setState(prev => {
      saveSession({ hasPlayedGreeting: true });
      return { ...prev, hasPlayedGreeting: true };
    });

    await speak(fullGreeting);
  }, [speak, saveSession]);

  const playSectionGuide = useCallback(async (sectionId: string, message: string) => {
    const current = stateRef.current;
    if (current.playedSections.has(sectionId) || !current.isEnabled || current.isSpeaking) return;

    setState(prev => {
      const newSet = new Set(prev.playedSections);
      newSet.add(sectionId);
      saveSession({ playedSections: newSet });
      return { ...prev, playedSections: newSet };
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
