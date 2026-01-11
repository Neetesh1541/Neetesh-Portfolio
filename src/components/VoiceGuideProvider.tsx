import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useVoiceGuide } from '@/hooks/useVoiceGuide';
import VoiceToggle from './VoiceToggle';

interface VoiceGuideContextType {
  isEnabled: boolean;
  isSpeaking: boolean;
  playSectionGuide: (sectionId: string, message: string) => Promise<void>;
}

const VoiceGuideContext = createContext<VoiceGuideContextType | null>(null);

export const useVoiceGuideContext = () => {
  const context = useContext(VoiceGuideContext);
  if (!context) {
    throw new Error('useVoiceGuideContext must be used within VoiceGuideProvider');
  }
  return context;
};

interface VoiceGuideProviderProps {
  children: ReactNode;
}

const VoiceGuideProvider = ({ children }: VoiceGuideProviderProps) => {
  const { isEnabled, isSpeaking, isGlowing, toggleVoice, playGreeting, playSectionGuide } = useVoiceGuide();

  // Play greeting after 1.5-2 second delay on page load
  useEffect(() => {
    const handleUserInteraction = () => {
      // Wait for user interaction to satisfy browser autoplay policy
      const timer = setTimeout(() => {
        playGreeting();
      }, 1800);

      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      
      return () => clearTimeout(timer);
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('scroll', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [playGreeting]);

  return (
    <VoiceGuideContext.Provider value={{ isEnabled, isSpeaking, playSectionGuide }}>
      {children}
      <VoiceToggle
        isEnabled={isEnabled}
        isSpeaking={isSpeaking}
        isGlowing={isGlowing}
        onToggle={toggleVoice}
      />
    </VoiceGuideContext.Provider>
  );
};

export default VoiceGuideProvider;
