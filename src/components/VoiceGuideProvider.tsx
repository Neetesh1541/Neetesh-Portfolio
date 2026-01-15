import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";

interface VoiceGuideContextProps {
  playSectionGuide: (sectionId: string, message: string) => void;
  playGreeting: () => void;
  greetingDone: boolean;
}

const VoiceGuideContext = createContext<VoiceGuideContextProps>({
  playSectionGuide: () => {},
  playGreeting: () => {},
  greetingDone: false,
});

export const useVoiceGuideContext = () => useContext(VoiceGuideContext);

export const VoiceGuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [greetingDone, setGreetingDone] = useState(false);
  const unlockedRef = useRef(false);

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
    if (!window.speechSynthesis || !voices.length) return;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    utter.pitch = 1;

    const preferred = voices.find(v => v.name.toLowerCase().includes("male")) || voices[0];
    if (preferred) utter.voice = preferred;

    utter.onend = () => setGreetingDone(true);

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
    if (!greetingDone) return;  // 🔥 block until greeting finishes
    speak(message);
  }, [greetingDone, speak]);

  // Unlock voice after first interaction
  useEffect(() => {
    if (!voices.length || unlockedRef.current) return;

    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
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
    <VoiceGuideContext.Provider value={{ playSectionGuide, playGreeting, greetingDone }}>
      {children}
    </VoiceGuideContext.Provider>
  );
};
