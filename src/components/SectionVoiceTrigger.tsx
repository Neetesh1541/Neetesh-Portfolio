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

  const { playSectionGuide } = useVoiceGuideContext();

  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView && !triggered.current) {
      triggered.current = true;
      playSectionGuide(sectionId, message);
    }
  }, [inView, playSectionGuide, sectionId, message]);

  return <div ref={ref}>{children}</div>;
};

export default SectionVoiceTrigger;
