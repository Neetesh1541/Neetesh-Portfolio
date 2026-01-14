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
    const handleScroll = () => {
      if (!ref.current || hasTriggered.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger jab section ka center viewport me ho
      if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
        hasTriggered.current = true;
        playSectionGuide(sectionId, message);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Page load me bhi check karo
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionId, message, playSectionGuide]);

  return <div ref={ref}>{children}</div>;
};

export default SectionVoiceTrigger;
