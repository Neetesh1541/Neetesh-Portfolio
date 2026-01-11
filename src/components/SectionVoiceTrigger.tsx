import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useVoiceGuideContext } from './VoiceGuideProvider';

interface SectionVoiceTriggerProps {
  sectionId: string;
  message: string;
  children: React.ReactNode;
}

const SectionVoiceTrigger = ({ sectionId, message, children }: SectionVoiceTriggerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    margin: "-30% 0px -30% 0px",
    once: true 
  });
  const { playSectionGuide } = useVoiceGuideContext();
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (isInView && !hasTriggered.current) {
      hasTriggered.current = true;
      // Small delay before playing section guide
      const timer = setTimeout(() => {
        playSectionGuide(sectionId, message);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, sectionId, message, playSectionGuide]);

  return <div ref={ref}>{children}</div>;
};

export default SectionVoiceTrigger;
