import { createContext, useContext, useEffect, useState, useCallback } from "react";

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
    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.pitch = 1;
    utter.rate = 1;
    utter.volume = 1;

    // Male voice preferred
    const male = voices.find(v => v.name.toLowerCase().includes("male")) || voices[0];
    if (male) utter.voice = male;

    window.speechSynthesis.speak(utter);
  }, [voices]);

  const playGreeting = useCallback(() => {
    const hour = new Date().getHours();
    let greeting = "Hello, welcome to my portfolio!";
    if (hour < 12) greeting = "Good morning! Welcome to my portfolio!";
    else if (hour < 18) greeting = "Good afternoon! Welcome to my portfolio!";
    else greeting = "Good evening! Welcome to my portfolio!";

    speak(greeting + " I am Neetesh, a full-stack developer. Feel free to explore my work.");
  }, [speak]);

  const playSectionGuide = useCallback((sectionId: string, message: string) => {
    speak(message);
  }, [speak]);

  return (
    <VoiceGuideContext.Provider value={{ playSectionGuide, playGreeting }}>
      {children}
    </VoiceGuideContext.Provider>
  );
};
