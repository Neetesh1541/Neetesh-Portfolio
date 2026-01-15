import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

interface VoiceGuideContextProps {
  playSectionGuide: (id: string, text: string) => void;
}

const VoiceGuideContext = createContext<VoiceGuideContextProps>({
  playSectionGuide: () => {},
});

export const useVoiceGuideContext = () => useContext(VoiceGuideContext);

export const VoiceGuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const hasGreeted = useRef(false);
  const speaking = useRef(false);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    utter.pitch = 1;

    utter.onstart = () => (speaking.current = true);
    utter.onend = () => (speaking.current = false);

    window.speechSynthesis.speak(utter);
  }, []);

  // Greeting — only once after first user action
  useEffect(() => {
    const unlock = () => {
      if (hasGreeted.current) return;
      hasGreeted.current = true;

      const hour = new Date().getHours();
      let greeting = "Hello";

      if (hour < 12) greeting = "Good morning";
      else if (hour < 18) greeting = "Good afternoon";
      else greeting = "Good evening";

      speak(`${greeting}! I am Neetesh, welcome to my portfolio.`);

      document.removeEventListener("click", unlock);
      document.removeEventListener("keydown", unlock);
    };

    document.addEventListener("click", unlock);
    document.addEventListener("keydown", unlock);
  }, [speak]);

  const playSectionGuide = useCallback((id: string, text: string) => {
    if (!hasGreeted.current || speaking.current) return;
    speak(text);
  }, [speak]);

  return (
    <VoiceGuideContext.Provider value={{ playSectionGuide }}>
      {children}
    </VoiceGuideContext.Provider>
  );
};
