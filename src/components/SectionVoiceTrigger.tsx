import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useVoiceGuideContext } from "./VoiceGuideProvider";

interface Props {
  sectionId: string;
  message: string;
  children: React.ReactNode;
}

const SectionVoiceTrigger = ({ sectionId, message, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  const { playSectionGuide, isEnabled } = useVoiceGuideContext();

  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView && !triggered.current && isEnabled) {
      triggered.current = true;
      playSectionGuide(sectionId, message);
    }
  }, [inView, playSectionGuide, sectionId, message, isEnabled]);

  // Reset trigger when voice is disabled so it can play again when re-enabled
  useEffect(() => {
    if (!isEnabled) {
      triggered.current = false;
    }
  }, [isEnabled]);

  return <div ref={ref}>{children}</div>;
};

export default SectionVoiceTrigger;
