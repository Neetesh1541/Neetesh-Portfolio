import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface SectionVoiceTriggerProps {
  sectionId: string;
  message: string;
  children: React.ReactNode;
  onTrigger: (sectionId: string, message: string) => void;
}

const SectionVoiceTrigger = ({ sectionId, message, children, onTrigger }: SectionVoiceTriggerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    margin: "-40% 0px -40% 0px",
    once: true 
  });
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (isInView && !hasTriggered.current) {
      hasTriggered.current = true;
      // Small delay to let the section fully appear
      const timer = setTimeout(() => {
        onTrigger(sectionId, message);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, sectionId, message, onTrigger]);

  return <div ref={ref}>{children}</div>;
};

export default SectionVoiceTrigger;
