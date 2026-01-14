import { useEffect, useRef } from "react";
import { useVoiceGuideContext } from "./VoiceGuideProvider";

interface Props {
  sectionId: string;
  message: string;
  children: React.ReactNode;
}

const SectionVoiceTrigger = ({ sectionId, message, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { playSectionGuide } = useVoiceGuideContext();
  const hasPlayed = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current || hasPlayed.current) return;
      const rect = ref.current.getBoundingClientRect();
      const middle = window.innerHeight / 2;

      if (rect.top < middle && rect.bottom > middle) {
        hasPlayed.current = true;
        playSectionGuide(sectionId, message);
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);

    // check once on load
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionId, message, playSectionGuide]);

  return <div ref={ref}>{children}</div>;
};

export default SectionVoiceTrigger;
