import { useEffect, useRef } from "react";
import { useVoiceGuideContext } from "./VoiceGuideProvider";

interface SectionVoiceTriggerProps {
  sectionId: string;
  message: string;
  children: React.ReactNode;
}

const SectionVoiceTrigger = ({ sectionId, message, children }: SectionVoiceTriggerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { playSectionGuide } = useVoiceGuideContext();
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          setTimeout(() => {
            playSectionGuide(sectionId, message);
          }, 400);
        }
      },
      {
        root: null,
        threshold: 0.45,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [sectionId, message, playSectionGuide]);

  return (
    <div ref={ref} className="relative pointer-events-auto">
      {children}
    </div>
  );
};

export default SectionVoiceTrigger;
