import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";

interface VoiceGuideContextProps {
  playSectionGuide: (sectionId: string, message: string) => void;
  playGreeting: () => void;
}

const VoiceGuideContext = createContext<VoiceGuideContextProps>({
  playSectionGuide: () => {},
  playGreeting: () => {},
});

export const useVoiceGuideContext = () => useContext(VoiceGuideContext);

export const VoiceGuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const greetedRef = useRef(false);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) setVoices(v);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.pitch = 1;
    utter.rate = 1;
    utter.volume = 1;

    const preferred =
      voices.find(v => v.name.toLowerCase().includes("male")) || voices[0];

    if (preferred) utter.voice = preferred;

    window.speechSynthesis.speak(utter);
  }, [voices]);

  const playGreeting = useCallback(() => {
    const hour = new Date().getHours();
    let greeting = "Hello";

    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    else greeting = "Good evening";

    speak(`${greeting}! I am Neetesh, a full stack developer. Feel free to explore my work.`);
  }, [speak]);

  const playSectionGuide = useCallback((sectionId: string, message: string) => {
    speak(message);
  }, [speak]);

  // 🔓 Unlock voice after first user interaction
  useEffect(() => {
    if (!voices.length || greetedRef.current) return;

    const unlock = () => {
      if (greetedRef.current) return;

      greetedRef.current = true;
      playGreeting();

      document.removeEventListener("click", unlock);
      document.removeEventListener("mousemove", unlock);
      document.removeEventListener("keydown", unlock);
    };

    document.addEventListener("click", unlock);
    document.addEventListener("mousemove", unlock);
    document.addEventListener("keydown", unlock);

  }, [voices, playGreeting]);

  return (
    <VoiceGuideContext.Provider value={{ playSectionGuide, playGreeting }}>
      {children}
    </VoiceGuideContext.Provider>
  );
};
